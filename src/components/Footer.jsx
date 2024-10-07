import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground p-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p>&copy; 2024 Orçamentos Grátis. Todos os direitos reservados.</p>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li><Link to="/contato" className="hover:text-accent-foreground">Contato</Link></li>
            <li><Link to="/admin" className="hover:text-accent-foreground">Admin</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;