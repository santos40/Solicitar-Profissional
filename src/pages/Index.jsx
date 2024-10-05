import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const registrationOptions = [
    { title: 'Profissional', description: 'Cadastre-se como profissional e ofereça seus serviços', link: '/cadastro-profissional' },
    { title: 'Empresa', description: 'Cadastre sua empresa e conecte-se com clientes', link: '/cadastro-empresa' },
    { title: 'Cliente', description: 'Solicite um orçamento para encontrar profissionais', link: '/orcamento' },
  ];

  const exampleRequests = [
    { service: 'Pintura predial', location: 'São Paulo', urgency: 'Urgente', contact: '11 9876-xxxx' },
    { service: 'Reforma de banheiro', location: 'Rio de Janeiro', urgency: 'Em 1 mês', contact: '21 9876-xxxx' },
    { service: 'Instalação elétrica', location: 'Belo Horizonte', urgency: 'Esta semana', contact: '31 9876-xxxx' },
    { service: 'Limpeza de fachada', location: 'Curitiba', urgency: 'Próximo mês', contact: '41 9876-xxxx' },
    { service: 'Construção de muro', location: 'Porto Alegre', urgency: 'Em 2 semanas', contact: '51 9876-xxxx' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
    // You would typically make an API call or filter results here
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao ViaWhatsApp</h1>
      <p className="mb-8">Encontre profissionais e serviços facilmente através do WhatsApp.</p>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex">
          <Input
            type="text"
            placeholder="Buscar profissionais, serviços ou cidades..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" className="ml-2">
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </form>

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

      <h2 className="text-2xl font-bold mb-4">Pedidos de Orçamento Recentes</h2>
      <Carousel className="w-full max-w-xs mx-auto">
        <CarouselContent>
          {exampleRequests.map((request, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardHeader>
                  <CardTitle>{request.service}</CardTitle>
                  <CardDescription>Local: {request.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Urgência: {request.urgency}</p>
                  <p>Contato: {request.contact}</p>
                  <p className="text-sm text-gray-500 mt-2">(Completo para cadastrados)</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Index;