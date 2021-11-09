import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
// be sure to import the methods.
import '../imports/api/base/BaseCollection.methods';
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import SimpleSchema from 'simpl-schema';

if (Meteor.settings.email.enabled) {
  process.env.MAIL_URL = `smtps://${Meteor.settings.email.user}:${Meteor.settings.email.password}@smtp.gmail.com:465`;
}

Meteor.methods({
  'sendEmail'({ to, from, subject, html }) {
    new SimpleSchema({
      to: { type: String },
      from: { type: String },
      subject: { type: String },
      html: { type: String },
    }).validate({ to, from, subject, html });
    this.unblock();

    Email.send({ to, from, subject, html });
  },
});
