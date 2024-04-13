/* eslint-disable react/prop-types */
import * as DialogPrimitives from '@radix-ui/react-dialog';
import * as Icons from '@radix-ui/react-icons';
import './dialog.css';
import { useState } from 'react';

export const Dialog = ({
  title,
  description,
  content,
  textoBoton1,
  textoBoton2,
  open,
  setOpen,
  accionBoton1,
  accionBoton2
}) => {
  return (
    <DialogPrimitives.Dialog open={open} onOpenChange={setOpen}>
      <DialogPrimitives.DialogTrigger></DialogPrimitives.DialogTrigger>
      <DialogPrimitives.DialogContent className="content">
        <DialogPrimitives.DialogTitle className="dialog-title">
          {title}
        </DialogPrimitives.DialogTitle>
        <DialogPrimitives.DialogDescription>
          {description}
        </DialogPrimitives.DialogDescription>
        {content}
        <div className="dialog-buttons">
          <DialogPrimitives.DialogClose asChild>
            <button aria-label="Close" className="button action" onClick={accionBoton1}>
              {textoBoton1}
            </button>
          </DialogPrimitives.DialogClose>
          <DialogPrimitives.DialogClose asChild>
            <button aria-label="Close" className="button cancel" onClick={accionBoton2}>
              {textoBoton2}
            </button>
          </DialogPrimitives.DialogClose>
        </div>
        <DialogPrimitives.DialogClose asChild>
          <button className="icon-btn">
            <Icons.Cross2Icon style={{ transform: 'scale(1.5)' }} />
          </button>
        </DialogPrimitives.DialogClose>
      </DialogPrimitives.DialogContent>
    </DialogPrimitives.Dialog>
  );
};
