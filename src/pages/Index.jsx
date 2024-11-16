import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Search, UserPlus, Building2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from '@tanstack/react-query';
import { fetchRecentCompanies, fetchRecentQuotes } from '@/utils/api';

const Index = () => {
  const { data: recentCompanies, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ['recentCompanies'],
    queryFn: fetchRecentCompanies,
  });

  const { data: recentQuotes, isLoading: isLoadingQuotes } = useQuery({
    queryKey: ['recentQuotes'],
    queryFn: fetchRecentQuotes,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Solicite Orçamentos Grátis</h1>
      <p className="text-center text-lg mb-8">
        Conectamos você aos melhores profissionais da sua região
      </p>
      
      <div className="max-w-xl mx-auto mb-8">
        <form className="flex gap-2">
          <Input type="text" placeholder="Buscar profissionais ou serviços..." className="flex-grow" />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" /> Buscar
          </Button>
        </form>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Cadastre-se como Profissional</CardTitle>
            <CardDescription>Ofereça seus serviços e alcance mais clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/cadastro-profissional">
              <Button className="w-full">
                <UserPlus className="mr-2 h-4 w-4" /> Cadastrar como Profissional
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cadastre sua Empresa</CardTitle>
            <CardDescription>Expanda seu negócio e encontre novos clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/cadastro-empresa">
              <Button className="w-full">
                <Building2 className="mr-2 h-4 w-4" /> Cadastrar Empresa
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mb-8">
        <Link to="/cadastrados" className="text-blue-600 hover:underline">
          Ver Todos os Profissionais e Empresas
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Empresas Recentemente Cadastradas</h2>
      {isLoadingCompanies ? (
        <p>Carregando empresas...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {recentCompanies?.slice(0, 9).map((company) => (
            <Card key={company.id}>
              <CardContent className="flex items-center p-4">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={company.logo} alt={company.nome} />
                  <AvatarFallback>{company.nome.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{company.nome}</h3>
                  <p className="text-sm text-gray-500">{company.categoria}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">Pedidos de Orçamento Recentes</h2>
      {isLoadingQuotes ? (
        <p>Carregando pedidos de orçamento...</p>
      ) : (
        <div className="space-y-4">
          {recentQuotes?.slice(0, 5).map((quote) => (
            <Card key={quote.id}>
              <CardContent className="p-4">
                <h3 className="font-semibold">{quote.nome}</h3>
                <p className="text-sm text-gray-500">{quote.cidade}</p>
                <p>{quote.descricao}</p>
                <p className="text-sm">WhatsApp: {quote.whatsapp?.slice(0, -3)}***</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;