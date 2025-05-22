import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  LightBulbIcon,
  XMarkIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

import { useLocation } from "react-router-dom";

const path = window.location.href.split(window.location.host)[1];
console.log(path);

const navigation = [
  { name: "Home", href: "/", current: path == "/", guess: false },
  { name: "Store", href: "/store", current: path == "/store", guess: false },
  { name: "Login", href: "/login", current: path == "/login", guess: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ darkChanger, dark, token }) {
  const logout = () => {
    localStorage.removeItem("jwt-token");
    window.location.href = "/";
  };

  return (
    <>
      <Disclosure
        as="nav"
        className="dark:bg-gray-800 bg-white color rounded-2xl fixed w-9/10 mt-5 inset-x-0 m-auto shadow-xl dark:shadow-gray-700 shadow-gray-400 z-1000 opacity-95"
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400  dark:hover:text-white hover:text-gray-900 focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-open:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-open:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => {
                    if (item.guess && token) return "";

                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "dark:bg-gray-900 bg-gray-900 text-white"
                            : "text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full dark:bg-gray-800 p-1 text-gray-400 dark:hover:text-white hover:text-gray-900"
                onClick={() => darkChanger(!dark)}
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                {dark ? (
                  <LightBulbIcon aria-hidden="true" className="size-6" />
                ) : (
                  <MoonIcon aria-hidden="true" className="size-6" />
                )}
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm ">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 rounded-2xl"
                >
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:outline-hidden dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100"
                    >
                      Perfil
                    </a>
                  </MenuItem>
                  {token ? (
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:outline-hidden dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100"
                        onClick={logout}
                      >
                        Sign Out
                      </a>
                    </MenuItem>
                  ) : (
                    <MenuItem>
                      <a
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:outline-hidden dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100"
                      >
                        Log in
                      </a>
                    </MenuItem>
                  )}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "dark:bg-gray-900 bg-gray-900 text-white"
                    : "text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      {/* <div className="h-40"></div> */}
    </>
  );
}
