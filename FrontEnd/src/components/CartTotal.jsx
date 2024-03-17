import { Button } from "./ui/button";

export default function CartTotal(){
    return (
        <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-end px-4 md:px-20 ">
            <h1 className="font-bold text-2xl">Total</h1>
            <h1 className="font-bold text-2xl">$ 100.00</h1>
            <Button>Continuar con el pago</Button>
        </div>
    )
}