import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"

export default function Register() {
  return (
    <>
    <Card className="flex-col flex justify-center">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Inicia sesión</CardTitle>
        <CardDescription>Ingresa tu email y contraseña para iniciar sesión</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="email@gmail.com" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" required type="password" />
          </div>
          <Button className="w-full" type="submit">
            Iniciar sesión
          </Button>
        </div>
      </CardContent>
    </Card>
    </>
  )
}



// https://images.unsplash.com/photo-1509266272358-7701da638078?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D