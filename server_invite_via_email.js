'use strict';
const email = require('emailjs');

const DEFAULT_FROM = 'Etherpad <email-invite@etherpad.org>';

exports.getFromAddress = (pluginSettings = {}) => pluginSettings.from || DEFAULT_FROM;
const getPluginSettings = () => require('ep_etherpad-lite/node/utils/Settings').ep_invite_via_email || {};

exports.expressServer = (hookName, args, cb) => {
  args.app.get('/server_invite_via_email', (req, res) => {
    // Get the parameters from the POST request
    // the email address of the recipient
    const emailAddy = req.param('email', null);
    // the url of the pad the recipient is being invited to
    const padurl = req.param('padurl', null);
    const pluginSettings = getPluginSettings();

    const SMTPClient = email.SMTPClient;
    const server = new SMTPClient({
      host: 'localhost',
      port: '25',
      ssl: false,
    });

    // Send the message and get a callback with an error or details of the message that was sent
    server.send({
      text: `You have been invited to collaboratively edit the pad at: ${padurl}`,
      from: exports.getFromAddress(pluginSettings),
      to: `<${emailAddy}>`,
      subject: 'You have been invited to a pad',
    }, (err, message) => {
      // console.log(err || message);
      res.send(err || message); // Send the response back to the client
    });
  });
  cb();
};
