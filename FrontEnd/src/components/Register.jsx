import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export default function Register() {
  return (
    <div className="pb-16">
    
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Crea una cuenta</CardTitle>
        <CardDescription>Ingresa tus datos para crear la cuenta y para despachar tus compras</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre y apellido</Label>
            <Input id="name" placeholder="John Doe" required type="text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="correo@gmail.com" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" placeholder="" required type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-check">Confirma la contraseña</Label>
            <Input id="password-check" placeholder="" required type="password" />
          </div>
<div className="space-y-2">
            <Label htmlFor="phone">Número de celular</Label>
            <Input id="phone" placeholder="9 2345 4567" required type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Región</Label>
            <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecciona una región" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="arica">Arica y Parinacota</SelectItem>
          <SelectItem value="tarapaca">Tarapacá</SelectItem>
          <SelectItem value="antofagasta">Antofagasta</SelectItem>
          <SelectItem value="atacama">Atacama</SelectItem>
          <SelectItem value="coquimbo">Coquimbo</SelectItem>
          <SelectItem value="Valparaiso">Valparaíso</SelectItem>
          <SelectItem value="Metropolitana">Metropolitana</SelectItem>
          <SelectItem value="ohiggins">O'Higgins</SelectItem>
          <SelectItem value="maule">Maule</SelectItem>
          <SelectItem value="nuble">Ñuble</SelectItem>
          <SelectItem value="biobio">Biobío</SelectItem>
          <SelectItem value="araucania">Araucanía</SelectItem>
          <SelectItem value="losrios">Los Ríos</SelectItem>
          <SelectItem value="loslagos">Los Lagos</SelectItem>
          <SelectItem value="aysen">Aysén</SelectItem>
          <SelectItem value="magallanes">Magallanes</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
</div>
<div className="space-y-2">
            <Label htmlFor="city">Ciudad</Label>
            <Input id="city" placeholder="Valparaiso" required type="text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="district">Comuna</Label>
            <Input id="district" placeholder="Puente Alto" required type="text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input id="address" placeholder="Las Petunias 23" required type="text" />
          </div>
<div className="space-y-2">
            <Label htmlFor="postalcode">Código postal</Label>
            <Input id="postalcode" placeholder="" required type="text" />
          </div>
<Button className="w-full" type="submit">
            Crea tu cuenta
          </Button>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}