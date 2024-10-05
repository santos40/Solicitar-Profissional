import React from 'react';
import { Button } from "@/components/ui/button";

const Pagamento = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pagamento</h1>
      <p className="mb-4">Escolha sua forma de pagamento:</p>
      <div className="space-y-4">
        <Button className="w-full">Cartão de Crédito</Button>
        <Button className="w-full">Boleto Bancário</Button>
        <Button className="w-full">PIX</Button>
      </div>
    </div>
  );
};

export default Pagamento;