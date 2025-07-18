const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const useragent = require('express-useragent');
require('dotenv').config();
const ContactMessage = require('../models/ContactMessage');


// Middleware to capture user-agent info
router.use(useragent.express());

router.post('/contact-form', async (req, res) => {
  const { name, email, message } = req.body;

  // Step 1: Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, msg: 'Missing fields' });
  }

  try {
    // Step 2: Collect metadata
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const referrer = req.get('Referrer') || 'N/A';
    const metadata = {
      ip,
      referrer,
      browser: req.useragent.browser,
      os: req.useragent.os,
      platform: req.useragent.platform,
    };

    console.log('🔍 Contact form metadata:', metadata);
    // ✅ Save message and metadata to MongoDB
    await new ContactMessage({
      name,
      email,
      message,
      ip: metadata.ip,
      referrer: metadata.referrer,
      browser: metadata.browser,
      os: metadata.os,
      platform: metadata.platform
    }).save();

    // Step 3: Configure mail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Step 4: Email to Harshit (You)
    const mailToYou = {
      from: `"Portfolio Alert Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.MY_EMAIL,
      subject: `🛡️ New Contact Message from ${name} via Portfolio`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: #ffffff; border-radius: 8px; padding: 24px; max-width: 600px; margin: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <h2 style="color: #0b0c10; border-bottom: 2px solid #66fcf1; padding-bottom: 10px;">📬 New Message Received</h2>
            <p><strong>👤 Name:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>📝 Message:</strong></p>
            <blockquote style="border-left: 4px solid #66fcf1; padding-left: 10px; color: #333;">${message}</blockquote>

            <hr style="margin: 20px 0;" />
            <p><strong>📍 Metadata:</strong></p>
            <ul>
              <li>🌐 IP: ${metadata.ip}</li>
              <li>🔗 Referrer: ${metadata.referrer}</li>
              <li>🧭 Browser: ${metadata.browser}</li>
              <li>💻 OS: ${metadata.os}</li>
              <li>📱 Platform: ${metadata.platform}</li>
            </ul>

            <p style="font-size: 0.9em; color: #777;">
              📥 This message was submitted via your cybersecurity portfolio.<br/>
              📅 ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      text: `New Contact Message\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}\n\n---\nMetadata:\nIP: ${metadata.ip}\nReferrer: ${metadata.referrer}\nBrowser: ${metadata.browser}\nOS: ${metadata.os}\nPlatform: ${metadata.platform}`
    };

    // Step 5: Auto-reply to user
    const mailToUser = {
      from: `"Harshit Vasoya" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thanks for reaching out! 👋',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f3f3f3;">
          <h3 style="color: #333;">Hi ${name},</h3>
          <p>Thank you for reaching out through my cybersecurity portfolio.</p>
          <p>I appreciate your message and will get back to you shortly.</p>
          <br />
          <p>Warm regards,<br /><strong>Harshit Vasoya</strong></p>
        </div>
      `,
      text: `Hi ${name},\n\nThank you for contacting me! I’ll get back to you shortly.\n\nRegards,\nHarshit Vasoya`
    };

    // Step 6: Send both emails
    await transporter.sendMail(mailToYou);
    await transporter.sendMail(mailToUser);

    return res.status(200).json({ success: true, msg: 'Emails sent successfully' });
  } catch (err) {
    console.error('❌ Email sending error:', err);
    return res.status(500).json({ success: false, msg: 'Failed to send emails' });
  }
});

module.exports = router;
