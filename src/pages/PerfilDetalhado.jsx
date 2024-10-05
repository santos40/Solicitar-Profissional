import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Star, MapPin, Briefcase, Phone, Globe, Calendar, Tag, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

// Updated mock data with likes, dislikes, and comments
const mockCadastrados = [
  {
    id: 1,
    nome: "João Silva",
    categoria: "Pedreiro",
    cidade: "São Paulo",
    whatsapp: "+5511987654321",
    tipo: "Profissional",
    logo: "/placeholder.svg",
    rating: 4.5,
    descricao: "Pedreiro experiente com mais de 15 anos no mercado. Especializado em construções residenciais e reformas.",
    tags: ["construção", "reforma", "alvenaria"],
    dataCadastro: "2023-01-15",
    likes: 25,
    dislikes: 2,
    comments: [
      { author: "Maria", text: "Ótimo trabalho! Recomendo.", date: "2023-05-10" },
      { author: "Pedro", text: "Profissional pontual e eficiente.", date: "2023-06-15" }
    ]
  },
  {
    id: 2,
    nome: "Maria Construções Ltda.",
    categoria: "Construtora",
    cidade: "Rio de Janeiro",
    whatsapp: "+5521987654321",
    website: "www.mariaconstrucoes.com.br",
    tipo: "Empresa",
    logo: "/placeholder.svg",
    rating: 4.2,
    descricao: "Construtora com vasta experiência em obras de grande porte.",
    tags: ["construção", "empresa", "obras"],
    dataCadastro: "2023-02-20",
    likes: 15,
    dislikes: 1,
    comments: []
  },
  {
    id: 3,
    nome: "Carlos Eletricista",
    categoria: "Eletricista",
    cidade: "Belo Horizonte",
    whatsapp: "+5531987654321",
    tipo: "Profissional",
    logo: "/placeholder.svg",
    rating: 4.8,
    descricao: "Eletricista qualificado, especializado em instalações residenciais.",
    tags: ["eletricidade", "instalações", "residencial"],
    dataCadastro: "2023-03-10",
    likes: 30,
    dislikes: 0,
    comments: []
  },
  {
    id: 4,
    nome: "Pinturas & Cia",
    categoria: "Pintura",
    cidade: "Salvador",
    whatsapp: "+5571987654321",
    website: "www.pinturasecia.com.br",
    tipo: "Empresa",
    logo: "/placeholder.svg",
    rating: 3.9,
    descricao: "Serviços de pintura interna e externa com qualidade garantida.",
    tags: ["pintura", "serviços", "qualidade"],
    dataCadastro: "2023-04-05",
    likes: 10,
    dislikes: 5,
    comments: []
  },
  {
    id: 5,
    nome: "Ana Jardins",
    categoria: "Jardinagem",
    cidade: "Curitiba",
    whatsapp: "+5541987654321",
    tipo: "Profissional",
    logo: "/placeholder.svg",
    rating: 4.7,
    descricao: "Especialista em jardinagem e paisagismo.",
    tags: ["jardinagem", "paisagismo", "verde"],
    dataCadastro: "2023-05-15",
    likes: 20,
    dislikes: 1,
    comments: []
  },
  {
    id: 6,
    nome: "Tech Instalações ME",
    categoria: "Instalações Elétricas",
    cidade: "Porto Alegre",
    whatsapp: "+5551987654321",
    website: "www.techinstalacoes.com.br",
    rating: 4.1,
    descricao: "Instalações elétricas seguras e eficientes.",
    tags: ["instalações", "elétricas", "segurança"],
    dataCadastro: "2023-06-25",
    likes: 5,
    dislikes: 0,
    comments: []
  },
];

const PerfilDetalhado = () => {
  const { id } = useParams();
  const [perfil, setPerfil] = useState(mockCadastrados.find(item => item.id === parseInt(id)));
  const [newComment, setNewComment] = useState('');

  if (!perfil) {
    return <div>Perfil não encontrado</div>;
  }

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ));
  };

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

  const handleLike = () => {
    setPerfil(prev => ({ ...prev, likes: prev.likes + 1 }));
  };

  const handleDislike = () => {
    setPerfil(prev => ({ ...prev, dislikes: prev.dislikes + 1 }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        author: "Usuário Anônimo", // In a real app, this would be the logged-in user
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
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={perfil.logo} alt={perfil.nome} />
              <AvatarFallback>{perfil.nome.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">{perfil.nome}</CardTitle>
              <CardDescription className="text-xl">{perfil.categoria}</CardDescription>
              <div className="flex items-center mt-2">
                {renderStars(perfil.rating)}
                <span className="ml-2">({perfil.rating})</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">{perfil.descricao}</p>
          <div className="flex items-center">
            <MapPin className="mr-2" />
            <span>{perfil.cidade}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="mr-2" />
            <span>{perfil.tipo}</span>
          </div>
          <div className="flex items-center">
            <Phone className="mr-2" />
            <span>{perfil.whatsapp}</span>
          </div>
          {perfil.website && (
            <div className="flex items-center">
              <Globe className="mr-2" />
              <a href={perfil.website} target="_blank" rel="noopener noreferrer">{perfil.website}</a>
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="mr-2" />
            <span>Cadastrado em: {new Date(perfil.dataCadastro).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="mr-2" />
            {perfil.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
          </div>

          <div className="flex items-center space-x-4 mt-4">
            <Button variant="outline" onClick={handleLike}>
              <ThumbsUp className="mr-2 h-4 w-4" />
              Like ({perfil.likes})
            </Button>
            <Button variant="outline" onClick={handleDislike}>
              <ThumbsDown className="mr-2 h-4 w-4" />
              Dislike ({perfil.dislikes})
            </Button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Comentários e Feedback</h3>
            {perfil.comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-md mb-2">
                <p className="font-semibold">{comment.author}</p>
                <p>{comment.text}</p>
                <p className="text-sm text-gray-500">{comment.date}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleCommentSubmit} className="mt-4">
            <Textarea
              placeholder="Deixe seu comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2"
            />
            <Button type="submit">
              <MessageSquare className="mr-2 h-4 w-4" />
              Enviar Comentário
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="default"
            onClick={() => window.open(`https://wa.me/${perfil.whatsapp}`, '_blank')}
          >
            Contatar via WhatsApp
          </Button>
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
