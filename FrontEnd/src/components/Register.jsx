import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import React from "react";

import { useContext, useState } from "react";
import { ECommerceContext } from "@/Context/ECommerceContext";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function Register() {
  const { registerUser, users } = useContext(ECommerceContext);
  const [selectedRegion, setSelectedRegion] = React.useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    admin: false,
    city: "",
    district: "",
    address: "",
    postalCode: "",
    user_id: "",
    created_at: "",
    updated_at: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    setFormData({
      ...formData,
      region: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      region: formData.region,
      admin: false,
      city: formData.city,
      district: formData.district,
      address: formData.address,
      postalCode: formData.postalCode,
      user_id: users.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      state: true,
    };

    registerUser(newUser);

    // Funcionalidad PUT con servidor para futuro

    try {
      const response = await fetch("data/data.json");
      const data = await response.json();
      data.users.push(newUser);
      console.log(newUser); // DEBUG
      await fetch("data/data.json", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(
        "Usuario registrado correctamente y archivo JSON actualizado."
      );
    } catch (error) {
      console.error(
        "Error registrando usuario and actualizando archivo JSON",
        error
      );
    }
  };

  return (
    <div className="pb-16">
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Crea una cuenta
            </CardTitle>
            <CardDescription>
              Ingresa tus datos para crear la cuenta y para despachar tus
              compras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Primer nombre</Label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Primer Nombre"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Apellido</Label>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  placeholder="correo@gmail.com"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  name="password"
                  placeholder=""
                  required
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-check">Confirma la contraseña</Label>
                <Input
                  name="confirmPassword"
                  id="password-check"
                  placeholder=""
                  required
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Número de celular</Label>
                <Input
                  name="phone"
                  id="phone"
                  placeholder="9 2345 4567"
                  required
                  type="number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Región</Label>
                <Select
                  id="region"
                  value={selectedRegion}
                  onValueChange={handleRegionChange}
                  name="region"
                >
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
                      <SelectItem value="Metropolitana">
                        Metropolitana
                      </SelectItem>
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
                <Input
                  name="city"
                  id="city"
                  placeholder="Santiago"
                  required
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">Comuna</Label>
                <Input
                  name="district"
                  id="district"
                  placeholder="Puente Alto"
                  required
                  type="text"
                  value={formData.district}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  name="address"
                  id="address"
                  placeholder="Las Petunias 23"
                  required
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalcode">Código postal</Label>
                <Input
                  name="postalCode"
                  id="postalcode"
                  placeholder=""
                  required
                  type="text"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>
              <Button className="w-full" type="submit">
                Crea tu cuenta
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
