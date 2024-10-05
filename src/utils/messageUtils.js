export const createWhatsAppLink = (phoneNumber, name) => {
  const message = encodeURIComponent(`Olá, te achei no site viawhatsapp.com/orcamento. Gostaria de falar com ${name}.`);
  return `https://wa.me/${phoneNumber}?text=${message}`;
};