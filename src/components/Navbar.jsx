import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Database } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const menuItems = [
    { to: "/", label: "Início" },
    { to: "/cadastro-profissional", label: "Cadastrar Serviço" },
    { to: "/orcamento", label: "Solicitar Orçamento" },
    { to: "/cadastrados", label: "Encontrar Profissionais" },
    { to: "/como-funciona", label: "Como Funciona" },
  ];

  return (
    <nav className="bg-primary text-primary-foreground p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold">Solicitar Orçamento</Link>
          <Button 
            variant="secondary" 
            size="sm" 
            className="hidden md:flex items-center gap-2"
            onClick={() => window.open('https://supabase.com', '_blank')}
          >
            <Database className="h-4 w-4" />
            Supabase
          </Button>
        </div>
        
        {/* Menu para desktop */}
        <ul className="hidden md:flex space-x-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.to} 
                className="hover:text-accent-foreground transition-colors"
              >
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
            <DropdownMenuItem asChild>
              <button
                className="w-full flex items-center gap-2"
                onClick={() => window.open('https://supabase.com', '_blank')}
              >
                <Database className="h-4 w-4" />
                Supabase
              </button>
            </DropdownMenuItem>
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