"use client";
import Link from "next/link";
import SignOutButton from "../SignOutButton";
import { useSession } from "next-auth/react";
import logo from "../../../assets/img/turnex-primary.png"
export default function NavBarAdmin() {


  return(
<div className="flex">

    <nav className="Navbar h-12 justify-start items-center inline-flex w-full max-w-screen-2xl py-0 mx-auto flex-col md:flex-row mb-20">
       <Link href={""}>
                <img src={logo.src} alt="Turnex Logo" className="pr-10" />
               
        </Link>
      <div className="NavLinks grow shrink basis-0 h-6 justify-start items-center gap-8 flex">
        <Link
          href="/admin/admin/inicio"
          className="Link flex-col justify-center items-start inline-flex"
        >
          <p className="text-alabaster-900 text-center hover:text-primary-800 px-3 py-2 text-base font-medium font-['Rubik'] leading-normal">
            Inicio
          </p>
        </Link>
         <Link
          href="/admin/admin/empresas"
          className="Link flex-col justify-center items-start inline-flex"
          >
          <p className="text-alabaster-900 text-center hover:text-primary-800 px-3 py-2 text-base font-medium font-['Rubik'] leading-normal">
            Empresas
          </p>
        </Link>
        
  
  

      </div>
    </nav>
    <div className="flex justify-end">

<SignOutButton /> 
</div>
          </div>
  );
};

