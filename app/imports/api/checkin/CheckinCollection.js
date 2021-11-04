import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const checkinPublication = {
  checkIn: 'CheckIn',
};

class CheckinCollection extends BaseCollection {
  constructor() {
    super('Checkins', new SimpleSchema({
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
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the StuffCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(checkinPublication.checkIn, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(checkinPublication.checkIn, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribeCheckIn() {
    if (Meteor.isClient) {
      return Meteor.subscribe(checkinPublication.checkIn);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
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
export const Checkins = new CheckinCollection();
