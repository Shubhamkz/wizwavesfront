"use client";

import React, { useEffect, useState } from "react";
import GoogleIcon from "../ui/GoogleIcon";
import AppleIcon from "../ui/AppleIcon";
import LoginForm from "./LoginForm";
import { useLoginMutation } from "@/redux/features/userAuth/authEndpoints";
import { useDispatch } from "react-redux";
import { login } from "@/redux/features/userAuth/authSlice";
import { useRouter } from "next/navigation";
import { scrollToTop, setCookie } from "@/utils/Helper";
import toast from "react-hot-toast";
import Link from "next/link";

const Login = () => {
  const [loginApi, { isLoading, isSuccess, isError, error }] =
    useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const res = await loginApi(loginData).unwrap();

    if (res?.success) {
      toast.success("You are Logged in successfully");
      localStorage.setItem("auth", JSON.stringify(res));
      setCookie("username", res.user.role, 1);
      setCookie("token", res.token, 1);
      dispatch(
        login({
          token: res?.token,
          user: res?.user,
        })
      );
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push("/"); // Ensure the router is ready
        scrollToTop();
      }, 500); // Slight delay to allow token persistence
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (isError) {
      if (error?.message) {
        toast.error(error?.message);
      } else if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [isError]);

  return (
    <div>
      <div className="flex justify-center items-center py-[4.1rem] bg-gradient-to-bl from-slate-900 via-slate-950 to-gray-800 h-[100vh]">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-3">
          <div className="relative px-4 py-10 bg-black md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto text-white">
              <div className="flex flex-col justify-center items-center">
                <h1 className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 inline-block text-transparent bg-clip-text font-extrabold text-3xl text-center">
                  Wiz<span className="text-white">Waves</span>
                </h1>
                <div className="w-40 h-1 rounded-xl bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 mt-2"></div>
              </div>
              <LoginForm setLoginData={setLoginData} loginData={loginData} />
              <div className="text-right mb-4">
                <a
                  href="#"
                  className="text-xs font-display font-semibold text-gray-500 hover:text-gray-400 cursor-pointer"
                >
                  Forgot Password?
                </a>
              </div>
              {/* <div className="flex justify-center items-center">
                <div className="flex justify-center items-center flex-col gap-2">
                  <button className="flex items-center justify-center py-2 px-4 md:px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-max md:w-full transition ease-in duration-200 text-center text-sm md:text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    <GoogleIcon />
                    <span className="ml-4 md:ml-8">Sign in with Google</span>
                  </button>
                  <button className="flex items-center justify-center py-2 px-4 md:px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-max md:w-full transition ease-in duration-200 text-center text-sm md:text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    <AppleIcon />
                    <span className="ml-4 md:ml-8">Sign in with Apple</span>
                  </button>
                </div>
              </div> */}
              <div className="mt-5">
                <button
                  onClick={handleLogin}
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  {isLoading ? "Please Wait..." : "Log in"}
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                <Link
                  href="/register"
                  className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                >
                  or sign up
                </Link>
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
