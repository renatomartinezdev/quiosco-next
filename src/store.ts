import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

// Definición de la interfaz del store
interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  removeItem:(id: Product['id']) => void
  clearOrder: () => void
}

// Creación del store de Zustand
export const useStore = create<Store>((set, get) => ({

  // Estado inicial del pedido
  order: [],

  // Agregar un producto al pedido (o aumentar su cantidad si ya existe)
  addToOrder: (product) => {
    const { categoryId, image, ...data } = product;
    let order: OrderItem[] = [];

    if (get().order.find((item) => item.id === product.id)) {
      // Si el producto ya está en el pedido, aumentar la cantidad
      order = get().order.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      );
    } else {
      // Si es un nuevo producto, agregarlo con cantidad 1
      order = [
        ...get().order,
        {
          ...data,
          quantity: 1,
          subtotal: 1 * product.price,
        },
      ];
    }

    // Actualizar el estado
    set(() => ({
      order,
    }));
  },

  // Aumentar la cantidad de un producto en el pedido
  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      ),
    }));
  },

  // Disminuir la cantidad de un producto en el pedido
  decreaseQuantity: (id) => {
    const order = get().order.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1),
          }
        : item
    );

    set(() => ({
      order,
    }));
  },

  // Eliminar un producto del pedido
  removeItem: (id) => {
    set((state) => ({
      order: state.order.filter(item => item.id !== id)
    }))
  },

  clearOrder:()=> {
    set(() => ({
      order: []
    }))
  }

}));
