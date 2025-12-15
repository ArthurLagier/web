/* Vérifie mot de passe-->min 12 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 spécial. Return Vrai si mot de passe valide, Faux sinon.*/
export function isPasswordStrong(password) {
  if (!password) return false;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{12,}$/;
  return passwordRegex.test(password);
}