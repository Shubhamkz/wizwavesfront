"use client";

import React, { useEffect, useState } from "react";
import GoogleIcon from "../ui/GoogleIcon";
// import AppleIcon from "../ui/AppleIcon";
import { useUserRegisterMutation } from "@/redux/features/userAuth/authEndpoints";
import { useDispatch } from "react-redux";
import { login } from "@/redux/features/userAuth/authSlice";
import { useRouter } from "next/navigation";
import { scrollToTop } from "@/utils/Helper";
import toast from "react-hot-toast";
import RegisterForm from "./RegisterForm";

const inititalState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [registerApi, { isLoading, isSuccess, isError, error }] =
    useUserRegisterMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [validations, setValidations] = useState(inititalState);
  const [registerData, setRegisterData] = useState(inititalState);

  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = registerData;

    // Temporary object to collect validation errors
    let tempValidations = { ...inititalState };

    if (username.length < 5) {
      tempValidations.username = "Username must be at least 5 characters";
    }

    // Email validation (basic pattern check)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      tempValidations.email = "Please enter a valid email address";
    }

    // Password validation (min 8 characters)
    if (password.length < 8) {
      tempValidations.password = "Password must be at least 8 characters";
    }

    // Confirm password validation (check if match)
    if (password !== confirmPassword) {
      tempValidations.confirmPassword = "Passwords do not match";
    }

    // Set all validations at once
    setValidations(tempValidations);

    // If any validations failed, stop execution
    if (Object.values(tempValidations).some((val) => val !== "")) {
      return;
    }

    // Proceed with registration if all validations passed
    try {
      const res = await registerApi({
        username,
        email,
        password,
      }).unwrap();

      if (res?.success) {
        toast.success("You are Registered successfully");
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
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
      scrollToTop();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (error.message) {
        toast.error(error.message);
      } else if (error?.data.message) {
        toast.error(error?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [isError]);

  return (
    <div>
      <div className="flex justify-center items-center py-[2rem] md:py-[4.1rem] bg-gradient-to-bl from-slate-900 via-slate-950 to-gray-800">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4">
          <div className="relative px-4 py-10 bg-black  md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto text-white">
              <div className="flex flex-col justify-center items-center">
                <h1 className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 inline-block text-transparent bg-clip-text font-extrabold text-3xl text-center">
                  Wiz<span className="text-white">Waves</span>
                </h1>
                <div className="w-40 h-1 rounded-xl bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 mt-2"></div>
              </div>

              <div className="flex justify-center items-center py-8">
                <div>
                  <button className="flex items-center justify-center py-2 px-4 md:px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-max md:w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    <GoogleIcon />
                    <span className="ml-8">Sign in with Google</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                <a
                  href="#"
                  className="text-xs text-gray-500 uppercase dark:text-gray-400 "
                >
                  Register Here
                </a>
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              </div>

              <RegisterForm
                setRegisterData={setRegisterData}
                registerData={registerData}
                validations={validations}
                setValidations={setValidations}
              />
              <div className="text-right mb-4">
                <a
                  href="#"
                  className="text-xs font-display font-semibold text-gray-500 hover:text-gray-400 cursor-pointer"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="mt-5">
                <button
                  onClick={handleRegister}
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  {isLoading ? "Please Wait..." : "Register"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
