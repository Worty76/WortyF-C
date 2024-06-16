import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

// const BotRedirect = ({ url, message }) => {
//   return (
//     <div>
//       <a href={url} target="_blank" rel="noreferrer">
//         {message}
//       </a>
//     </div>
//   );
// };

const CHATBOT_THEME = {
  background: "#FFFEFC",
  fontFamily: "Roboto",
  headerBgColor: "#24292F",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#24292F",
  botFontColor: "#fff",
  userBubbleColor: "#24292F",
  userFontColor: "#fff"
};

const ChatBotHelper = () => {

  const steps = [
    {
      id: "1",
      message: "Hello!",
      trigger: "2"
    },
    {
      id: "2",
      message: "How can I help you?",
      trigger: "3"
    },
    {
      id: "3",
      options: [
        { value: 1, label: "How to create a post", trigger: "4" },
        { value: 2, label: "How to like a post", trigger: "5" }
      ]
    },
    {
      id: "4",
      message: "Here's how to create a post. 1. Click 'Start a new Discussion' at Home page, 2. Fill the blank fields, 3. Click at submit.",
      trigger: "2"
    },
    {
      id: "5",
      message: "At the discussion post, click at like button. If it's red means you already liked",
      trigger: "2"
    }
  ];

  return (
      <ThemeProvider theme={CHATBOT_THEME}>
        <ChatBot steps={steps} floating={"true"} />
      </ThemeProvider>
  );
};

export default ChatBotHelper;