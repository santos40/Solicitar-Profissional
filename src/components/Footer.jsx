import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground p-4 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div>
          <p>&copy; 2024 Solicitar Orçamento. Todos os direitos reservados.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <ul className="flex space-x-4">
            <li><Link to="/contato" className="hover:text-accent-foreground">Contato</Link></li>
            <li><Link to="/sobre" className="hover:text-accent-foreground">Sobre</Link></li>
            <li><Link to="/termos" className="hover:text-accent-foreground">Termos de Uso</Link></li>
            <li><Link to="/privacidade" className="hover:text-accent-foreground">Privacidade</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;