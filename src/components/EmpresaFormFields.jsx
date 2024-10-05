import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const FormSection = ({ title, children }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const FormInput = ({ form, name, label, type = "text" }) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type={type} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const EmpresaFormFields = ({ form, getLogoRootProps, getLogoInputProps, getFotosRootProps, getFotosInputProps }) => {
  return (
    <>
      <FormSection title="Informações Básicas">
        <FormInput form={form} name="nomeEmpresa" label="Nome da Empresa" />
        <FormInput form={form} name="cnpj" label="CNPJ" />
        <FormInput form={form} name="email" label="Email" type="email" />
        <FormInput form={form} name="telefone" label="Telefone" type="tel" />
      </FormSection>

      <FormSection title="Endereço">
        <FormInput form={form} name="endereco" label="Endereço" />
        <FormInput form={form} name="cidade" label="Cidade" />
        <FormInput form={form} name="estado" label="Estado" />
      </FormSection>

      <FormSection title="Redes Sociais e Website">
        <FormInput form={form} name="facebook" label="Facebook" type="url" />
        <FormInput form={form} name="instagram" label="Instagram" type="url" />
        <FormInput form={form} name="linkedin" label="LinkedIn" type="url" />
        <FormInput form={form} name="website" label="Website" type="url" />
      </FormSection>

      <FormSection title="Descrição da Empresa">
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
      </FormSection>

      <FormSection title="Mídia">
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
      </FormSection>
    </>
  );
};