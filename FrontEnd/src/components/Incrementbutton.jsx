import React, { useState } from "react";
import { Button } from "./ui/button";

const IncrementDecrementBtn = ({ minValue = 1, maxValue = 100 }) => {
  const [count, setCount] = useState(minValue);

  const handleIncrementCounter = () => {
    if (count < maxValue) {
      setCount((prevState) => prevState + 1);
    }
  };

  const handleDecrementCounter = () => {
    if (count > minValue) {
      setCount((prevState) => prevState - 1);
    }
  };

  return (
    <div className="btn-group flex">
      <Button className="decrement-btn h-10" variant="secondary" onClick={handleDecrementCounter}>
        -
      </Button>
      <p className="flex h-10 w-12 rounded-md border items-center justify-center border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        {count}
      </p>
      <Button className="increment-btn h-10" variant="secondary" onClick={handleIncrementCounter}>
        +
      </Button>
    </div>
  );
};

export default IncrementDecrementBtn;
