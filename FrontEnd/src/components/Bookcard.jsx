import { CardTitle, CardDescription, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Bookcard() {
  return (
    <Card className="w-full max-w-xs">
      <div className="grid w-full">
        <div className="relative w-full">
          <img
            alt="Book cover"
            className="w-full object-fit"
            height={400}
            src="/img/la-conquista-de-los-gatos.png"
            style={{
              aspectRatio: "400/400",
              objectFit: "contain",
            }}
            width={400}
          />
        </div>
      </div>
      <CardContent className="p-4">
        <CardTitle className="text-base font-semibold">La conquista de los gatos</CardTitle>
        <CardTitle className="text-sm font-medium">Alberto Montt</CardTitle>
        <CardDescription className="mb-4 text-sm">
          Español
        </CardDescription>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">$14.990</span>
          <Button size="sm">Agregar al carrito</Button>
        </div>
      </CardContent>
    </Card>
  )
}

