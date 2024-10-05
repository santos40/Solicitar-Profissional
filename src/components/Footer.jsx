import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground p-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p>&copy; 2024 ViaWhatsApp. Todos os direitos reservados.</p>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li><Link to="/sobre" className="hover:text-accent-foreground">Sobre</Link></li>
            <li><Link to="/contato" className="hover:text-accent-foreground">Contato</Link></li>
            <li><Link to="/termos" className="hover:text-accent-foreground">Termos de Uso</Link></li>
            <li><Link to="/privacidade" className="hover:text-accent-foreground">Política de Privacidade</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;