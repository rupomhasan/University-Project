/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (user: any, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.node_env === "production", // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "rupom.hasan607299@gmail.com",
      pass: "zvpq berm ixrd jfqv",
    },
  });
  await transporter.sendMail({
    from: "mdrupomhasan369@gmail.com", // sender address
    to: user.email, // list of receivers
    subject: "ResetPassword ✔", // Subject line
    text: `Dear ${user?.name?.firstName},

I hope this email finds you well. My name is [Your Name], and I am reaching out to discuss a potential collaboration between our companies. I have been following your work closely and believe that our combined expertise could lead to mutually beneficial opportunities.

I would appreciate the chance to discuss this further at your earliest convenience. Please let me know a suitable time for you, and I will do my best to accommodate.

Thank you for considering this proposal. I look forward to hearing from you soon.

Best regards,
Rupom
01318044328
`, // plain text body
    html, // html body
  });
};
