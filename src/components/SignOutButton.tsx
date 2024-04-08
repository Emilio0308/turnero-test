"use client";
import { getSession, signOut } from "next-auth/react";

const SignOutButton = () => {
  // (async () => {
  //   const session = await getSession();
  //   console.log('singout',session?.userData);
  // })();

  return (
    <button
      className="Button w-36 h-12 px-5 py-3 bg-alabaster-100 hover:bg-alabaster-200 rounded-lg justify-center items-center gap-2 inline-flex cursor-pointer"
      onClick={() => {
        signOut({
          redirect: true,
          callbackUrl: "/auth/login",
        });
      }}
    >
      <span className="Text text-alabaster-800 text-base font-medium font-['Rubik'] leading-normal">
        Cerrar sesión
      </span>
    </button>
  );
};

export default SignOutButton;
