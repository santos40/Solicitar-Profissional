import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  nomeEmpresa: z.string().min(2, "O nome da empresa deve ter pelo menos 2 caracteres."),
  cnpj: z.string().min(14, "CNPJ inválido"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  endereco: z.string().min(5, "Endereço muito curto"),
  descricao: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  facebook: z.string().url("URL inválida").optional().or(z.literal('')),
  instagram: z.string().url("URL inválida").optional().or(z.literal('')),
  linkedin: z.string().url("URL inválida").optional().or(z.literal('')),
  website: z.string().url("URL inválida").optional().or(z.literal('')),
  logotipo: z.any(),
  fotos: z.array(z.any()).max(4, "Máximo de 4 fotos permitidas"),
});

const CadastroEmpresa = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeEmpresa: "",
      cnpj: "",
      email: "",
      telefone: "",
      endereco: "",
      descricao: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      website: "",
      logotipo: null,
      fotos: [],
    },
  });

  const onSubmit = (values) => {
    console.log(values);
    // Aqui você implementaria a lógica para enviar o cadastro da empresa
    alert("Empresa cadastrada com sucesso!");
  };

  const onDropLogo = useCallback((acceptedFiles) => {
    form.setValue('logotipo', acceptedFiles[0]);
  }, [form]);

  const onDropFotos = useCallback((acceptedFiles) => {
    form.setValue('fotos', acceptedFiles.slice(0, 4));
  }, [form]);

  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } = useDropzone({
    onDrop: onDropLogo,
    accept: 'image/*',
    maxFiles: 1
  });

  const { getRootProps: getFotosRootProps, getInputProps: getFotosInputProps } = useDropzone({
    onDrop: onDropFotos,
    accept: 'image/*',
    maxFiles: 4
  });

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Cadastro de Empresa</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="nomeEmpresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Empresa</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da sua empresa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input placeholder="00.000.000/0000-00" {...field} />
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
                  <Input type="email" placeholder="empresa@email.com" {...field} />
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
                  <Input placeholder="(00) 0000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endereco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Endereço completo" {...field} />
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
                <FormLabel>Descrição da Empresa</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva sua empresa e os serviços oferecidos..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input placeholder="https://facebook.com/suaempresa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input placeholder="https://instagram.com/suaempresa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input placeholder="https://linkedin.com/company/suaempresa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.suaempresa.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="logotipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logotipo</FormLabel>
                <FormControl>
                  <div {...getLogoRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer">
                    <input {...getLogoInputProps()} />
                    <p>Arraste e solte o logotipo aqui, ou clique para selecionar</p>
                  </div>
                </FormControl>
                {field.value && <p className="mt-2">{field.value.name}</p>}
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="fotos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fotos (máximo 4)</FormLabel>
                <FormControl>
                  <div {...getFotosRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer">
                    <input {...getFotosInputProps()} />
                    <p>Arraste e solte até 4 fotos aqui, ou clique para selecionar</p>
                  </div>
                </FormControl>
                {field.value.length > 0 && (
                  <ul className="mt-2">
                    {field.value.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit">Cadastrar Empresa</Button>
        </form>
      </Form>
    </div>
  );
};

export default CadastroEmpresa;
