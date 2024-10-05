import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { EmpresaFormFields } from '@/components/EmpresaFormFields';

const formSchema = z.object({
  nomeEmpresa: z.string().min(2, "O nome da empresa deve ter pelo menos 2 caracteres."),
  cnpj: z.string().min(14, "CNPJ inválido"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  endereco: z.string().min(5, "Endereço muito curto"),
  cidade: z.string().min(2, "Cidade inválida"),
  estado: z.string().length(2, "Use a sigla do estado com 2 letras"),
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
      cidade: "",
      estado: "",
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
    alert("Empresa cadastrada com sucesso!");
  };

  const onDropLogo = (acceptedFiles) => {
    form.setValue('logotipo', acceptedFiles[0]);
  };

  const onDropFotos = (acceptedFiles) => {
    form.setValue('fotos', acceptedFiles.slice(0, 4));
  };

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
          <EmpresaFormFields
            form={form}
            getLogoRootProps={getLogoRootProps}
            getLogoInputProps={getLogoInputProps}
            getFotosRootProps={getFotosRootProps}
            getFotosInputProps={getFotosInputProps}
          />
          <Button type="submit" className="w-full">Cadastrar Empresa</Button>
        </form>
      </Form>
    </div>
  );
};

export default CadastroEmpresa;