/* eslint-disable no-undef */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ECommerceContext } from "../Context/ECommerceContext";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import Register from "./Register";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../config/constants";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { setAuthenticatedUser } = useContext(ECommerceContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [buttonText, setButtonText] = useState("Iniciar sesión");

  /* Valida el formulario y en caso de ser correcto llama a la api
   para obtener el token */
  const handleLoginSubmit = () => {
    let token = "";
    let user_id = "";
    setError("");
    if (!email || !password) {
      setError("Por favor ingrese correo y contraseña.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Por favor ingrese un correo valido.");
      return;
    }

    const lowercaseEmail = email.toLowerCase();
    axios
      .post(ENDPOINT.login, { email: lowercaseEmail, password })
      .then((response) => {
        if (response.data.status == true) {
          token = response.data.data.token;
          user_id = response.data.data.user_id;
          sessionStorage.setItem("username", JSON.stringify({ email }));
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("user_id", user_id);
          setAuthenticatedUser(email, token);
          setError("");
          setLoginMessage("Ingreso exitoso.");
          alertify.success("Ingreso exitoso. Bienvenido");
          setButtonText("Bienvenido 😃");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          alertify.error(
            "Correo o contraseña invalidos. Por favor intente nuevamente"
          );
          setError(
            "Correo o contraseña invalidos. Por favor intente nuevamente."
          );
          setLoginMessage("");
        }
      })
      .catch((error) => {
        console.log(error);
        alertify.error(
          "Correo o contraseña invalidos. Por favor intente nuevamente"
        );
        setError(
          "Correo o contraseña invalidos. Por favor intente nuevamente."
        );
        setLoginMessage("");
      });
  };

  return (
    <>
      <Card className="flex-col flex justify-center mx-auto max-w-sm md:mx-0 rounded-l-none">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Inicia sesión</CardTitle>
          <CardDescription>
            Ingresa tu email y contraseña para iniciar sesión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="email@gmail.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleLoginSubmit();
                  }
                }}
                className={`pr-6 ${
                  /\S+@\S+\.\S+/.test(email) ? "border-green-500 border-2" : ""
                }`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleLoginSubmit();
                  }
                }}
                className={`pr-6 ${
                  password.length > 5 ? "border-green-500 border-2" : ""
                }`}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {loginMessage && <p className="text-green-500">{loginMessage}</p>}
            <Button
              className="w-full"
              type="submit"
              onClick={handleLoginSubmit}
            >
              {buttonText}
            </Button>
          </div>
          <CardDescription className="py-4 text-center">
            No tienes cuenta? Crea tu cuenta{" "}
            <Link className="font-bold" to="/register">
              acá
            </Link>
          </CardDescription>
        </CardContent>
      </Card>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

// https://images.unsplash.com/photo-1509266272358-7701da638078?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
