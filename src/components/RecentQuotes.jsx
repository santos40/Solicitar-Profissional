import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";

const RecentQuotes = () => {
  const { data: recentQuotes, isLoading } = useQuery({
    queryKey: ['recentQuotes'],
    queryFn: async () => {
      const response = await fetch('/api/admin/orcamentos?limit=5');
      return response.json();
    }
  });

  const maskPhone = (phone) => {
    return phone?.slice(0, -3) + '***';
  };

  return (
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
  );
};

export default RecentQuotes;