import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';

const chatbotSteps = [
  {
    id: 1,
    message: 'What can I help you today?',
    trigger: 4,
  },
  {
    id: 2,
    message: 'Is there anything else I can help with?',
    trigger: 4,
  },
  {
    id: 3,
    message: 'Have a nice day!',
    end: true,
  },
  {
    id: 4,
    options: [
      { value: 1, label: 'Animal Quarantine Information', trigger: 5 },
      { value: 2, label: 'Pet Pickup', trigger: 6 },
      { value: 3, label: 'No help needed.', trigger: 3 },
    ],
  },
  {
    id: 5,
    component: (
      <div>
        <a href='https://hdoa.hawaii.gov/ai/aqs/aqs-info/' target='_blank' rel="noopener noreferrer">
          Click here to see the latest information.
        </a>
      </div>
    ),
    trigger: 2,
  },
  {
    id: 6,
    options: [
      { value: 1, label: 'How does this work?', trigger: 7 },
      { value: 2, label: 'Where am I in the queue?', trigger: 8 },
      { value: 3, label: 'Animal Quarantine Information', trigger: 5},
      { value: 4, label: 'No help needed.', trigger: 3 },
    ],
  },
  {
    id: 7,
    component: (
      <div>
        <ol>
          <li>Fill out the check-in form here: <Link to='/'>Check-in Form</Link></li>
          <li>You will receive a push notification when your pet is ready</li>
        </ol>
      </div>
    ),
    trigger: 6,
  },
  {
    id: 8,
    component: (
      <div>
        You can check your queue here: <Link to='/'>Current Queue</Link>
      </div>
    ),
    trigger: 6,
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
        hideSubmitButton={true}
        placeholder='Select a choice above.'
        width='500px'
      />
    </ThemeProvider>
  );
};

export default ChatbotAQ;
