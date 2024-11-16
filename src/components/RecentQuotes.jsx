import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const RecentQuotes = () => {
  const { data: recentQuotes, isLoading, error } = useQuery({
    queryKey: ['recentQuotes'],
    queryFn: async () => {
      const response = await fetch('admin_api.php?route=/api/admin/orcamentos');
      if (!response.ok) {
        throw new Error('Falha ao carregar orçamentos');
      }
      return response.json();
    }
  });

  const maskPhone = (phone) => {
    if (!phone) return '';
    return phone.slice(0, -3) + '***';
  };

  if (error) {
    console.error('Erro ao carregar orçamentos:', error);
    return (
      <Alert variant="destructive" className="max-w-4xl mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Erro ao carregar os pedidos de orçamento. Por favor, tente novamente mais tarde.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Últimos Pedidos de Orçamento</h2>
        <div className="grid gap-6 max-w-4xl mx-auto">
          {isLoading ? (
            <Card className="p-6">
              <p className="text-center">Carregando pedidos...</p>
            </Card>
          ) : !recentQuotes || recentQuotes.length === 0 ? (
            <Card className="p-6">
              <p className="text-center text-gray-500">Nenhum pedido de orçamento encontrado.</p>
            </Card>
          ) : (
            recentQuotes.map((quote) => (
              <Card key={quote.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{quote.categoria}</h3>
                      <p className="text-gray-600 mb-2">{quote.servico}</p>
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
  );
};

export default RecentQuotes;