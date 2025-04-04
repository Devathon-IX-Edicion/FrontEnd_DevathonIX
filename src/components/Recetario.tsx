// propiedades del recetario
interface RecetarioProps {
  recetas: {
    id: number;
    nombre: string;
    descripcion: string;
    efecto?: string;
  }[];
}

export default function Recetario({ recetas }: RecetarioProps) {
  return (
    <div className="recetario">
      <h2>Recetario</h2>
      <div className="recetas-lista">
        {recetas.map((receta) => (
          <div key={receta.id} className="receta-item">
            <div className="receta-nombre">{receta.nombre}</div>
            <div className="receta-desc">{receta.descripcion}</div>
            {receta.efecto && (
              <div className="receta-efecto">{receta.efecto}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
