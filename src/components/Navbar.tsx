import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import SignOutButton from "./SignOutButton";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  
  return (
    <nav className="Navbar h-12 justify-start items-center inline-flex w-full max-w-screen-2xl py-0 mx-auto flex-col md:flex-row mb-40">
      <Link className="Logo justify-start items-center gap-3 flex" href={""}>
        <div className="Flowbite">
          <span className="text-alabaster-700 text-2xl font-semibold font-['Rubik'] leading-loose">
            Pilates |{" "}
          </span>
          <span className="text-slate-700 text-2xl font-light font-['Rubik'] leading-loose">
            Agendar turno
          </span>
        </div>
      </Link>
      <div className="NavLinks grow shrink basis-0 h-6 justify-start items-center gap-8 flex">
        <Link
          href="/packs"
          className="Link flex-col justify-center items-start inline-flex"
        >
          <p className="text-alabaster-900 text-center hover:text-primary-800 px-3 py-2 text-base font-medium font-['Rubik'] leading-normal">
            Inicio
          </p>
        </Link>

        <Link
          href="/shifts"
          className="Link flex-col justify-center items-start inline-flex"
        >
          <div className="text-alabaster-900 text-center hover:text-primary-800 px-3 py-2 font-medium font-['Rubik'] leading-normal">
            Turnos
          </div>
        </Link>
        <Link
          href="/profile"
          className="Link flex-col justify-center items-start inline-flex"
        >
          <div className="text-alabaster-900 text-center hover:text-primary-800 px-3 py-2 text-base font-medium font-['Rubik'] leading-normal">
            Perfil
          </div>
        </Link>
        {session?.user ? <SignOutButton /> : ""}
      </div>
    </nav>
  );
};

export default Navbar;
