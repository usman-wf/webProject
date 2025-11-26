"use client";

// import Login from "../../components/Auth/Login";

// export default function Page() {
//   return <Login />;
// }

import Image from "next/image";
import Link from "next/link";

import PrimaryLogo from "../../assets/logo.svg";
import PrimaryButton from "../../components/Button/PrimaryButton";
import TextInput from "../../components/Input/TextInput";
import useLogin from "../../components/hooks/Auth/useLogin";

export default function Page() {
  const { usernameError, passwordError, isLoading, formSubmitHandler } =
    useLogin();

  return (
    <form
      className="flex min-h-screen items-center py-16"
      onSubmit={formSubmitHandler}
    >
      <main className="w-full max-w-xl mx-auto p-6">
        <div className="w-fit mx-auto">
          <Image
            src={PrimaryLogo}
            alt="nexus"
            width={150}
            height={150}
            className=""
          />
        </div>
        <div className="mt-1 border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Log in
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account yet?{" "}
                <Link
                  className="text-primary decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="/signup"
                >
                  Sign up here
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
                    // value={"email"}
                    // setValue={setEmail}
                    type="text"
                    label="Username"
                    placeholder="Username"
                    name="username"
                    errorText={usernameError}
                    isRequired={true}
                  />

                  <TextInput
                    // value={"password"}
                    // setValue={setPassword}
                    type="password"
                    label="Password"
                    placeholder="Password"
                    name="password"
                    errorText={passwordError}
                    isRequired={true}
                  />

                  <PrimaryButton type="submit" isLoading={isLoading}>
                    Sign in
                  </PrimaryButton>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </form>
  );
}
