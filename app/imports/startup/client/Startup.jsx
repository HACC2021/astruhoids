import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.jsx';

/* global document */

// Startup the application by rendering the App layout component.
Meteor.startup(() => {
  process.env.MAIL_URL = `smtps://${Meteor.settings.public.email.user}:${Meteor.settings.public.email.password}@smtp.gmail.com:465`;
  render(<App />, document.getElementById('root'));
});
