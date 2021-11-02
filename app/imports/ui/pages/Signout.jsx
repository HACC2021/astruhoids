import React from 'react';
import { Meteor } from 'meteor/meteor';
import { PAGE_IDS } from '../utilities/PageIDs';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
const Signout = () => {
  Meteor.logout();
  return (
    <h2 id={PAGE_IDS.SIGN_OUT}>
      <p>You are signed out.</p>
    </h2>
  );
};

export default Signout;
