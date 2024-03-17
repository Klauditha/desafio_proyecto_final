import IncrementDecrementBtn from "./Incrementbutton";
import { Button } from "./ui/button";

export default function CartItem() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-gray-200 dark:border-gray-800 px-4 md:px-20">
      <div className="flex flex-col items-center md:flex-row gap-4">
        <img
          alt="Book cover"
          className="aspect-[9-16] object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
          height={200}
          src="/img/la-conquista-de-los-gatos.png"
          width={130}
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-balance text-center">Thiss is the title of the book</h2>
          <h2 className="text-2xl font-semibold text-center md:text-left">$ 100.000</h2>
        </div>
      </div>
      <div className="flex gap-4">
        <IncrementDecrementBtn />
        <Button variant="destructive">
          <Deleteicon />
        </Button>
      </div>
    </div>
  );
}

function Deleteicon(props) {
  return (
    <>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 4H14"
          stroke="white"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.6663 4V13.3333C12.6663 14 11.9997 14.6667 11.333 14.6667H4.66634C3.99967 14.6667 3.33301 14 3.33301 13.3333V4"
          stroke="white"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.33301 3.99967V2.66634C5.33301 1.99967 5.99967 1.33301 6.66634 1.33301H9.33301C9.99967 1.33301 10.6663 1.99967 10.6663 2.66634V3.99967"
          stroke="white"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.66699 7.33301V11.333"
          stroke="white"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.33301 7.33301V11.333"
          stroke="white"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
}
