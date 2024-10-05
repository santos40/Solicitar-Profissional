import React from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const AvaliacaoBotoes = ({ perfil, handleLike, handleDislike }) => (
  <div className="flex items-center space-x-4 mt-4">
    <Button variant="outline" onClick={handleLike} className="bg-sky-200 hover:bg-sky-300">
      <ThumbsUp className="mr-2 h-4 w-4" />
      Gostei ({perfil.likes})
    </Button>
    <Button variant="outline" onClick={handleDislike} className="bg-sky-200 hover:bg-sky-300">
      <ThumbsDown className="mr-2 h-4 w-4" />
      Não Gostei ({perfil.dislikes})
    </Button>
  </div>
);

export default AvaliacaoBotoes;