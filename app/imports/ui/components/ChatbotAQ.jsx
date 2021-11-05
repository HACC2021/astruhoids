import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import chatbotSteps from './chatbotResources/chatbotSteps';
import { theme, bubbleOptionStyle } from './chatbotResources/chatbotTheme';

/** ChatbotAQ is a component created from this package: https://lucasbassetti.com.br/react-simple-chatbot */
const ChatbotAQ = () => {
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(0);

  const toggleShow = () => {
    setShow(!show);
    setKey(key + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        key={key}
        steps={chatbotSteps}
        opened={show}
        floating={true}
        toggleFloating={toggleShow}
        enableMobileAutoFocus={true}
        hideSubmitButton={true}
        placeholder='Select a choice above.'
        width='500px'
        hideUserAvatar={true}
        bubbleOptionStyle={bubbleOptionStyle}
      />
    </ThemeProvider>
  );
};

export default ChatbotAQ;
