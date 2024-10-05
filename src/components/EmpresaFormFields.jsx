import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const EmpresaFormFields = ({ form, getLogoRootProps, getLogoInputProps, getFotosRootProps, getFotosInputProps }) => {
  const fields = [
    { name: 'nomeEmpresa', label: 'Nome da Empresa', type: 'text' },
    { name: 'cnpj', label: 'CNPJ', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'telefone', label: 'Telefone', type: 'tel' },
    { name: 'endereco', label: 'Endereço', type: 'text' },
    { name: 'cidade', label: 'Cidade', type: 'text' },
    { name: 'estado', label: 'Estado', type: 'text' },
    { name: 'facebook', label: 'Facebook', type: 'url' },
    { name: 'instagram', label: 'Instagram', type: 'url' },
    { name: 'linkedin', label: 'LinkedIn', type: 'url' },
    { name: 'website', label: 'Website', type: 'url' },
  ];

  return (
    <>
      {fields.map((field) => (
        <FormField
          key={field.name}
          control={form.control}
          name={field.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input type={field.type} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
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
    </>
  );
};