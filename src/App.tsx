import { useState } from "react";
import Recetario from "./components/Recetario";
import Ingrediente from "./components/Ingrediente";
import Caldero from "./components/Caldero";
import "./App.css";

//interfaces
interface IngredienteType {
  id: number;
  nombre: string;
  color: string;
  categoria: string;
}

interface RecetaType {
  id: number;
  nombre: string;
  ingredientes: number[];
  descripcion: string;
  efecto?: string;
}

//ingredientes de prueba
const ingredientesIniciales: IngredienteType[] = [
  { id: 1, nombre: "Azúcar", color: "#f5f5dc", categoria: "dulce" },
  { id: 2, nombre: "Leche", color: "#ffffff", categoria: "base" },
  { id: 3, nombre: "Café", color: "#6f4e37", categoria: "estimulante" },
  { id: 4, nombre: "Miel", color: "#ffd700", categoria: "dulce" },
  { id: 5, nombre: "Canela", color: "#d2691e", categoria: "especia" },
  { id: 6, nombre: "Chocolate", color: "#7b3f00", categoria: "dulce" },
  { id: 7, nombre: "Jengibre", color: "#c9a66b", categoria: "especia" },
  { id: 8, nombre: "Limón", color: "#fff44f", categoria: "ácido" },
  { id: 9, nombre: "Menta", color: "#98fb98", categoria: "hierba" },
  { id: 10, nombre: "Vainilla", color: "#f3e5ab", categoria: "esencia" },
  { id: 11, nombre: "Sal", color: "#f8f8ff", categoria: "mineral" },
  { id: 12, nombre: "Pimienta", color: "#39393a", categoria: "especia" },
];

//recetas de prueba
const recetas: RecetaType[] = [
  {
    id: 1,
    nombre: "Flan",
    ingredientes: [1, 2],
    descripcion: "Azúcar + Leche",
    efecto: "Un postre dulce y cremoso",
  },
  {
    id: 2,
    nombre: "Café Latte",
    ingredientes: [2, 3],
    descripcion: "Leche + Café",
    efecto: "Bebida energizante y cremosa",
  },
  // New recipes
  {
    id: 3,
    nombre: "Chocolate Caliente",
    ingredientes: [2, 6],
    descripcion: "Leche + Chocolate",
    efecto: "Bebida reconfortante para días fríos",
  },
  {
    id: 4,
    nombre: "Té Chai",
    ingredientes: [2, 5, 7],
    descripcion: "Leche + Canela + Jengibre",
    efecto: "Bebida especiada y energizante",
  },
  {
    id: 5,
    nombre: "Limonada de Miel",
    ingredientes: [4, 8],
    descripcion: "Miel + Limón",
    efecto: "Bebida refrescante y curativa",
  },
  {
    id: 6,
    nombre: "Té de Menta",
    ingredientes: [9, 8],
    descripcion: "Menta + Limón",
    efecto: "Bebida refrescante y digestiva",
  },
  {
    id: 7,
    nombre: "Helado de Vainilla",
    ingredientes: [1, 2, 10],
    descripcion: "Azúcar + Leche + Vainilla",
    efecto: "Postre frío y cremoso",
  },
];

export default function App() {
  const [caldero, setCaldero] = useState<number[]>([]);
  const [efectoActual, setEfectoActual] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState<string>("");
  const [efectoDescripcion, setEfectoDescripcion] = useState<string>("");

  //funcion para agregar ingredientes al caldero, un maximo de 3
  const agregarAlCaldero = (id: number): void => {
    if (caldero.length >= 3) {
      setMensaje("El caldero solo puede contener hasta 3 ingredientes.");
      return;
    }

    if (!caldero.includes(id)) {
      const nuevoCaldero = [...caldero, id];
      setCaldero(nuevoCaldero);

      //revisa si la combinacion de ingredientes coincide con alguna receta

      const recetaCoincidente = recetas.find(
        (receta) =>
          receta.ingredientes.length === nuevoCaldero.length &&
          receta.ingredientes.every((ing) => nuevoCaldero.includes(ing)) &&
          nuevoCaldero.every((ing) => receta.ingredientes.includes(ing))
      );
      //si la receta coincide, muestra el mensaje y el efecto
      if (recetaCoincidente) {
        setEfectoActual(recetaCoincidente.id);
        setMensaje(`¡Has creado: ${recetaCoincidente.nombre}!`);
        setEfectoDescripcion(recetaCoincidente.efecto || "");
      } else if (nuevoCaldero.length > 1) {
        setMensaje("Combinación desconocida...");
        setEfectoDescripcion("");
      }
    }
  };

  //funcion para limpiar el caldero
  //y resetear el efecto
  //y el mensaje
  //y la descripcion del efecto
  const limpiarCaldero = (): void => {
    setCaldero([]);
    setEfectoActual(null);
    setMensaje("");
    setEfectoDescripcion("");
  };

  return (
    <div className="potion-game">
      {/* mensaje de bienvenida */}
      <div className="welcome-panel">
        <h3>Bienvenido a la cocina mágica</h3>
        <p>
          Experimenta combinando ingredientes mágicos para crear pociones y
          recetas
        </p>
      </div>
      {/* contenedor del juego */}
      <div className="game-container">
        <div className="ingredientes-ring">
          {ingredientesIniciales.map((ing) => (
            <Ingrediente
              key={ing.id}
              ingrediente={ing}
              onClick={agregarAlCaldero}
            />
          ))}
        </div>

        <Caldero
          caldero={caldero}
          ingredientes={ingredientesIniciales}
          mensaje={mensaje}
          efectoDescripcion={efectoDescripcion}
          onLimpiar={limpiarCaldero}
        />

        <Recetario recetas={recetas} />
      </div>
    </div>
  );
}
