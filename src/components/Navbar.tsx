'use client'
import { useSession } from "next-auth/react";
import NavBarAdmin from "./admin/NavBarAdmin";
import NavbarUser from "./NavbarUser";

export default function Navbar() {
    const { data: session, status } = useSession();

    const isTenant = session?.userData?.role === "tenant";

    return (
        <>
            {isTenant ? <NavBarAdmin /> : <NavbarUser />}
        </>
    );
}
