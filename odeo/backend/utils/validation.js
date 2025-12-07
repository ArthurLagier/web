/**
 * Vérifie si un mot de passe respecte les conditions de force :
 * min 12 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 spécial.
 * @param {string} password Le mot de passe à valider.
 * @returns {boolean} Vrai si le mot de passe est valide, Faux sinon.
 */
export function isPasswordStrong(password) {
  if (!password) return false;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{12,}$/;
  return passwordRegex.test(password);
}