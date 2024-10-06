import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Search, UserPlus, Building2 } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Bem-vindo ao ViaWhatsApp</h1>
      
      <div className="max-w-xl mx-auto mb-8">
        <form className="flex gap-2">
          <Input type="text" placeholder="Buscar profissionais ou serviços..." className="flex-grow" />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" /> Buscar
          </Button>
        </form>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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

      <div className="text-center mt-8">
        <Link to="/cadastrados">
          <Button variant="outline">Ver Todos os Profissionais e Empresas</Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;