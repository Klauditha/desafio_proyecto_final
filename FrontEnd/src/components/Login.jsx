/* eslint-disable no-undef */
import { useNavigate } from 'react-router-dom';

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import Register from './Register';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { ENDPOINT } from '../config/constants';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleLoginSubmit = () => {
    let token = '';
    setError('');
    if (!email || !password) {
      setError('Por favor ingrese correo y contraseña.');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Por favor ingrese un correo valido.');
      return;
    }

    const lowercaseEmail = email.toLowerCase();

    axios
      .post(ENDPOINT.login, { email: lowercaseEmail, password })
      .then((response) => {
        console.log(response.data);
        if (response.data.status == true) {
          token = response.data.token;
          sessionStorage.setItem('user', JSON.stringify({ email, token }));
          setError('');
          setLoginMessage('Ingreso exitoso.');
          alertify.success('Ingreso exitoso. Bienvenido');
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          alertify.error(
            'Correo o contraseña invalidos. Por favor intente nuevamente'
          );
          setError(
            'Correo o contraseña invalidos. Por favor intente nuevamente.'
          );
          setLoginMessage('');
        }
      })
      .catch((error) => {
        console.log(error);
        alertify.error(
          'Correo o contraseña invalidos. Por favor intente nuevamente'
        );
        setError(
          'Correo o contraseña invalidos. Por favor intente nuevamente.'
        );
        setLoginMessage('');
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
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {loginMessage && <p className="text-green-500">{loginMessage}</p>}
            <Button
              className="w-full"
              type="submit"
              onClick={handleLoginSubmit}
            >
              Iniciar sesión
            </Button>
          </div>
          <CardDescription className="py-4 text-center">
            No tienes cuenta? Crea tu cuenta{' '}
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
