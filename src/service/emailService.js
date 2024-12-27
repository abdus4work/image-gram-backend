import sendMail from '../utils/common/mailer.js';

export const sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to ImageGram!';
  const text = `Hi ${user.username},

Thank you for registering with ImageGram. We're excited to have you on board!

If you have any questions or need support, feel free to reach out to us.

Best regards,
The [Your App Name] Team
`;
  const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            padding: 20px;
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
          }
          .header img {
            max-width: 150px;
          }
          .content {
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
          }
          .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 12px;
            color: #aaaaaa;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://your-logo-url.com/logo.png" alt="[Your App Name] Logo">
          </div>
          <div class="content">
            <p>Hi <strong>${user.username}</strong>,</p>
            <p>Thank you for registering with <strong>ImageGram</strong>. We're excited to have you on board!</p>
            <p>If you have any questions or need support, feel free to reach out to us.</p>
            <p>Best regards,<br>The ImageGram Team</p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} ImageGram. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

  await sendMail(user.email, subject, text, html);
};
