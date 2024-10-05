import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const registrationOptions = [
    { title: 'Profissional', description: 'Cadastre-se como profissional e ofereça seus serviços', link: '/cadastro' },
    { title: 'Cliente', description: 'Cadastre-se como cliente para encontrar profissionais', link: '/cadastro-cliente' },
    { title: 'Empresa', description: 'Cadastre sua empresa e conecte-se com clientes', link: '/cadastro-empresa' },
  ];

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao ViaWhatsApp</h1>
      <p className="mb-8">Encontre profissionais e serviços facilmente através do WhatsApp.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {registrationOptions.map((option, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{option.title}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to={option.link}>
                <Button className="w-full">Cadastrar como {option.title}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;