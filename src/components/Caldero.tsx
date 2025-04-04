//propiedades del caldero
interface CalderoProps {
  caldero: number[];
  ingredientes: {
    id: number;
    nombre: string;
    color: string;
  }[];
  mensaje: string;
  efectoDescripcion: string;
  onLimpiar: () => void;
}

export default function Caldero({
  caldero,
  ingredientes,
  mensaje,
  efectoDescripcion,
  onLimpiar,
}: CalderoProps) {
  return (
    <div className="caldero-container">
      <div className={`caldero ${mensaje ? "active" : ""}`}>
        <h3>Caldero</h3>
        <div className="caldero-contenido">
          {caldero.length > 0 ? (
            <div>
              {caldero.map((id) => {
                const ingrediente = ingredientes.find((ing) => ing.id === id);
                return (
                  <span
                    key={id}
                    className="caldero-item"
                    style={{
                      backgroundColor: `${ingrediente?.color}15`,
                      borderLeft: `3px solid ${ingrediente?.color}`,
                    }}
                  >
                    {ingrediente?.nombre}
                  </span>
                );
              })}
            </div>
          ) : (
            <p>El caldero está vacío</p>
          )}
        </div>
        {mensaje && (
          <div className="efecto-mensaje">
            <div className="mensaje-principal">{mensaje}</div>
            {efectoDescripcion && (
              <div className="efecto-descripcion">{efectoDescripcion}</div>
            )}
          </div>
        )}
        <button className="limpiar-btn" onClick={onLimpiar}>
          Limpiar caldero
        </button>
      </div>
    </div>
  );
}
