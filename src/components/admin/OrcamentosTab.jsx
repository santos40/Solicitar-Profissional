import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const OrcamentosTab = ({ orcamentos }) => (
  <Card>
    <CardHeader>
      <CardTitle>Orçamentos Recentes</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orcamentos.map((orcamento) => (
            <TableRow key={orcamento.id}>
              <TableCell>{orcamento.nome}</TableCell>
              <TableCell>{orcamento.servico}</TableCell>
              <TableCell>{orcamento.status}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Detalhes</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Detalhes do Orçamento</DialogTitle>
                    </DialogHeader>
                    <div>
                      <p><strong>Cliente:</strong> {orcamento.nome}</p>
                      <p><strong>Serviço:</strong> {orcamento.servico}</p>
                      <p><strong>Status:</strong> {orcamento.status}</p>
                      <p><strong>Descrição:</strong> {orcamento.descricao}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default OrcamentosTab;