import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const registrationOptions = [
    { title: 'Profissional', description: 'Cadastre-se como profissional e ofereça seus serviços', link: '/cadastro-profissional' },
    { title: 'Empresa', description: 'Cadastre sua empresa e conecte-se com clientes', link: '/cadastro-empresa' },
    { title: 'Cliente', description: 'Solicite um orçamento para encontrar profissionais', link: '/orcamento' },
  ];

  const exampleRequests = [
    { service: 'Pintura predial', location: 'São Paulo', urgency: 'Urgente', contact: 'xx xxxx-xxxx' },
    { service: 'Reforma de banheiro', location: 'Rio de Janeiro', urgency: 'Em 1 mês', contact: 'xx xxxx-xxxx' },
    { service: 'Instalação elétrica', location: 'Belo Horizonte', urgency: 'Esta semana', contact: 'xx xxxx-xxxx' },
  ];

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao ViaWhatsApp</h1>
      <p className="mb-8">Encontre profissionais e serviços facilmente através do WhatsApp.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {registrationOptions.map((option, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{option.title}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to={option.link}>
                <Button className="w-full">
                  {option.title === 'Cliente' ? 'Solicitar Orçamento' : `Cadastrar como ${option.title}`}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Exemplos de Pedidos de Orçamento</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exampleRequests.map((request, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{request.service}</CardTitle>
              <CardDescription>Local: {request.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Urgência: {request.urgency}</p>
              <p>Contato: {request.contact}</p>
              <p className="text-sm text-gray-500 mt-2">(Visível apenas para cadastrados)</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;