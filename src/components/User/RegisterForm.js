"use client";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const RegisterForm = ({
  setRegisterData,
  validations,
  registerData,
  setValidations,
}) => {
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleInput = (e) => {
    if (validations?.username) {
      if (registerData?.username.length >= 5) {
        setValidations((prev) => ({
          ...prev,
          username: "",
        }));
      }
    }

    if (validations?.email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (emailPattern.test(registerData?.email)) {
        setValidations((prev) => ({ ...prev, email: "" }));
      }
    }

    if (validations?.password) {
      if (registerData?.password?.length >= 8) {
        setValidations((prev) => ({ ...prev, password: "" }));
      }
    }

    if (validations?.confirmPassword) {
      if (registerData?.password === registerData.confirmPassword) {
        setValidations((prev) => ({ ...prev, confirmPassword: "" }));
      }
    }

    const { name, value } = e.target;
    setRegisterData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <>
      <div className="mt-5">
        <div className="mb-5">
          <label
            htmlFor="username"
            className="font-semibold text-sm text-gray-400 pb-1 block"
          >
            Name
          </label>
          <input
            id="username"
            type="text"
            name="username"
            onChange={handleInput}
            className="border rounded-lg px-3 py-2 mt-1  text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500"
          />
          <div>
            {validations.username && (
              <p className="text-xs text-red-300">{validations.username}</p>
            )}
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="font-semibold text-sm text-gray-400 pb-1 block"
          >
            E-mail
          </label>
          <input
            id="email"
            type="text"
            name="email"
            onChange={handleInput}
            className="border rounded-lg px-3 py-2 mt-1 text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500"
          />
          <div>
            {validations.email && (
              <p className="text-xs text-red-300">{validations.email}</p>
            )}
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="font-semibold text-sm text-gray-400 pb-1 block"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={isShowPassword ? "text" : "password"}
              name="password"
              onChange={handleInput}
              className="border rounded-lg px-3 py-2 mt-1 text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500"
            />
            <div
              onClick={() => setIsShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-slate-200"
            >
              <FontAwesomeIcon icon={isShowPassword ? faEyeSlash : faEye} />
            </div>
          </div>
          <div>
            {validations.password && (
              <p className="text-xs text-red-300">{validations.password}</p>
            )}
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="confirmPassword"
            className="font-semibold text-sm text-gray-400 pb-1 block"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={isShowConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={handleInput}
              className="border rounded-lg px-3 py-2 mt-1 text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500"
            />
            <div
              onClick={() => setIsShowConfirmPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-slate-200"
            >
              <FontAwesomeIcon
                icon={isShowConfirmPassword ? faEyeSlash : faEye}
              />
            </div>
          </div>
          <div>
            {validations.confirmPassword && (
              <p className="text-xs text-red-300">
                {validations.confirmPassword}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
