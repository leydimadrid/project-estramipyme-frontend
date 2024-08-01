export interface Question {
  id: number;
  section: "cliente" | "negocio" | "coherencia" | "alineacion" | "circulo";
  question: string;
  options: string[];
}
