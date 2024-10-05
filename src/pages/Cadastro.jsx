import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { CadastroForm } from '@/components/CadastroForm';

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
    endereco: '', // Novo campo de endereço
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
    console.log(formData, logotipo, fotos);
    navigate('/pagamento');
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Cadastro de Profissional</h1>
      <CadastroForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleLinkInputChange={handleLinkInputChange}
        getLogoRootProps={getLogoRootProps}
        getLogoInputProps={getLogoInputProps}
        logotipo={logotipo}
        getFotosRootProps={getFotosRootProps}
        getFotosInputProps={getFotosInputProps}
        fotos={fotos}
        handleSubmit={handleSubmit}
      />
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