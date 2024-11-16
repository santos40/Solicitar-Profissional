import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Search, Star, Users, MapPin, MessageSquare, Phone } from "lucide-react";

const Index = () => {
  const { data: recentQuotes, isLoading } = useQuery({
    queryKey: ['recentQuotes'],
    queryFn: async () => {
      const response = await fetch('/api/admin/orcamentos?limit=5');
      return response.json();
    }
  });

  const maskPhone = (phone) => {
    return phone.slice(0, -3) + '***';
  };

  const benefits = [
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Encontre na sua região",
      description: "Conecte-se com profissionais próximos a você"
    },
    {
      icon: <Star className="w-6 h-6 text-primary" />,
      title: "Profissionais Qualificados",
      description: "Avaliações e comentários de clientes reais"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: "Orçamento Gratuito",
      description: "Receba propostas sem compromisso"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Conectando Você aos Melhores Profissionais
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Encontre profissionais qualificados ou divulgue seus serviços de forma simples e eficiente
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/orcamento">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white">
                    <Search className="mr-2 h-5 w-5" />
                    Buscar Profissionais
                  </Button>
                </Link>
                <Link to="/cadastro-profissional">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Divulgar Serviços
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Animated Image */}
            <div className="flex-1 relative animate-fade-in">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Profissionais trabalhando"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Quotes Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Últimos Pedidos de Orçamento</h2>
          <div className="grid gap-6 max-w-4xl mx-auto">
            {isLoading ? (
              <p className="text-center">Carregando pedidos...</p>
            ) : (
              recentQuotes?.map((quote) => (
                <Card key={quote.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{quote.servico}</h3>
                        <p className="text-gray-600 mb-2">{quote.descricao}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{quote.cidade}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{maskPhone(quote.telefone)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all transform hover:scale-105 duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Professionals */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Para Profissionais</h2>
            <p className="text-xl text-gray-600">
              Expanda seu negócio e encontre novos clientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle>Alcance Mais Clientes</CardTitle>
                <CardDescription>
                  Aumente sua visibilidade e receba solicitações de orçamento diretamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="text-primary" />
                  <span>Perfil profissional personalizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="text-primary" />
                  <span>Receba solicitações de orçamento</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="text-primary" />
                  <span>Sistema de avaliações</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle>Gerencie Seu Negócio</CardTitle>
                <CardDescription>
                  Ferramentas para facilitar seu dia a dia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="text-primary" />
                  <span>Defina sua área de atuação</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="text-primary" />
                  <span>Organize seus serviços</span>
                </div>
                <div className="flex items-center gap-2">
                  <Search className="text-primary" />
                  <span>Apareça nas buscas</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/cadastro-profissional">
              <Button size="lg" className="animate-pulse">
                Comece Agora Gratuitamente
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Pronto para começar?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/orcamento">
              <Button size="lg" className="w-full sm:w-auto">
                Solicitar Orçamento
              </Button>
            </Link>
            <Link to="/como-funciona">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Como Funciona
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
