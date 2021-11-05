import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const checkinPublication = {
  checkin: 'CheckIn',
};

class CheckinCollection extends BaseCollection {
  constructor() {
    super('CheckIn', new SimpleSchema({
      firstName: String,
      phoneNumber: String,
      email: String,
    }));
  }

  /**
   * Defines a new Checkin info.
   * @param firstName the name of the owner.
   * @param phoneNumber the owner's phone number.
   * @param email the owner's email.
   * @return {String} the docID of the new document.
   */
  define({ firstName, phoneNumber, email }) {
    const docID = this._collection.insert({
      firstName,
      phoneNumber,
      email,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param firstName the new owner's name (optional).
   * @param phoneNumber the new phoneNumber (optional).
   * @param email the new email (optional).
   */
  update(docID, { firstName, phoneNumber, email }) {
    const updateData = {};
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (phoneNumber) {
      updateData.phoneNumber = phoneNumber;
    }
    if (email) {
      updateData.email = email;
    }

    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection.
   */
  publish() {
    if (Meteor.isServer) {
      // get the CheckinCollection instance.
      const instance = this;
      /** This subscription publishes the documents  */
      Meteor.publish(checkinPublication.checkin, function publish() {
        return instance._collection.find({});
      });
    }
  }

  /**
   * Subscription method for CheckIn.
   */
  subscribeCheckIn() {
    if (Meteor.isClient) {
      return Meteor.subscribe(checkinPublication.checkin);
    }
    return null;
  }

  /**
   * Modified implementation of assertValidRoleForMethod. Asserts the userId and role to be null for clients picking up their
   * pet without having to sign-up.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @return Boolean which will be true for clients picking up their pets
   */
  assertValidRoleForMethod() {
    this.assertRole(null, null);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{ firstName, phoneNumber, email }}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const firstName = doc.firstName;
    const phoneNumber = doc.phoneNumber;
    const email = doc.email;
    return { firstName, phoneNumber, email };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const CheckIn = new CheckinCollection();
