import React, { useEffect, useState } from 'react';
import ArtactividadService, { Artactividad } from '../services/ArtactividadService';
import ArtactividadList from '../components/ArtactividadOperador';


const ArtactividadOperador: React.FC = () => {
  const [artactividades, setArtactividades] = useState<Artactividad[]>([]);
  const [, setSelectedArtactividad] = useState<Artactividad | null>(null);

  useEffect(() => {
    cargarArtactividades();
  }, []);

  const cargarArtactividades = async () => {
    const data = await ArtactividadService.listarTodos();
    setArtactividades(data);
  };





  const manejarEliminar = async (id: number) => {
    await ArtactividadService.eliminarArtactividad(id);
    cargarArtactividades();
  };

  return (
    <div className="p-4">
      <h1 style={{paddingBottom:"2rem"}} className="text-2xl font-bold mb-4">ANALISIS DE RIEGO EN EL TRABAJO (ART)</h1>
      <ArtactividadList
        artactividades={artactividades}
        onEliminar={manejarEliminar}
        onEditar={setSelectedArtactividad}
      />
    </div>
  );
};

export default ArtactividadOperador;
