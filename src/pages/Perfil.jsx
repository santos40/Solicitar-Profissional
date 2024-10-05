import React from 'react';
import { useParams } from 'react-router-dom';

const Perfil = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Perfil do Profissional</h1>
      <p>Detalhes do profissional com ID: {id}</p>
    </div>
  );
};

export default Perfil;