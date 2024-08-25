export interface Item {
  code?: string;
  description?: string;
  price: number;
  image?: File; // Para manejar archivos
  stock: number;
}
