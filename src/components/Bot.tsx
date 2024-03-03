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
  IconButton,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import useGpt, { Candidate } from "../hooks/useGpt";

const Bot = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<String[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const { error, sendRequest } = useGpt();

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;
    const latestMsg = inputMessage;
    setInputMessage("");
    const newMessages = [...messages, latestMsg];
    setMessages(newMessages);

    // Send user's message to the useGpt hook
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
        bg="white" // Solid white color
        color="black" // Black text color
        boxShadow="lg"
        zIndex="999"
        aria-label="Chat with AI"
        icon={<ChatIcon boxSize={8} color="black" />} // Icon color set to black
        _hover={{
          bg: "gray.100", // Lighter color on hover
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
          <ModalBody>
            <VStack align="stretch" spacing={4}>
              {messages.map((message, index) => (
                <div key={index} className="message">
                  {message}
                </div>
              ))}
            </VStack>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              mt={2}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSendMessage} bg="black" color="white">
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Bot;
