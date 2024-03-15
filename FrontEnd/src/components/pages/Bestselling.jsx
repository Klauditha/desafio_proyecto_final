import Bookcard from "../Bookcard";

export default function Bestselling() {
    return (
        <div className="flex flex-col gap-4 px-4 md:px-20">
                    <h1 className="font-bold text-2xl">Los más vendidos</h1>
                    <div className="flex gap-4">
                        
        <Bookcard/>
        <Bookcard/>
        <Bookcard/>
        <Bookcard/>
        </div> 
        </div>  
    )
}