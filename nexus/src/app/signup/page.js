"use client";

import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrimaryButton from "../../components/Button/PrimaryButton";
import TextInput from "../../components/Input/TextInput";
import PrimaryLogo from "../../assets/logo.svg";
import useSignup from "../../components/hooks/Auth/useSignup";

export default function Page() {
  const {
    usernameError,
    emailError,
    passwordError,
    isLoading,
    formSubmitHandler,
  } = useSignup();

  return (
    <form className="flex h-screen items-center" onSubmit={formSubmitHandler}>
      <main className="w-full max-w-[95%] 3xl:max-w-[85%] mx-auto px-0 grid grid-cols-12 items-center justify-center h-full">
        <div className="col-span-12 md:col-span-6 md:col-start-4">
          <div className="w-fit mx-auto mt-10">
            <Image
              src={PrimaryLogo}
              alt="nexus"
              width={150}
              height={150}
              className="object-cover mb-5"
            />
          </div>
          <div className="mt-1 bg-white rounded-xl dark:bg-gray-800 dark:border-gray-700 max-w-xl mx-auto">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Get Started With nexus &#128293;
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    className="text-primary decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="/login"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>

              <div className="mt-5">
                <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                  Or
                </div>

                <section>
                  <div className="grid gap-y-4">
                    <TextInput
                      label="Username"
                      //   value={email}
                      //   setValue={setEmail}
                      placeholder="Username"
                      type="text"
                      name="username"
                      errorText={usernameError}
                      isRequired={true}
                    />
                    <TextInput
                      label="Email address"
                      //   value={email}
                      //   setValue={setEmail}
                      placeholder="Email address"
                      type="email"
                      name="email"
                      errorText={emailError}
                      isRequired={true}
                    />

                    <TextInput
                      label="Password"
                      //   value={password}
                      //   setValue={setPassword}
                      placeholder="Password"
                      type="password"
                      name="password"
                      errorText={passwordError}
                      isRequired={true}
                    />

                    <TextInput
                      label="Confirm Password"
                      //   value={confirmPassword}
                      //   setValue={setConfirmPassword}
                      placeholder="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      errorText=""
                      isRequired={true}
                    />

                    <PrimaryButton type="submit" isLoading={isLoading}>
                      Sign up
                    </PrimaryButton>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </form>
  );
}
