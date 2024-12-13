"use client";

import Loader from "@/components/ui/Loader";
import {
  useGetAuthProfileQuery,
  useLogoutMutation,
} from "@/redux/features/userAuth/authEndpoints";
import { logout } from "@/redux/features/userAuth/authSlice";
import { clearUserCookies, scrollToTop } from "@/utils/Helper";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: authData, isLoading, refetch } = useGetAuthProfileQuery();
  const [logoutApi, { isSuccess }] = useLogoutMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, [refetch, pathname]);

  const handleLogout = async () => {
    await logoutApi();
  };

  const handleRoute = (url) => {
    router.push(url);
    scrollToTop();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout());
      clearUserCookies("token");
      clearUserCookies("username");
      console.log(document.cookie);
      localStorage.removeItem("auth");
      router.push("/login");
      scrollToTop();
    }
  }, [isSuccess]);

  if (isLoading) return <Loader />;

  const { user } = authData || {};

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-3 py-2 bg-gray-800 hover:bg-gray-700 duration-700 hover:transition-all rounded-3xl cursor-pointer focus:shadow-2xl"
      >
        <div className="flex justify-center items-center gap-12">
          <div className="flex justify-center items-center gap-3">
            <div className="text-orange-700 font-extrabold px-2 py-[2px] rounded-full bg-orange-200">
              {user?.username?.split("")?.[0]}
            </div>
            <div>
              <p className="text-white text-xs">{user?.username}</p>
            </div>
          </div>

          <div>
            <FontAwesomeIcon
              className={`text-gray-200 w-[0.8rem] transition-transform duration-700 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              icon={faChevronDown}
            />
          </div>
        </div>
      </div>

      {/* Always render the dropdown */}
      <div
        className={`bg-gray-700 overflow-hidden w-max absolute left-1 z-20 rounded-3xl transition-all duration-700 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 top-12" : "max-h-0 opacity-0"
        }`}
        style={{ maxHeight: isOpen ? "10rem" : "0" }}
      >
        <div className="flex justify-start items-center py-2 px-2">
          <ul className="flex flex-col  gap-2">
            <li
              onClick={() => handleRoute("/admin/account")}
              className="font-bold text-xs md:text-sm py-2 px-8 bg-gray-800 hover:bg-gray-900 duration-700 rounded-2xl cursor-pointer"
            >
              Account
            </li>
            <li
              onClick={handleLogout}
              className="font-bold text-xs md:text-sm py-2 px-8 bg-gray-800 hover:bg-gray-900 duration-700 rounded-2xl cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Account;
