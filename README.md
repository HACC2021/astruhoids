# Holoholona by Team AstrUHoids

## Table of Contents
* [About](#about)
* [Links](#links)
* [Installation](#installation)
* [Security Privacy](#security-privacy)
* [Team](#team)

## About
Holoholona is a check-in application for the Hawai'i Department of Agriculture (H.D.O.A) where pet owners can check in without needing an account. After Owners check-in with our application, they will receive an email notification and another once their pet is ready for pick-up. In addition, we have a chatbot where pet owners can ask general questions about the use of our application.

## Links
- [Astruhoids Repository](https://github.com/HACC2021/astruhoids)
- [Deployed Application](https://holoholona.meteorapp.com/#/)
- [DevPost](https://devpost.com/software/astruhoids) 

## Installation
Download and install the latest version of [Meteor](https://www.meteor.com/)
Clone the repository to your local system and open the `app` directory in a terminal.
To run locally:

meteor npm install
meteor npm run start

If all goes well, the application will appear at [http://localhost:3000](http://localhost:3000).

### Application Design

Holoholona is based upon [MATRP](https://ics-software-engineering.github.io/matrp/) which is an extension of [meteor-application-template-react](https://ics-software-engineering.github.io/meteor-application-template-react/).

## Security Privacy
Our app includes a form that anyone can fill out and submit and one of the submitted fields is publicly available to see. This does create a concern for XSS if someone were to try to embed a malicious script in this publicly accessible field. However, React does take care of this for us since it auto-escapes displayed text. E.g., if someone were to attempt to embed <script> tags, they would not be interpreted as such.

Though the database will contain some personal information such as first and last name, email, and phone number, this information does not need to be stored for very long. After owners pick up their pets, their information is deleted from the database. If there are any lasting check-in entries within the database, they can be deleted 12-hrs after their time of creation as this would be adequate time to have checked-in and received their pet (assuming their pet is cleared).

Ways to prevent the database contents from being leaked include two factor authentication into the application, and requiring a certificate to connect to the database server. These solutions help prevent bad actors from simply brute forcing an admin login on both the site and the database. Only designated parties would have access to the data.

## Team
- [Deshay Clemons](https://github.com/deshay-clemons)
- [Luke McDonald](https://github.com/lukemcd9)
- [Gabriel Undan](https://github.com/gabrielundan)
- [Kevin Nguyen](https://github.com/kvndngyn)
