import nodemailer from "nodemailer";

interface sendemailParams {
  user: string;
  html: string;
}

export const sendEmail = async ({ user, html }: sendemailParams) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.EMAIL,
    to: user,
    subject: "RECUPERACION DE CONTRASEÑA TURNEX",
    html,
  };
  const rst = await transporter.sendMail(mailOptions);

  return rst;
};
