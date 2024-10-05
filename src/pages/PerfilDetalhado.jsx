import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": perfil.nome,
    "image": perfil.logo,
    "description": perfil.descricao,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": perfil.cidade
    },
    "telephone": perfil.whatsapp,
    "url": perfil.website,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": perfil.rating,
      "reviewCount": perfil.likes + perfil.dislikes
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${perfil.nome} - ${perfil.categoria} | ViaWhatsApp`}</title>
        <meta name="description" content={perfil.descricao.substring(0, 160)} />
        <meta property="og:title" content={`${perfil.nome} - ${perfil.categoria}`} />
        <meta property="og:description" content={perfil.descricao.substring(0, 160)} />
        <meta property="og:image" content={perfil.logo} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
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
    </>
  );
};

export default PerfilDetalhado;
