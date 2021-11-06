import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
// be sure to import the methods.
import '../imports/api/base/BaseCollection.methods';
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import SimpleSchema from 'simpl-schema';

Meteor.methods({
  'sendEmail'({ to, from, subject, text }) {
    new SimpleSchema({
      to: { type: String },
      from: { type: String },
      subject: { type: String },
      text: { type: String },
    }).validate({ to, from, subject, text });
    this.unblock();

    Email.send({ to, from, subject, text });
  },
});
