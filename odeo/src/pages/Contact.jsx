import React, { useState } from 'react';
import { api } from '../api'; // Ton utilitaire API existant
import '../Contact.css'; // On va créer ce CSS juste après

function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // Pour afficher succès ou erreur

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Envoi en cours...');

    try {
      await api('/contact', { method: 'POST', body: form });
      setStatus('Message envoyé ! Nous vous répondrons bientôt.');
      setForm({ nom: '', email: '', message: '' }); // Reset formulaire après envoie
    } catch (err) {
      setStatus("Erreur lors de l'envoi. Réessayez plus tard.");
    }
  };

  return (
    <div className="contact-page">
      <h1>Contactez-nous</h1>
      <p>Un problème ? Une suggestion ? Écrivez-nous !</p>
      {/*Cases formulaire, nom, email et message*/}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom</label>
          <input 
            type="text" 
            name="nom" 
            value={form.nom} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea 
            name="message" 
            rows="5" 
            value={form.message} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit" className="submit-btn">Envoyer le message</button>
      </form>

      {status && <p className="status-msg">{status}</p>}
    </div>
  );
}

export default Contact;