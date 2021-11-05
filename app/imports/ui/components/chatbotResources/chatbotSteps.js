import React from 'react';
import { Link } from 'react-router-dom';

/** Chatbot steps - messages sent to user & options for user to choose from */
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
          Click here to see the latest information
        </a>
      </div>
    ),
    trigger: 2,
  },
  {
    id: 6,
    options: [
      { value: 1, label: 'How does this work?', trigger: 7 },
      { value: 2, label: 'How do I know I checked in?', trigger: 8 },
      { value: 3, label: 'Animal Quarantine Information', trigger: 5 },
      { value: 4, label: 'No help needed.', trigger: 3 },
    ],
  },
  {
    id: 7,
    component: (
      <div>
        <ol>
          <li>Fill out the <Link to='/'>check-in form</Link>. This will let us know that you are here.</li>
          <li>Pets go through inspection in the order they have arrived.</li>
          <li>When your pet is ready, we will send you an email or give you a call.</li>
        </ol>
      </div>
    ),
    trigger: 6,
  },
  {
    id: 8,
    component: (
      <div>
        Go to the <Link to='/'>check-ins page</Link> or check the TV for your check-in ID
      </div>
    ),
    trigger: 6,
  },
];

export default chatbotSteps;
