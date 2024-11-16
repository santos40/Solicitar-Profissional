import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const ComoFunciona = () => {
  const steps = [
    {
      title: "1. Escolha o Serviço",
      description: "Navegue por nossa lista de categorias e encontre o tipo de serviço que você precisa."
    },
    {
      title: "2. Solicite Orçamentos",
      description: "Preencha um formulário simples descrevendo o que você precisa. É rápido e fácil!"
    },
    {
      title: "3. Receba Propostas",
      description: "Profissionais qualificados entrarão em contato com você com suas propostas."
    },
    {
      title: "4. Compare e Escolha",
      description: "Compare os orçamentos recebidos e escolha o profissional que melhor atende suas necessidades."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Como Funciona</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="grid gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center space-y-6">
          <h2 className="text-2xl font-semibold">Pronto para começar?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/solicitar-orcamento" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              Solicitar Orçamento
            </a>
            <a href="/cadastrar-servico" className="inline-flex items-center justify-center px-6 py-3 bg-white border border-primary text-primary rounded-lg hover:bg-gray-50 transition-colors">
              Cadastrar Serviço
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComoFunciona;