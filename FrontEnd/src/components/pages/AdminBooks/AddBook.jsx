import React from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
export const AddBook = () => {
  return (
    <div className="flex flex-col gap-4 px-4 md:px-20">
      <h1 className="font-bold text-2xl">Nuevo libro</h1>
      <form className="flex flex-col gap-4">
        <div className="col-md-6">
          <div className="row">
            <Label htmlFor="title" >Título</Label>
            <Input id="title" placeholder="Título" required type="text" />
          </div>
          <div className="row">
            <Label htmlFor="author">Autor</Label>
            <Input id="author" placeholder="Autor" required type="text" />
          </div>
        </div>
      </form>
    </div>
  );
};
