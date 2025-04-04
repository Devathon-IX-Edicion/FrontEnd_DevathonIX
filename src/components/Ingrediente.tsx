// propiedades de los ingredientes
interface IngredienteProps {
  ingrediente: {
    id: number;
    nombre: string;
    color: string;
    categoria: string;
  };
  onClick: (id: number) => void;
}

export default function Ingrediente({
  ingrediente,
  onClick,
}: IngredienteProps) {
  return (
    <div
      className={`ingrediente ${ingrediente.categoria}`}
      onClick={() => onClick(ingrediente.id)}
      style={{
        backgroundColor: `${ingrediente.color}40`,
        borderLeft: `4px solid ${ingrediente.color}`,
      }}
    >
      {ingrediente.nombre}
    </div>
  );
}
