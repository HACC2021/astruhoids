import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import chatbotSteps from './chatbotResources/chatbotSteps';
import chatbotTheme from './chatbotResources/chatbotTheme';

/** ChatbotAQ is a component created from this package: https://lucasbassetti.com.br/react-simple-chatbot */
const ChatbotAQ = () => {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  return (
    <ThemeProvider theme={chatbotTheme}>
      <ChatBot
        steps={chatbotSteps}
        opened={show}
        floating={true}
        toggleFloating={toggleShow}
        enableMobileAutoFocus={true}
        hideSubmitButton={true}
        placeholder='Select a choice above.'
        width='500px'
        hideUserAvatar={true}
      />
    </ThemeProvider>
  );
};

export default ChatbotAQ;
