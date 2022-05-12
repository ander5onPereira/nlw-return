import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapters";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a24c7984ef86f8",
    pass: "f36e180292a479",
  },
});
export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Anderson Pereira <anderson.carro.95@gmail.com>",
      subject,
      html: body,
    });
  }
}
