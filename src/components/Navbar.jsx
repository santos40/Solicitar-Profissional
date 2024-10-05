import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">ViaWhatsApp</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-accent-foreground">Início</Link></li>
          <li><Link to="/cadastro-profissional" className="hover:text-accent-foreground">Cadastro Profissional</Link></li>
          <li><Link to="/cadastro-empresa" className="hover:text-accent-foreground">Cadastro Empresa</Link></li>
          <li><Link to="/orcamento" className="hover:text-accent-foreground">Solicitar Orçamento</Link></li>
          <li><Link to="/cadastrados" className="hover:text-accent-foreground">Cadastrados</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;