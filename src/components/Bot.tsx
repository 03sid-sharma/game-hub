import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Input,
  Text,
  IconButton
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import useGpt from "../hooks/useGpt";
import BeatLoader from "react-spinners/BeatLoader";

const Bot = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<String[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const { error, sendRequest, isLoading} = useGpt();

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;
    const latestMsg = inputMessage;
    setInputMessage("");
    const newMessages = [...messages, latestMsg];
    setMessages(newMessages);

    const response = await sendRequest({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: latestMsg,
            },
          ],
        },
      ],
    });

    if (response && response.candidates && response.candidates.length > 0) {
      const text = response.candidates[0].content.parts[0].text;

      const modifiedResponse = [...newMessages, text];
      setMessages(modifiedResponse);
    }
  };

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <>
      {error && <Text>{error}</Text>}
      <IconButton
        onClick={() => setIsModalOpen(true)}
        position="fixed"
        bottom="4"
        right="4"
        p={6}
        borderRadius="full"
        bg="white"
        color="black"
        boxShadow="lg"
        zIndex="999"
        aria-label="Chat with AI"
        icon={<ChatIcon boxSize={8} color="black" />}
        _hover={{
          bg: "gray.100",
          transform: "scale(1.05)",
        }}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent
          position="fixed"
          bottom="0"
          right="0"
          p={4}
          borderRadius="md"
          bg="black"
          color="white"
        >
          <ModalHeader>Ask Bard!</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH="60vh" overflowY="auto">
            <VStack align="stretch" spacing={4}>
              {messages.map((message, index) => (
                <div key={index} className="message">
                  {message}
                </div>
              ))}
            </VStack>
          </ModalBody>
          <form onSubmit={handleSubmit}>
            <ModalFooter>
              <Input
                id="messageInput"
                name="message"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <Button
                type="submit"
                bg="black"
                color="white"
                ml={2}
                isLoading={isLoading}
                spinner={<BeatLoader size={8} color="white" />}
              >
                Send
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Bot;
