"use client"
import { useStore } from "@/src/store";
import ProductsDetails from "./ProductsDetails";

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="text-center my-10">El Carrito está vacío</p>
      ) : (
        <div className="mt-5">
          {order.map(item => (
            <ProductsDetails
              key={item.id}
              item={item}
            />
          ))}
        </div>
      )}
    </aside>
  );
}
