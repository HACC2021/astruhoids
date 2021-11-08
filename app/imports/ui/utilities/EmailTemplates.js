export const checkedInEmail = (firstName, phoneNumber) => `
    <html = \`<html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width" />
      </head>
      <body>
        <img src="https://hdoa.hawaii.gov/ai/files/2014/03/hdoa-logo.png" alt="DoA"/>
        <p>
          Hello ${firstName},<br/><br/>
          You have successfully checked-in for your animal's release. We will send an email and call your phone: ${phoneNumber} when your animal(s) are ready to be picked up.<br/><br/>
          Thank you,<br/>
          State of Hawaii Department of Agriculture.
        </p>
      </body>
    </html>
  `;

export const animalReadyEmail = (firstName) => `
  <html = \`<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta name="viewport" content="width=device-width" />
    </head>
    <body>
      <img src="https://hdoa.hawaii.gov/ai/files/2014/03/hdoa-logo.png" alt="DoA"/>
      <p>
        Hello ${firstName},<br/><br/>
        Your animal is ready to be picked up from our office, please return to our office and claim your animal.<br/><br/>
        Thank you,<br/>
        State of Hawaii Department of Agriculture.
      </p>
    </body>
  </html>
`;