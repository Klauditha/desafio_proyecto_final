import CartItem from '../CartItem';
import CartTotal from '../CartTotal';


export default function Cart() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-2xl text-center">Carro de compras</h1>
      <CartItem />
      <CartTotal />
    </div>
  );
}
