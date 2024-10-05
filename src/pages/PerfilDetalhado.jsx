import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import AvaliacaoBotoes from '@/components/AvaliacaoBotoes';
import { createWhatsAppLink } from '@/utils/messageUtils';
import { ProfileHeader, ProfileInfo, Comments } from '@/components/PerfilComponents';
import { mockCadastrados } from '@/data/mockCadastrados';

const PerfilDetalhado = () => {
  const { id } = useParams();
  const [perfil, setPerfil] = useState(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Simula uma chamada de API
    const fetchedPerfil = mockCadastrados.find(item => item.id === parseInt(id));
    setPerfil(fetchedPerfil);

    // Atualiza as meta tags para SEO
    if (fetchedPerfil) {
      document.title = `${fetchedPerfil.nome} - ${fetchedPerfil.categoria} | ViaWhatsApp`;
      document.querySelector('meta[name="description"]').setAttribute('content', fetchedPerfil.descricao.substring(0, 160));
    }
  }, [id]);

  if (!perfil) {
    return <div>Carregando...</div>;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${perfil.nome} - ${perfil.categoria}`,
        text: `Confira ${perfil.nome}, ${perfil.categoria} em ${perfil.cidade}`,
        url: window.location.href,
      })
      .then(() => console.log('Conteúdo compartilhado com sucesso'))
      .catch((error) => console.log('Erro ao compartilhar', error));
    } else {
      alert('Compartilhamento não suportado neste navegador');
    }
  };

  const handleLike = () => setPerfil(prev => ({ ...prev, likes: prev.likes + 1 }));
  const handleDislike = () => setPerfil(prev => ({ ...prev, dislikes: prev.dislikes + 1 }));

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        author: "Usuário Anônimo",
        text: newComment,
        date: new Date().toISOString().split('T')[0]
      };
      setPerfil(prev => ({
        ...prev,
        comments: [...prev.comments, newCommentObj]
      }));
      setNewComment('');
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <ProfileHeader perfil={perfil} />
        </CardHeader>
        <CardContent className="space-y-4">
          <ProfileInfo perfil={perfil} />
          <AvaliacaoBotoes perfil={perfil} handleLike={handleLike} handleDislike={handleDislike} />
          <Button
            variant="default"
            className="w-full mt-4"
            onClick={() => window.open(createWhatsAppLink(perfil.whatsapp, perfil.nome), '_blank')}
          >
            Contatar via WhatsApp
          </Button>
          <Comments
            comments={perfil.comments}
            newComment={newComment}
            setNewComment={setNewComment}
            handleCommentSubmit={handleCommentSubmit}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PerfilDetalhado;