import nodemailer from 'nodemailer';
import Env from '@ioc:Adonis/Core/Env';

const HelperEmail = async (datos) => {
  const transport = nodemailer.createTransport({
    host: Env.get('SMTP_HOST'),
    port: Env.get('SMTP_PORT'),
    auth: {
      user: Env.get('SMTP_USERNAME'),
      pass: Env.get('SMTP_PASSWORD'),
    },
  });
  const { nick_name, email }= datos

  // enviar email
  const info = await transport.sendMail({
    from: "Task manager",
    to: email,
    subject: `Bienvenido ${nick_name}`,
    text: 'te has registrado correctamente a la aplicacion',
    html: `<h1>bienvenido ${email} <h1>`,
  })
};


export default HelperEmail;
