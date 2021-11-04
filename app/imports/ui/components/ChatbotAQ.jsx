import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const chatbotSteps = [
  {
    id: '1',
    message: 'What number I am thinking?',
    trigger: '2',
  },
  {
    id: '2',
    options: [
      { value: 1, label: 'Number 1', trigger: '4' },
      { value: 2, label: 'Number 2', trigger: '3' },
      { value: 3, label: 'Number 3', trigger: '3' },
    ],
  },
  {
    id: '3',
    message: 'Wrong answer, try again.',
    trigger: '2',
  },
  {
    id: '4',
    message: 'Awesome! You are a telepath!',
    end: true,
  },
];

/** Theme for chatbot */
const theme = {
  background: '#fff',
  headerBgColor: '#198754',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#198754',
  botFontColor: '#fff',
  userBubbleColor: '##f7f7f7',
  userFontColor: '#000000',
};

/** ChatbotAQ is a component created from react-simple-chat https://lucasbassetti.com.br/react-simple-chatbot */
const ChatbotAQ = () => {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        steps={chatbotSteps}
        opened={show}
        floating={true}
        toggleFloating={toggleShow}
        enableMobileAutoFocus={true}
      />
    </ThemeProvider>
  );
};

export default ChatbotAQ;
