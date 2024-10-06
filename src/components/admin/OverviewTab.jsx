import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OverviewTab = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <Card>
      <CardHeader>
        <CardTitle>Total de Profissionais</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">{data.totalProfissionais}</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Profissionais Pagos</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">{data.profissionaisPagos}</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Orçamentos Pendentes</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">{data.orcamentosPendentes}</p>
      </CardContent>
    </Card>
  </div>
);

export default OverviewTab;