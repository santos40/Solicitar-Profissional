import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    profissao: '',
    whatsapp: '+55',
    youtube: '',
    facebook: '',
    instagram: '',
    website: '',
  });

  const [logotipo, setLogotipo] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [currentLinkField, setCurrentLinkField] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'whatsapp' && !value.startsWith('+55')) {
      setFormData(prevState => ({ ...prevState, [name]: '+55' + value }));
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleLinkInputChange = (name, value) => {
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      setCurrentLinkField(name);
      setShowLinkDialog(true);
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleAddHttp = () => {
    setFormData(prevState => ({
      ...prevState,
      [currentLinkField]: 'http://' + prevState[currentLinkField]
    }));
    setShowLinkDialog(false);
  };

  const onDropLogo = (acceptedFiles) => {
    setLogotipo(acceptedFiles[0]);
  };

  const onDropFotos = (acceptedFiles) => {
    setFotos(prevFotos => [...prevFotos, ...acceptedFiles].slice(0, 4));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would implement the logic to send the data to the backend
    console.log(formData, logotipo, fotos);
    // After successful submission, redirect to the payment page
    navigate('/pagamento');
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Cadastro de Profissional</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="nome">Nome</Label>
          <Input type="text" id="nome" name="nome" value={formData.nome} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="cidade">Cidade</Label>
          <Input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="profissao">Profissão</Label>
          <Input type="text" id="profissao" name="profissao" value={formData.profissao} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input type="tel" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required />
        </div>
        <div>
          <Label>Logotipo</Label>
          <div {...getLogoRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer">
            <input {...getLogoInputProps()} />
            <p>Arraste e solte o logotipo aqui, ou clique para selecionar</p>
          </div>
          {logotipo && <p className="mt-2">{logotipo.name}</p>}
        </div>
        <div>
          <Label>Fotos (máximo 4)</Label>
          <div {...getFotosRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer">
            <input {...getFotosInputProps()} />
            <p>Arraste e solte até 4 fotos aqui, ou clique para selecionar</p>
          </div>
          {fotos.length > 0 && (
            <ul className="mt-2">
              {fotos.map((foto, index) => (
                <li key={index}>{foto.name}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <Label htmlFor="youtube">Canal do YouTube</Label>
          <Input type="url" id="youtube" name="youtube" value={formData.youtube} onChange={(e) => handleLinkInputChange('youtube', e.target.value)} />
        </div>
        <div>
          <Label htmlFor="facebook">Facebook</Label>
          <Input type="url" id="facebook" name="facebook" value={formData.facebook} onChange={(e) => handleLinkInputChange('facebook', e.target.value)} />
        </div>
        <div>
          <Label htmlFor="instagram">Instagram</Label>
          <Input type="url" id="instagram" name="instagram" value={formData.instagram} onChange={(e) => handleLinkInputChange('instagram', e.target.value)} />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input type="url" id="website" name="website" value={formData.website} onChange={(e) => handleLinkInputChange('website', e.target.value)} />
        </div>
        <Button type="submit" className="w-full">Cadastrar</Button>
      </form>

      <AlertDialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Adicionar http://</AlertDialogTitle>
            <AlertDialogDescription>
              O link inserido não começa com http:// ou https://. Deseja adicionar http:// ao início do link?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowLinkDialog(false)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleAddHttp}>Adicionar http://</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Cadastro;
