export const createWhatsAppLink = (phoneNumber, name) => {
  const message = encodeURIComponent(`Olá, te achei no site solicitarorcamento.com. Gostaria de solicitar um orçamento com ${name}.`);
  return `https://wa.me/${phoneNumber}?text=${message}`;
};

export const shareProfile = (name, id) => {
  const url = `https://solicitarorcamento.com/perfil/${id}`;
  const text = `Confira o perfil de ${name} no Solicitar Orçamento`;
  
  if (navigator.share) {
    return navigator.share({
      title: 'Solicitar Orçamento',
      text,
      url
    });
  }
  
  return Promise.reject('Web Share API não suportada');
};