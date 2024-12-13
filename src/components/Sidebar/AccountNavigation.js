"use client";

import {
  useGetAuthProfileQuery,
  useLogoutMutation,
} from "@/redux/features/userAuth/authEndpoints";
import { logout } from "@/redux/features/userAuth/authSlice";
import { clearUserCookies, scrollToTop } from "@/utils/Helper";
import {
  faArrowRightFromBracket,
  faHouseChimney,
  faList,
  faMagicWandSparkles,
  faUsers,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const NavigationTab = ({ label, icon, url, isActive }) => {
  const router = useRouter();

  const handleRoute = () => {
    url && router.push(url);
    scrollToTop();
  };

  return (
    <div>
      <div
        onClick={() => handleRoute()}
        className={`${
          isActive && "border-l-[6px] border-red-400 "
        } flex justify-start items-center gap-4 cursor-pointer`}
      >
        <div className={`${isActive && "pl-11"} pl-12`}>
          <FontAwesomeIcon
            className={`${isActive && " text-red-400"} inline w-[1rem] `}
            icon={icon}
          />
        </div>
        <div className="pt-1">
          <p className={`${isActive && " text-red-400"} text-xs lg:text-sm`}>
            {label}
          </p>
        </div>
      </div>
    </div>
  );
};

const AccountNavigation = ({ content, currentUser }) => {
  const [logoutApi, { isSuccess }] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const { role } = currentUser?.user;

  const handleLogout = async () => {
    await logoutApi();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout());
      clearUserCookies("token");
      clearUserCookies("username");
      localStorage.removeItem("auth");
      router.push("/login");
      scrollToTop();
    }
  }, [isSuccess]);

  return (
    <section>
      <div>
        <div className="pt-8">
          <div className="px-12">
            <div className="relative ">
              <h2 className="text-slate-100 font-bold text-xl">
                WizardWaves &nbsp;
                <span>
                  <FontAwesomeIcon
                    className="w-[2rem] inline"
                    icon={faMagicWandSparkles}
                  />
                </span>
              </h2>
              <div className="absolute -top-3 -left-8 px-4 py-4 bg-gradient-to-tr from-rose-600 via-red-500  to-red-100 rounded-full w-max"></div>
            </div>
          </div>

          <div className="mt-16">
            <div className="pl-12 pb-2 ">
              <div className="flex justify-between pr-12">
                <div>
                  <p className="text-gray-200 text-xs">Playlists</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 py-4">
              <NavigationTab
                label={"Home"}
                icon={faHouseChimney}
                url={"/"}
                isActive={content === "Home"}
              />
              <NavigationTab
                label={"Account"}
                icon={faUserTie}
                url={"/admin/account"}
                isActive={content === "Account"}
              />
              {(role === "admin" || role === "contributor") && (
                <NavigationTab
                  label={"Manage Music"}
                  icon={faList}
                  url={"/admin/music"}
                  isActive={content === "Music"}
                />
              )}

              {role === "admin" && (
                <NavigationTab
                  label={"Manage Users"}
                  icon={faUsers}
                  url={"/admin/users"}
                  isActive={content === "Users"}
                />
              )}

              <span onClick={handleLogout}>
                {" "}
                <NavigationTab
                  label={"Logout"}
                  icon={faArrowRightFromBracket}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountNavigation;
