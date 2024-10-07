import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { to: "/", label: "Início" },
    { to: "/cadastro-profissional", label: "Cadastro Profissional" },
    { to: "/cadastro-empresa", label: "Cadastro Empresa" },
    { to: "/orcamento", label: "Solicitar Orçamento" },
    { to: "/cadastrados", label: "Cadastrados" },
  ];

  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Orçamentos Grátis</Link>
        
        {/* Menu para desktop */}
        <ul className="hidden md:flex space-x-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.to} className="hover:text-accent-foreground">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Menu hambúrguer para mobile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            {menuItems.map((item, index) => (
              <DropdownMenuItem key={index} asChild>
                <Link to={item.to} className="w-full">
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;