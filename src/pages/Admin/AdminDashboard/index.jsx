import React, { useEffect, useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Content from "./content";
import { useAuthStore } from "../../../zustand/users-store";
import MyFooter from "../../../components/MyFooter/MyFooter.jsx";
import Modal from "../../../components/Modal/index.jsx";
import adminIcon from "../../../assets/icon/admin5.png";

const AdminDashboard = () => {
  const { token, fetchUserDetails, userDetails, logout } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  let userId = "";

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const navigation = [
    { name: "Dashboard", href: "#", current: true },
    { name: "Reports", href: "#", current: false },
  ];

  const classNames = (...classes) => classes.filter(Boolean).join(" ");

  const handleLogout = () => {
    setModalOpen(true);
  };

  const cancelLogout = () => {
    setModalOpen(false);
  };

  const confirmLogout = () => {
    logout();
    navigate("/auth");
  };

  useEffect(() => {
    if (userId) fetchUserDetails(userId);
  }, [userId, fetchUserDetails]);

  return (
    <div className=" min-h-full bg-gray-100 ">
      <Disclosure as="nav" className="fixed top-0 z-50 bg-white shadow-md w-full ">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl xl:h-[52px] w-full px-4 sm:px-6 lg:px-8 transform transition-transform duration-300 ease-in-out">
              <div className="flex justify-between h-20  items-center px-4 ">
                <div className="flex gap-2 items-center ">
                  {/* <img src={adminIcon} alt="admin" width={54} /> */}
                  <img src="https://img.icons8.com/?size=100&id=BWRr8y2fdHgJ&format=png&color=000000" alt="admin" width={38} />
                  <p className="font-bold text-gray-700 text-md font-opensauce px-2">Admin </p>
                </div>
                <div className="hidden md:flex items-center space-x-4 mr-52">
                  <button type="button" className="relative p-1 text-gray-500  focus:outline-none ">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ">
                    <div>
                      <Menu.Button className="flex items-center text-sm rounded-full focus:outline-none ">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src="https://img.icons8.com/?size=100&id=84898&format=png&color=C4C0C0" alt="User avatar" />
                        {userDetails && <div className="ml-2 text-gray-700 font-medium">{userDetails.username}</div>}
                      </Menu.Button>
                    </div>
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={handleLogout} className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>

                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-100 transition-all">
                    <span className="sr-only">Open main menu</span>
                    {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(item.current ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-800", "block rounded-md px-3 py-2 text-base font-medium")}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-200 pb-3 pt-4 ">
                <div className="flex items-center px-5">
                  <img className="h-10 w-10 rounded-full" src="https://img.icons8.com/?size=100&id=84898&format=png&color=C4C0C0" alt="User avatar" />
                  <div className="ml-3">
                    {userDetails ? (
                      <>
                        <div className="z-50 text-base font-medium text-gray-700">{userDetails.username}</div>
                        <div className="text-sm font-medium text-gray-500">{userDetails.email}</div>
                      </>
                    ) : (
                      <div className="text-base font-medium text-gray-700">Guest</div>
                    )}
                  </div>
                  <button type="button" className="ml-auto relative p-1 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button onClick={handleLogout} className="block w-full rounded-md px-3 py-2 text-base font-medium text-gray-700 bg-gray-100 hover:text-gray-900">
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main className="py-6">
        <Content />
      </main>
      {modalOpen && <Modal onConfirm={confirmLogout} onCancel={cancelLogout} />}
      <MyFooter />
    </div>
  );
};

export default AdminDashboard;
