"use client";

import { useState } from "react";

import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idToekn, setIdToekn] = useState("");

  const handleLogin = () => {
    setLoading(true);
    let payload = JSON.stringify({
      email: email,
      password: password,
    });
    setTimeout(() => {
      fetch("https://noteapi-3xb0.onrender.com/login", {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if (!response.token) {
            throw new Error(response);
          }
          setIdToekn(response.token);

          localStorage.setItem("id_token", JSON.stringify(response.token));
          localStorage.setItem("user", JSON.stringify(response.user));

          router.push("/dashboard");
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  };
  if (Loading) {
    return <main>authenticating.......</main>;
  }
  return (
    // <main
    //   style={{
    //     height: "100vh",
    //     width: "100vw",
    //     display: "flex",
    //     flexDirection: "column",
    //     padding: "20px",
    //     paddingTop: "20vh",
    //     alignItems: "center",
    //     gap: "10px",
    //   }}
    // >
    //   <h2>Login</h2>
    //   <input
    //     style={{
    //       width: "clamp(200px,50%,45%)",
    //       padding: "20px",
    //     }}
    //     type="email"
    //     name="email"
    //     id="email"
    //     placeholder="Email"
    //     required
    //     onChange={(e) => {
    //       setEmail(e.target.value);
    //     }}
    //   />
    //   <input
    //     style={{
    //       width: "clamp(200px,50%,45%)",
    //       padding: "20px",
    //     }}
    //     type="password"
    //     name="password"
    //     id="password"
    //     placeholder="Password"
    //     required
    //     onChange={(e) => {
    //       setPassword(e.target.value);
    //     }}
    //   />
    //   <button
    //     style={{
    //       width: "clamp(200px,50%,45%)",
    //       padding: "20px",
    //       backgroundColor: "rgba(122,255,255,0.7)",
    //     }}
    //     onClick={handleLogin}
    //   >
    //     login
    //   </button>
    //   <h3>{idToekn}</h3>
    // </main>
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          {/* <Image
            height={20}
            width={20}
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          /> */}
          Notes App
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-black bg-slate-100 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleLogin}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <span className="text-blue-200 font-bold ml-2">
                  <Link href="/signup">Sign up</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
