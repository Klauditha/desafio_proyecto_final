import { Label } from "@/components/ui/label"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Productdetail() {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-2 items-start order-2 md:order-1">
        <div className="hidden md:flex items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl">La conquista de los gatos</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <div className="grid gap-4 text-sm leading-loose">
              <p>
              Tal como en la Biblia, todo comienza en el Génesis. Desde entonces nos remontamos a las hazañas de los felinos que lentamente, con habilidad y astucia, se fueron adueñando de todo.

¿Los conquistamos con un robot gigante? Acá los delirantes sueños de una raza de animales que no se conformó con un ovillo de lana o con un cajón con arena, y fue más allá.
              </p>
            </div>
            <div>
            <p className="text-sm font-medium">ISBN</p>
            <p className="text-sm">9789569994630</p>
            </div>
            <div>
            <p className="text-sm font-medium">Páginas</p>
            <p className="text-sm">112</p>
            </div>
            <div>
            <p className="text-sm font-medium">Editorial</p>
            <p className="text-sm">Planeta Cómic</p>
            </div>
            <div>
            <p className="text-sm font-medium">Disponibilidad</p>
            <p className="text-sm">Quedan 3 unidades</p>
            </div>
          </div>
        </div>
        <form className="grid gap-4 md:gap-8">
          <div className="grid gap-2">
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="quantity">
              Cantidad
            </Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-4xl font-bold">$14.310</div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg">Agregar al carrito</Button>
            <Button size="lg" variant="outline">
              <HeartIcon className="w-4 h-4 mr-2" />
              Agregar a lista de deseos
            </Button>
          </div>
        </form>
      </div>
      <div className="grid gap-6 md:gap-3 items-start order-1">
        <div className="flex md:hidden items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-2xl sm:text-3xl">The Silent Patient</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid  gap-4">
          <img
            alt="Book cover"
            className="aspect-[9-16] object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
            height={350}
            src="/img/la-conquista-de-los-gatos.png"
            width={350}
          />
        </div>
      </div>
    </div>
  )
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
