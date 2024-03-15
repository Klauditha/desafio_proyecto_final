import Bookcard from "../Bookcard";

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
</div>
    )
}