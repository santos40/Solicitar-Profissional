import { HomeIcon, InfoIcon, MailIcon } from "lucide-react";
import Index from "./pages/Index.jsx";

export const navItems = [
  {
    title: "Início",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Sobre",
    to: "/sobre",
    icon: <InfoIcon className="h-4 w-4" />,
    // Adicione a página Sobre quando for criada
  },
  {
    title: "Contato",
    to: "/contato",
    icon: <MailIcon className="h-4 w-4" />,
    // Adicione a página Contato quando for criada
  },
];