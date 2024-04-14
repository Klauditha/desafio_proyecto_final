/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useContext } from "react";
import { ECommerceContext } from "../Context/ECommerceContext";
import { Icon } from "@radix-ui/react-select";

export default function Navbar() {
  const {
    setSearchBooks,
    setDataAuthenticatedUser,
    setAuthenticatedUser,
    authenticatedUser,
    dataAuthenticatedUser,
  } = useContext(ECommerceContext);

  return (
    <>
      <div className="flex-col flex justify-between px-2 md:px-6">
        <div>
          <nav className="flex items-center justify-between sm:py-0 md:py-4 py-4 border-b bg-white md:px-6 dark:bg-gray-950 border-gray-100 dark:border-gray-800">
            <div>
              <Link className="mr-6 flex items-center gap-2" to="/">
                <AustralInk className="h-6 w-6" />
                <span className="sr-only">Tinta Austral</span>
              </Link>
            </div>
            <div className="hidden md:flex w-fit absolute left-1/2 transform -translate-x-1/2 items-center border border-gray-300 rounded-lg px-2.5">
              <SearchIcon className="h-4 w-4 mr-2.5" />
              <Input
                id="searchBooks"
                className="w-[250px] border-0"
                placeholder="Busca aquí"
                type="search"
                onChange={(e) => {
                  setSearchBooks(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex md:hidden gap-4">
                {/* 
                <div className="flex  md:hidden  md:gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
                */}
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-blue-900 dark:text-gray-50 "
                      : "text-gray-500 dark:text-gray-500"
                  }
                >
                  <div className="flex gap-2">
                    <span>
                      {" "}
                      <ShoppingCartIcon className="h-4 w-4 fill-current" />
                    </span>
                    <span className="hidden md:flex">Carrito</span>
                  </div>
                </NavLink>
              </div>
              {/*  Mobile menu */}
              <div className="flex md:hidden">
                <Popover className="w-max mx-auto">
                  <PopoverTrigger asChild>
                    <Button
                      className="w-10 h-10 rounded-full border-2 border-gray-100 dark:border-gray-850"
                      id="menu"
                      size="icon"
                      variant="outline"
                    >
                      <MenuIcon className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    className="rounded-t-2xl w-56 mt-2"
                    side="bottom"
                  >
                    <div />
                    <div className="grid gap-8 p-2">
                      <div>
                        <NavLink
                          to="/news"
                          className={({ isActive }) =>
                            isActive
                              ? "font-bold text-blue-900 dark:text-gray-50 "
                              : "text-gray-500 dark:text-gray-500"
                          }
                        >
                          Novedades
                        </NavLink>
                      </div>

                      <div>
                        <NavLink
                          to="/bestselling"
                          className={({ isActive }) =>
                            isActive
                              ? "font-bold text-blue-900 dark:text-gray-50 "
                              : "text-gray-500 dark:text-gray-500"
                          }
                        >
                          Lo + vendido
                        </NavLink>
                      </div>

                      <div>
                        <NavLink
                          to="/publishers"
                          className={({ isActive }) =>
                            isActive
                              ? "font-bold text-blue-900 dark:text-gray-50 "
                              : "text-gray-500 dark:text-gray-500"
                          }
                        >
                          Editoriales
                        </NavLink>
                      </div>

                      <div>
                        <NavLink
                          to="/wishlist"
                          className={({ isActive }) =>
                            isActive
                              ? "font-bold text-blue-900 dark:text-gray-50 "
                              : "text-gray-500 dark:text-gray-500"
                          }
                        >
                          Lista de deseos
                        </NavLink>
                      </div>
                      <div>
                        {dataAuthenticatedUser &&
                          dataAuthenticatedUser.admin && (
                            <NavLink
                              className={({ isActive }) =>
                                isActive
                                  ? "font-bold text-blue-900 dark:text-gray-50 "
                                  : "text-gray-500 dark:text-gray-500"
                              }
                              to="/managerbooks"
                            >
                              Gestión de libros
                            </NavLink>
                          )}
                      </div>
                      <div>
                        {dataAuthenticatedUser &&
                          dataAuthenticatedUser.admin && (
                            <NavLink
                              className={({ isActive }) =>
                                isActive
                                  ? "font-bold text-blue-900 dark:text-gray-50 "
                                  : "text-gray-500 dark:text-gray-500"
                              }
                              to="/managergenres"
                            >
                              Gestión de Géneros
                            </NavLink>
                          )}
                      </div>

                      <div>
                        {dataAuthenticatedUser &&
                          dataAuthenticatedUser.admin && (
                            <NavLink
                              className={({ isActive }) =>
                                isActive
                                  ? "font-bold text-blue-900 dark:text-gray-50 "
                                  : "text-gray-500 dark:text-gray-500"
                              }
                              to="/managerauthors"
                            >
                              Gestión de Autores
                            </NavLink>
                          )}
                      </div>

                      <div>
                        {dataAuthenticatedUser ? (
                          <NavLink
                            to="/logout"
                            className="flex md:hidden md:bg-gray-700"
                            asChild
                          >
                            <Link
                              onClick={() => {
                                sessionStorage.clear();
                                window.location.href = "/";
                              }}
                            >
                              Cerrar sesión
                            </Link>
                          </NavLink>
                        ) : (
                          <NavLink
                            className="text-gray-500 dark:text-gray-500"
                            to="/login"
                          >
                            Inicia sesión
                          </NavLink>
                        )}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="hidden md:flex md:gap-8">
              {dataAuthenticatedUser ? (
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-blue-900 dark:text-gray-50 mt-2"
                      : "font-bold text-green-700 dark:text-green-500 mt-2"
                  }
                >
                  <div className="hidden md:flex md:gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    {dataAuthenticatedUser.first_name}{" "}
                    {dataAuthenticatedUser.last_name}
                  </div>
                </NavLink>
              ) : (
                <Button className="hidden md:flex" asChild>
                  <Link to="/login">Inicia sesión</Link>
                </Button>
              )}
              <div className="hidden md:flex">
                <Link
                  className="ml-auto flex items-center gap-2 text-mm font-medium"
                  to="/cart"
                >
                  <span className="hidden md:flex">Carrito</span>
                  <ShoppingCartIcon className="h-4 w-4 fill-current" />
                </Link>
              </div>
              {dataAuthenticatedUser ? (
                <Button className="hidden md:flex md:bg-gray-700" asChild>
                  <Link
                    onClick={() => {
                      sessionStorage.clear();
                      window.location.href = "/";
                    }}
                  >
                    Cerrar sesión
                  </Link>
                </Button>
              ) : null}
            </div>
          </nav>
        </div>

        {/* second row */}
        <div>
          <nav className="flex items-center justify-between py-4 px-4 border-b bg-white md:px-6 dark:bg-gray-950 border-gray-100 dark:border-gray-800">
            <div className="hidden md:flex flex-1 justify-center gap-8 text-sm font-medium">
              <NavLink
                to="/news"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-blue-900 dark:text-gray-50 "
                    : "text-gray-500 dark:text-gray-500"
                }
              >
                Novedades
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-blue-900 dark:text-gray-50 "
                    : "text-gray-500 dark:text-gray-500"
                }
                to="/bestselling"
              >
                Lo + vendido
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-blue-900 dark:text-gray-50 "
                    : "text-gray-500 dark:text-gray-500"
                }
                to="/publishers"
              >
                Editoriales
              </NavLink>

              {dataAuthenticatedUser && dataAuthenticatedUser.admin && (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "font-bold text-blue-900 dark:text-gray-50 "
                        : "text-gray-500 dark:text-gray-500"
                    }
                    to="/managerbooks"
                  >
                    Gestión de libros
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "font-bold text-blue-900 dark:text-gray-50 "
                        : "text-gray-500 dark:text-gray-500"
                    }
                    to="/managergenres"
                  >
                    Gestión de Géneros
                  </NavLink>

                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "font-bold text-blue-900 dark:text-gray-50 "
                        : "text-gray-500 dark:text-gray-500"
                    }
                    to="/managerauthors"
                  >
                    Gestión de Autores
                  </NavLink>
                </>
              )}
              {dataAuthenticatedUser && !dataAuthenticatedUser.admin && (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-blue-900 dark:text-gray-50 "
                      : "text-gray-500 dark:text-gray-500"
                  }
                  to="/wishlist"
                >
                  Lista de deseos
                </NavLink>
              )}
            </div>
            {/* mobile menu */}
            <div className="flex hidden md:hidden px-4 md:px-6">
              <Popover className="w-max mx-auto">
                <PopoverTrigger asChild>
                  <Button
                    className="w-10 h-10 rounded-full border-2 border-gray-100 top-4 right-4 absolute dark:border-gray-850"
                    id="menu"
                    size="icon"
                    variant="outline"
                  >
                    <MenuIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="rounded-t-2xl w-56 mt-2"
                  side="bottom"
                >
                  <div />
                  <div className="grid gap-8 p-2">
                    <div>
                      <NavLink
                        to="/news"
                        className={({ isActive }) =>
                          isActive
                            ? "font-bold text-blue-900 dark:text-gray-50 "
                            : "text-gray-500 dark:text-gray-500"
                        }
                      >
                        Novedades
                      </NavLink>
                    </div>

                    <div>
                      <NavLink
                        to="/bestselling"
                        className={({ isActive }) =>
                          isActive
                            ? "font-bold text-blue-900 dark:text-gray-50 "
                            : "text-gray-500 dark:text-gray-500"
                        }
                      >
                        Lo + vendido
                      </NavLink>
                    </div>

                    <div>
                      <NavLink
                        to="/publishers"
                        className={({ isActive }) =>
                          isActive
                            ? "font-bold text-blue-900 dark:text-gray-50 "
                            : "text-gray-500 dark:text-gray-500"
                        }
                      >
                        Editoriales
                      </NavLink>
                    </div>

                    <div>
                      <NavLink
                        to="/wishlist"
                        className={({ isActive }) =>
                          isActive
                            ? "font-bold text-blue-900 dark:text-gray-50 "
                            : "text-gray-500 dark:text-gray-500"
                        }
                      >
                        Lista de deseos
                      </NavLink>
                    </div>

                    <div>
                      <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                          isActive
                            ? "font-bold text-blue-900 dark:text-gray-50 "
                            : "text-gray-500 dark:text-gray-500"
                        }
                      >
                        <div className="flex gap-2">
                          <span>
                            {" "}
                            <ShoppingCartIcon className="h-4 w-4 fill-current" />
                          </span>
                          <span>Carrito</span>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

function AustralInk(props) {
  return (
    <>
      <svg
        width="125"
        height="28"
        viewBox="0 0 125 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.2324 10.3198V8.31112H35.6961V10.3198H32.1683V19.834H29.7602V10.3198H26.2324Z"
          fill="#091B7E"
        />
        <path
          d="M37.2096 19.834V11.1919H39.6064V19.834H37.2096ZM38.4136 10.0778C38.0573 10.0778 37.7516 9.95966 37.4965 9.72335C37.2452 9.48329 37.1195 9.19635 37.1195 8.86251C37.1195 8.53243 37.2452 8.24923 37.4965 8.01292C37.7516 7.77286 38.0573 7.65283 38.4136 7.65283C38.77 7.65283 39.0738 7.77286 39.3251 8.01292C39.5802 8.24923 39.7077 8.53243 39.7077 8.86251C39.7077 9.19635 39.5802 9.48329 39.3251 9.72335C39.0738 9.95966 38.77 10.0778 38.4136 10.0778Z"
          fill="#091B7E"
        />
        <path
          d="M43.9233 14.8378V19.834H41.5264V11.1919H43.8108V12.7166H43.912C44.1033 12.214 44.424 11.8164 44.8742 11.5238C45.3243 11.2275 45.87 11.0793 46.5114 11.0793C47.1116 11.0793 47.6349 11.2106 48.0812 11.4732C48.5276 11.7357 48.8745 12.1108 49.1221 12.5985C49.3697 13.0823 49.4934 13.66 49.4934 14.3314V19.834H47.0966V14.759C47.1003 14.2301 46.9653 13.8175 46.6915 13.5212C46.4177 13.2211 46.0407 13.0711 45.5606 13.0711C45.238 13.0711 44.9529 13.1405 44.7054 13.2793C44.4616 13.418 44.2703 13.6206 44.1315 13.8869C43.9964 14.1495 43.927 14.4664 43.9233 14.8378Z"
          fill="#091B7E"
        />
        <path
          d="M55.9793 11.1919V12.9923H50.7749V11.1919H55.9793ZM51.9564 9.12133H54.3533V17.1784C54.3533 17.3997 54.387 17.5722 54.4545 17.696C54.5221 17.816 54.6158 17.9004 54.7359 17.9492C54.8596 17.9979 55.0022 18.0223 55.1635 18.0223C55.276 18.0223 55.3885 18.0129 55.5011 17.9942C55.6136 17.9717 55.6999 17.9548 55.7599 17.9436L56.1368 19.7271C56.0168 19.7646 55.848 19.8078 55.6305 19.8565C55.4129 19.909 55.1485 19.9409 54.8371 19.9522C54.2595 19.9747 53.7531 19.8978 53.318 19.7215C52.8866 19.5452 52.5509 19.2714 52.3109 18.9C52.0708 18.5287 51.9527 18.0598 51.9564 17.4934V9.12133Z"
          fill="#091B7E"
        />
        <path
          d="M60.005 19.9972C59.4536 19.9972 58.9622 19.9015 58.5309 19.7103C58.0995 19.5152 57.7582 19.2283 57.5069 18.8494C57.2593 18.4668 57.1355 17.9904 57.1355 17.4203C57.1355 16.9402 57.2237 16.5369 57.4 16.2106C57.5763 15.8843 57.8163 15.6217 58.1202 15.4229C58.424 15.2241 58.7691 15.0741 59.1554 14.9728C59.5455 14.8715 59.9544 14.8003 60.382 14.759C60.8846 14.7065 61.2897 14.6577 61.5973 14.6127C61.9049 14.564 62.128 14.4927 62.2668 14.3989C62.4056 14.3051 62.475 14.1664 62.475 13.9826V13.9488C62.475 13.5925 62.3625 13.3168 62.1374 13.1217C61.9161 12.9267 61.601 12.8291 61.1922 12.8291C60.7608 12.8291 60.4176 12.9248 60.1625 13.1161C59.9075 13.3036 59.7387 13.5399 59.6562 13.825L57.4394 13.645C57.5519 13.1198 57.7732 12.666 58.1033 12.2834C58.4334 11.897 58.8591 11.6007 59.3805 11.3944C59.9056 11.1843 60.5133 11.0793 61.2034 11.0793C61.6836 11.0793 62.143 11.1356 62.5819 11.2481C63.0245 11.3606 63.4165 11.5351 63.7578 11.7714C64.1029 12.0077 64.3749 12.3115 64.5737 12.6829C64.7725 13.0504 64.8719 13.4912 64.8719 14.0051V19.834H62.5988V18.6356H62.5313C62.3925 18.9057 62.2068 19.1439 61.9743 19.3502C61.7417 19.5527 61.4623 19.7121 61.1359 19.8284C60.8096 19.9409 60.4326 19.9972 60.005 19.9972ZM60.6914 18.343C61.044 18.343 61.3553 18.2736 61.6254 18.1349C61.8955 17.9923 62.1074 17.801 62.2612 17.561C62.415 17.3209 62.4919 17.049 62.4919 16.7451V15.828C62.4169 15.8768 62.3137 15.9218 62.1824 15.9631C62.0549 16.0006 61.9105 16.0362 61.7492 16.07C61.5879 16.1 61.4266 16.1281 61.2653 16.1544C61.104 16.1769 60.9577 16.1975 60.8265 16.2162C60.5451 16.2575 60.2995 16.3231 60.0894 16.4132C59.8794 16.5032 59.7162 16.6251 59.5999 16.7789C59.4836 16.9289 59.4255 17.1165 59.4255 17.3415C59.4255 17.6679 59.5436 17.9173 59.78 18.0898C60.02 18.2586 60.3238 18.343 60.6914 18.343Z"
          fill="#091B7E"
        />
        <path
          d="M72.4295 19.834H69.8189L73.7968 8.31112H76.9363L80.9086 19.834H78.2979L75.4116 10.9443H75.3215L72.4295 19.834ZM72.2664 15.3048H78.4329V17.2065H72.2664V15.3048Z"
          fill="#091B7E"
        />
        <path
          d="M87.7925 16.1544V11.1919H90.1893V19.834H87.8881V18.2643H87.7981C87.6031 18.7706 87.2786 19.1776 86.8247 19.4852C86.3746 19.7928 85.8251 19.9466 85.1762 19.9466C84.5986 19.9466 84.0903 19.8153 83.6514 19.5527C83.2126 19.2901 82.8694 18.9169 82.6218 18.4331C82.378 17.9492 82.2542 17.3697 82.2505 16.6945V11.1919H84.6473V16.2669C84.6511 16.777 84.788 17.1802 85.0581 17.4766C85.3281 17.7729 85.6901 17.921 86.1439 17.921C86.4328 17.921 86.7028 17.8554 86.9542 17.7241C87.2055 17.5891 87.408 17.3903 87.5618 17.1277C87.7193 16.8652 87.7962 16.5407 87.7925 16.1544Z"
          fill="#091B7E"
        />
        <path
          d="M99.2971 13.6562L97.1028 13.7913C97.0653 13.6037 96.9847 13.4349 96.8609 13.2849C96.7371 13.1311 96.5739 13.0092 96.3714 12.9192C96.1726 12.8254 95.9344 12.7785 95.6568 12.7785C95.2855 12.7785 94.9723 12.8573 94.7172 13.0148C94.4621 13.1686 94.3346 13.3749 94.3346 13.6337C94.3346 13.84 94.4171 14.0144 94.5822 14.157C94.7472 14.2995 95.0304 14.4139 95.4318 14.5002L96.9959 14.8153C97.8361 14.9878 98.4625 15.2654 98.8751 15.648C99.2877 16.0306 99.494 16.5332 99.494 17.1559C99.494 17.7222 99.3271 18.2192 98.9933 18.6469C98.6632 19.0745 98.2093 19.4083 97.6317 19.6484C97.0578 19.8847 96.3958 20.0028 95.6456 20.0028C94.5015 20.0028 93.59 19.7646 92.9111 19.2883C92.236 18.8081 91.8402 18.1555 91.7239 17.3303L94.0814 17.2065C94.1527 17.5553 94.3252 17.8216 94.599 18.0054C94.8729 18.1855 95.2236 18.2755 95.6512 18.2755C96.0713 18.2755 96.4089 18.1949 96.6639 18.0336C96.9228 17.8685 97.054 17.6566 97.0578 17.3978C97.054 17.1802 96.9621 17.0021 96.7821 16.8633C96.6021 16.7207 96.3245 16.612 95.9494 16.5369L94.4528 16.2387C93.6088 16.07 92.9805 15.7774 92.5679 15.361C92.1591 14.9447 91.9546 14.4139 91.9546 13.7688C91.9546 13.2136 92.1047 12.7354 92.4047 12.334C92.7086 11.9327 93.1343 11.6232 93.6819 11.4057C94.2333 11.1881 94.8785 11.0793 95.6174 11.0793C96.709 11.0793 97.5679 11.31 98.1943 11.7714C98.8245 12.2327 99.1921 12.861 99.2971 13.6562Z"
          fill="#091B7E"
        />
        <path
          d="M105.6 11.1919V12.9923H100.396V11.1919H105.6ZM101.577 9.12133H103.974V17.1784C103.974 17.3997 104.008 17.5722 104.075 17.696C104.143 17.816 104.237 17.9004 104.357 17.9492C104.48 17.9979 104.623 18.0223 104.784 18.0223C104.897 18.0223 105.009 18.0129 105.122 17.9942C105.234 17.9717 105.321 17.9548 105.381 17.9436L105.758 19.7271C105.638 19.7646 105.469 19.8078 105.251 19.8565C105.034 19.909 104.769 19.9409 104.458 19.9522C103.88 19.9747 103.374 19.8978 102.939 19.7215C102.507 19.5452 102.172 19.2714 101.932 18.9C101.692 18.5287 101.573 18.0598 101.577 17.4934V9.12133Z"
          fill="#091B7E"
        />
        <path
          d="M107.161 19.834V11.1919H109.485V12.6997H109.575C109.733 12.1633 109.997 11.7582 110.368 11.4844C110.74 11.2069 111.167 11.0681 111.651 11.0681C111.771 11.0681 111.901 11.0756 112.04 11.0906C112.178 11.1056 112.3 11.1262 112.405 11.1525V13.2793C112.293 13.2455 112.137 13.2155 111.938 13.1892C111.739 13.163 111.558 13.1498 111.393 13.1498C111.04 13.1498 110.725 13.2267 110.447 13.3805C110.173 13.5306 109.956 13.7406 109.795 14.0107C109.637 14.2808 109.558 14.5921 109.558 14.9447V19.834H107.161Z"
          fill="#091B7E"
        />
        <path
          d="M115.861 19.9972C115.31 19.9972 114.819 19.9015 114.387 19.7103C113.956 19.5152 113.614 19.2283 113.363 18.8494C113.116 18.4668 112.992 17.9904 112.992 17.4203C112.992 16.9402 113.08 16.5369 113.256 16.2106C113.433 15.8843 113.673 15.6217 113.976 15.4229C114.28 15.2241 114.625 15.0741 115.012 14.9728C115.402 14.8715 115.811 14.8003 116.238 14.759C116.741 14.7065 117.146 14.6577 117.454 14.6127C117.761 14.564 117.984 14.4927 118.123 14.3989C118.262 14.3051 118.331 14.1664 118.331 13.9826V13.9488C118.331 13.5925 118.219 13.3168 117.994 13.1217C117.772 12.9267 117.457 12.8291 117.048 12.8291C116.617 12.8291 116.274 12.9248 116.019 13.1161C115.764 13.3036 115.595 13.5399 115.512 13.825L113.296 13.645C113.408 13.1198 113.629 12.666 113.96 12.2834C114.29 11.897 114.715 11.6007 115.237 11.3944C115.762 11.1843 116.37 11.0793 117.06 11.0793C117.54 11.0793 117.999 11.1356 118.438 11.2481C118.881 11.3606 119.273 11.5351 119.614 11.7714C119.959 12.0077 120.231 12.3115 120.43 12.6829C120.629 13.0504 120.728 13.4912 120.728 14.0051V19.834H118.455V18.6356H118.388C118.249 18.9057 118.063 19.1439 117.831 19.3502C117.598 19.5527 117.319 19.7121 116.992 19.8284C116.666 19.9409 116.289 19.9972 115.861 19.9972ZM116.548 18.343C116.9 18.343 117.212 18.2736 117.482 18.1349C117.752 17.9923 117.964 17.801 118.117 17.561C118.271 17.3209 118.348 17.049 118.348 16.7451V15.828C118.273 15.8768 118.17 15.9218 118.039 15.9631C117.911 16.0006 117.767 16.0362 117.605 16.07C117.444 16.1 117.283 16.1281 117.122 16.1544C116.96 16.1769 116.814 16.1975 116.683 16.2162C116.401 16.2575 116.156 16.3231 115.946 16.4132C115.736 16.5032 115.572 16.6251 115.456 16.7789C115.34 16.9289 115.282 17.1165 115.282 17.3415C115.282 17.6679 115.4 17.9173 115.636 18.0898C115.876 18.2586 116.18 18.343 116.548 18.343Z"
          fill="#091B7E"
        />
        <path
          d="M124.985 8.31112V19.834H122.588V8.31112H124.985Z"
          fill="#091B7E"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.0529 22.4581V24.7325H21.038V-0.00146484H3.41158C1.52742 -0.00146484 0 1.52595 0 3.41011V24.5903C0 26.4745 1.52741 28.0019 3.41158 28.0019H16.9157V5.1159H3.76695C2.86412 5.1159 2.13223 4.38401 2.13223 3.48118C2.13223 2.57836 2.86412 1.84647 3.76695 1.84647H19.048V22.4581H18.0529ZM8.67113 10.0915L10.3769 13.2188L13.7885 13.7874L11.2298 16.2039L11.9406 19.8998L8.67113 18.194L5.54385 19.7577L6.11245 16.2039L3.55377 13.7874L7.10749 13.2188L8.67113 10.0915Z"
          fill="#E60000"
        />
      </svg>
    </>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
