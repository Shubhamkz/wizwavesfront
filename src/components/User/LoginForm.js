"use client";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const LoginForm = ({ setLoginData }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <>
      <div className="mt-5">
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
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500"
        />
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
        </div>
      </div>
    </>
  );
};

export default LoginForm;
