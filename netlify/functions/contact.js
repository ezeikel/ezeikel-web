const postmark = require("postmark");

const createEmail = (text) => `
  <div style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <p>${text}</p>
  </div>
`;

exports.handler = async (event) => {
  const payload = JSON.parse(event.body);
  const { fullName, email, message } = payload;

  console.log({
    fullName,
    email,
    message,
  });

  // send an email
  const client = new postmark.ServerClient(process.env.POSTMARK_TOKEN);

  try {
    const response = await client.sendEmail({
      From: "contact-form@ezeikel.dev",
      To: "hi@ezeikel.dev",
      Subject: `Enquiry via ezeikel.com from ${fullName} (${email})`,
      HtmlBody: createEmail(message),
      TextBody: message,
      MessageStream: "outbound",
    });

    console.log({ response });

    return {
      statusCode: 200,
      body: "Email sent",
    };
  } catch (error) {
    console.error({ error });

    const statusCode = typeof error.code === "number" ? error.code : 500;

    return {
      statusCode,
      body: error.message,
    };
  }
};
