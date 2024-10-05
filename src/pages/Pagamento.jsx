import React from 'react';
import { Button } from "@/components/ui/button";

const Pagamento = () => {
  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Pagamento</h1>
      <p className="text-lg mb-6">Pague via PIX</p>
      <div className="space-y-4">
        <p>Escolha sua forma de pagamento:</p>
        <Button onClick={() => alert('Processando pagamento via PIX')}>
          Pagar com PIX
        </Button>
        <Button variant="outline" onClick={() => alert('Processando pagamento via Cartão de Crédito')}>
          Pagar com Cartão de Crédito
        </Button>
        <Button variant="outline" onClick={() => alert('Processando pagamento via Boleto')}>
          Pagar com Boleto
        </Button>
      </div>
    </div>
  );
};

export default Pagamento;