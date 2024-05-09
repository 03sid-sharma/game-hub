import { useEffect, useRef, useState } from "react";
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
  Text
} from "@chakra-ui/react";
import useGpt from "../hooks/useGpt";
import BeatLoader from "react-spinners/BeatLoader";
import "./Bot.css";

const Bot = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<String[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const { error, sendRequest, isLoading} = useGpt();
 const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesContainerRef.current?.scrollTo(0, messagesContainerRef.current?.scrollHeight);
  }, [messages]);

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
      <button className="btn" onClick={() => setIsModalOpen(!isModalOpen)}>
        <svg
          height="24"
          width="24"
          fill="#FFFFFF"
          viewBox="0 0 24 24"
          data-name="Layer 1"
          id="Layer_1"
          className="sparkle"
        >
          <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
        </svg>

        <span className="text">AI</span>
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)}>
        <ModalOverlay
          position="fixed"
          bottom="0"
          p={4}
          borderRadius="md"
        />
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
          <ModalBody maxH="60vh" overflowY="auto" ref={messagesContainerRef}>
            <VStack align="stretch" spacing={4}>
              {messages.map((message, index) => (
                <div key={index} className="message">
                  {message}
                </div>
              ))}
              {error && <Text>{error}</Text>}
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
