import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">ViaWhatsApp</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-accent-foreground">Início</Link></li>
          <li><Link to="/cadastro" className="hover:text-accent-foreground">Cadastro</Link></li>
          <li><Link to="/orcamento" className="hover:text-accent-foreground">Orçamento</Link></li>
          <li><Link to="/sobre" className="hover:text-accent-foreground">Sobre</Link></li>
          <li><Link to="/contato" className="hover:text-accent-foreground">Contato</Link></li>
          <li><Link to="/admin" className="hover:text-accent-foreground">Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;