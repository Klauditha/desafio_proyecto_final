import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card';
import React, { useContext, useState } from 'react';
import { ECommerceContext } from '@/Context/ECommerceContext';
import axios from 'axios';
import { ENDPOINT } from '../config/constants';
import { useNavigate } from 'react-router-dom';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function Register() {
  const { registerUser, users } = useContext(ECommerceContext);
  const [selectedRegion, setSelectedRegion] = React.useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    admin: false,
    city: '',
    district: '',
    address: '',
    zip_code: '',
    /* user_id: '', */
    created_at: '',
    updated_at: '',
    deleted: false,
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    region: '',
    city: '',
    district: '',
    address: '',
    zip_code: '',
  });

  const navigate = useNavigate();

  // Validaciones
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.firstName) {
      newErrors.firstName = 'Por favor ingrese su primer nombre.';
      valid = false;
    } else {
      newErrors.firstName = '';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Por favor ingrese su apellido.';
      valid = false;
    } else {
      newErrors.lastName = '';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Por favor ingrese su correo.';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor ingrese un correo valido.';
      valid = false;
    } else {
      newErrors.email = '';
    }

    if (!formData.password) {
      newErrors.password = 'Por favor ingrese una contraseña.';
      valid = false;
    } else {
      newErrors.password = '';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Por favor confirme su contraseña.';
      valid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
      valid = false;
    } else {
      newErrors.confirmPassword = '';
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone) {
      newErrors.phone = 'Por favor ingrese su numero de telefono.';
      valid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Por favor ingrese un numero de telefono valido sin espacios.';
      valid = false;
    } else {
      newErrors.phone = '';
    }

    if (!formData.region) {
      newErrors.region = 'Por favor eliga su región';
      valid = false;
    } else {
      newErrors.region = '';
    }

    if (!formData.city) {
      newErrors.city = 'Por favor ingrese su ciudad.';
      valid = false;
    } else {
      newErrors.city = '';
    }

    if (!formData.district) {
      newErrors.district = 'Por favor ingrese su comuna.';
      valid = false;
    } else {
      newErrors.district = '';
    }

    if (!formData.address) {
      newErrors.address = 'Por favor ingrese su dirección.';
      valid = false;
    } else {
      newErrors.address = '';
    }

    if (!formData.zip_code) {
      newErrors.zip_code = 'Por favor ingrese su codigo postal.';
      valid = false;
    } else {
      newErrors.zip_code = '';
    }

    setErrors(newErrors);

    return valid;
  };

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
    

    console.log('Formulario enviado');

    const isValid = validateForm();

    if (!isValid) {
      console.log('Validación de formulario ha fallado.');
      return;
    }

    console.log('Data de formulario es valida:', formData);

    const newUser = {
      username: formData.firstName, // Usa primer nombre por ahora
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      region: formData.region,
      admin: false,
      country: 'Chile',
      city: formData.city,
      district: formData.district,
      address: formData.address,
      zip_code: formData.zip_code,
      /* user_id: users.length + 1, */
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted: false,
    };

    console.log('Data de usuario nuevo:', newUser);

    registerUser(newUser);
    

       try {
         const response = await axios.post(ENDPOINT.users, newUser, {
           headers: {
             'Content-Type': 'application/json',
           },
         });

         if (response.status === 201) {
           console.log('Usuario registrado correctamente:', response.data);
           alertify.success('Registro exitoso');
           navigate('/login');
           // Redireccionar
         } else {
           console.error('Registro fallido:', response.data);
           alertify.error('Error registrando usuario. Pruebe más tarde');
           // Mostrar mensaje de error a usuario
         }
       } catch (error) {
         console.error('Error registrando usuario:', error);
         alertify.error('Error registrando usuario. Pruebe más tarde');
         // Mostrar mensaje de error a usuario
       }
       setShowAlert(true);
       
  };
  
  return (
    <div className='pb-16'>
      <form onSubmit={handleSubmit}>
        <Card className='mx-auto max-w-sm'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold'>
              Crea una cuenta
            </CardTitle>
            <CardDescription>
              Ingresa tus datos para crear la cuenta y para despachar tus
              compras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Primer nombre</Label>
                <Input
                  type='text'
                  name='firstName'
                  placeholder='Primer Nombre'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                {errors.firstName && (
                  <span style={{ color: 'red' }}>{errors.firstName}</span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='name'>Apellido</Label>
                <Input
                  type='text'
                  name='lastName'
                  placeholder='Apellido'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                {errors.lastName && (
                  <span style={{ color: 'red' }}>{errors.lastName}</span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  name='email'
                  id='email'
                  placeholder='correo@gmail.com'
                  required
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span style={{ color: 'red' }}>{errors.email}</span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>Contraseña</Label>
                <Input
                  name='password'
                  placeholder=''
                  required
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <span style={{ color: 'red' }}>{errors.password}</span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password-check'>Confirma la contraseña</Label>
                <Input
                  name='confirmPassword'
                  id='password-check'
                  placeholder=''
                  required
                  type='password'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <span style={{ color: 'red' }}>{errors.confirmPassword}</span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='phone'>Número de celular</Label>
                <Input
                  name='phone'
                  id='phone'
                  placeholder='9 2345 4567'
                  required
                  type='number'
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <span style={{ color: 'red' }}>{errors.phone}</span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='region'>Región</Label>
                <Select
                  id='region'
                  value={selectedRegion}
                  onValueChange={handleRegionChange}
                  name='region'
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selecciona una región' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='arica'>Arica y Parinacota</SelectItem>
                      <SelectItem value='tarapaca'>Tarapacá</SelectItem>
                      <SelectItem value='antofagasta'>Antofagasta</SelectItem>
                      <SelectItem value='atacama'>Atacama</SelectItem>
                      <SelectItem value='coquimbo'>Coquimbo</SelectItem>
                      <SelectItem value='Valparaiso'>Valparaíso</SelectItem>
                      <SelectItem value='Metropolitana'>
                        Metropolitana
                      </SelectItem>
                      <SelectItem value='ohiggins'>O&#39;Higgins</SelectItem>
                      <SelectItem value='maule'>Maule</SelectItem>
                      <SelectItem value='nuble'>Ñuble</SelectItem>
                      <SelectItem value='biobio'>Biobío</SelectItem>
                      <SelectItem value='araucania'>Araucanía</SelectItem>
                      <SelectItem value='losrios'>Los Ríos</SelectItem>
                      <SelectItem value='loslagos'>Los Lagos</SelectItem>
                      <SelectItem value='aysen'>Aysén</SelectItem>
                      <SelectItem value='magallanes'>Magallanes</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.region && (
                  <span style={{ color: 'red' }}>{errors.region}</span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='city'>Ciudad</Label>
                <Input
                  name='city'
                  id='city'
                  placeholder='Santiago'
                  required
                  type='text'
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && (
                  <span style={{ color: 'red' }}>{errors.city}</span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='district'>Comuna</Label>
                <Input
                  name='district'
                  id='district'
                  placeholder='Puente Alto'
                  required
                  type='text'
                  value={formData.district}
                  onChange={handleChange}
                />
                {errors.district && (
                  <span style={{ color: 'red' }}>{errors.district}</span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='address'>Dirección</Label>
                <Input
                  name='address'
                  id='address'
                  placeholder='Las Petunias 23'
                  required
                  type='text'
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <span style={{ color: 'red' }}>{errors.address}</span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='zip_code'>Código postal</Label>
                <Input
                  name='zip_code'
                  id='zip_code'
                  placeholder=''
                  required
                  type='text'
                  value={formData.zip_code}
                  onChange={handleChange}
                />
                {errors.zip_code && (
                  <span style={{ color: 'red' }}>{errors.zip_code}</span>
                )}
              </div>
              <Button className='w-full' type='submit'>
                Crea tu cuenta
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
