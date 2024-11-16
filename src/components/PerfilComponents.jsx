import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Phone, Globe, Calendar, Tag, MessageSquare, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const renderStars = (rating) => {
  return Array(5).fill(0).map((_, i) => (
    <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
  ));
};

export const ProfileHeader = ({ perfil }) => (
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
    <script type="application/ld+json">
      {JSON.stringify({
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
        "url": `https://solicitarorcamento.com/perfil/${perfil.id}`,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": perfil.rating,
          "reviewCount": perfil.likes + perfil.dislikes
        }
      })}
    </script>
  </div>
);

export const ProfileInfo = ({ perfil }) => (
  <>
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
  </>
);

export const Comments = ({ comments, newComment, setNewComment, handleCommentSubmit }) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-2">Comentários e Feedback</h3>
    {comments.map((comment, index) => (
      <div key={index} className="bg-gray-100 p-3 rounded-md mb-2">
        <p className="font-semibold">{comment.author}</p>
        <p>{comment.text}</p>
        <p className="text-sm text-gray-500">{comment.date}</p>
      </div>
    ))}
    <form onSubmit={handleCommentSubmit} className="mt-4">
      <Textarea
        placeholder="Deixe seu comentário..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="mb-2"
      />
      <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
        <MessageSquare className="mr-2 h-4 w-4" />
        Enviar Comentário
      </Button>
    </form>
  </div>
);