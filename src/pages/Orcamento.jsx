import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const Orcamento = () => {
  const form = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically send this data to your backend
    alert('Orçamento solicitado com sucesso!');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Solicitar Orçamento</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="seu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(11) 99999-9999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="servico"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serviço Desejado</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Pintura, Elétrica, Limpeza" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição do Serviço</FormLabel>
                <FormControl>
                  <Textarea placeholder="Descreva em detalhes o serviço que você precisa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Solicitar Orçamento</Button>
        </form>
      </Form>
    </div>
  );
};

export default Orcamento;