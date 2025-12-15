import nodemailer from 'nodemailer';
export const sendContactEmail = async (req, res) => {
  const { nom, email, message } = req.body;

  if (!nom || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  // Pour contacter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'arthurlagiermunshi@gmail.com',
      pass: process.env.GMAIL_PASS 
    }
  });

  const mailOptions = {
    from: 'arthurlagiermunshi@gmail.com', 
    to: 'arthurlagiermunshi@gmail.com',
    replyTo: email, 
    subject: `Nouveau message de contact de : ${nom}`,
    text: `Nom: ${nom}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé !");
    res.status(200).json({ message: 'Email envoyé avec succès !' });
  } catch (error) {
    console.error("Erreur Nodemailer :", error);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
  }
};