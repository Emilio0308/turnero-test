"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import NavBarAdmin from "./admin/NavBarAdmin";
import NavbarUser from "./NavbarUser";
import LoadingLayout from "./LoadingLayout/LoadingLayout"; // Importa tu componente de carga

export default function Navbar() {
    const { data: session, status } = useSession();
    const isTenant = session?.userData?.role === "tenant";

console.log(session);

    
    if (status === "loading") {
      
        return <LoadingLayout />;
    }

 
    return isTenant ? <NavBarAdmin /> : <NavbarUser />;
}
