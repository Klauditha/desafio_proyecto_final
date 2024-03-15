import Bookcard from "../Bookcard";
import Footer from "../Footer";

export default function New() {
    return (
<div className="flex flex-wrap gap-4 w-full">
  <h1 className="font-bold text-2xl">Novedades</h1>
  <div className="flex flex-wrap gap-4 w-full">
    <Bookcard />
    <Bookcard />
    <Bookcard />
    <Bookcard />
    <Bookcard />
  </div>
  <Footer/>
</div>
    )
}