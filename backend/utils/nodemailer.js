import nodemailer from "nodemailer";

export async function sendEmail(to) {
  const {
    email,
    g_Otp,
    OrderID,
    subject,
    name,
    phone,
    address,
    totalAmount,
    postal_code,
    message,
  } = to;
  let output = "";
  let sendTo ;

  if (subject === "Reset Password Code") {
    output = `
    <h3>Password Reset Code</h3>
    <p>This link will expire in 15 minutes</p>
    <p> ${g_Otp}</p>
  `;
  sendTo = email;
  } else if (subject === "New Order") {
    output = `
    <h3>New Order</h3>
    <p> From : ${name}</p>
    <p> Phone : ${phone}</p>
    <p> Address : ${address}</p>
    <p> postal Code : ${postal_code}</p>
    <p> Total Amount : ${totalAmount}</p>
    <p> OrderID : ${OrderID}</p>
  `;
  sendTo = [email,process.env.EMAIL_AUTH_USER_EMAIL]
  } else if (subject === "Contact Notification") {
    output = `
    <h3>New Order</h3>
    <p> From : ${name}</p>
    <p> Phone Number : ${phone}</p>
    <p> Email : ${email}</p>
    <p> Message : ${message}</p>
  `;
  sendTo = process.env.EMAIL_AUTH_USER_EMAIL;
  }



  let transport = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_AUTH_USER_EMAIL,
      pass: process.env.EMAIL_AUTH_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailoptions = {
    from: process.env.EMAIL_AUTH_USER_EMAIL,
    to: sendTo,
    subject: subject,
    html: output,
  };

  transport.sendMail(mailoptions, (error) => {
    if (error) {
      return false;
    }
    return true;
  });
}
