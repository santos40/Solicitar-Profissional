import React from 'react';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-4xl font-bold mb-4 text-foreground">Bem-vindo ao Nosso Novo Projeto</h1>
      <p className="text-xl text-muted-foreground mb-8">Vamos construir algo incrível juntos!</p>
      <Button>Começar</Button>
    </div>
  );
};

export default Index;