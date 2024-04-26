"use client"
import PackCard from "./components/PackCard";
//import { getPacks } from "@/libs/packs";
import { useEffect, useState } from "react";
import axios from "axios";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import LoadingLayout from "@/components/LoadingLayout/LoadingLayout";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";


export default function PacksPage() {
  const router = useRouter()
  const pathname = usePathname();
  const segments = pathname.split('/');
  const tenant = segments[1]
  console.log(tenant);


  const useAxios = useAxiosAuth()
  const [packs, setPacks] = useState([])
  const [services, setServices] = useState([])
  const { data: session } = useSession();
console.log(session);
const username = session?.userData?.name;


  //funcion de prueba
  useEffect(() => {
    if (session?.token) {
      useAxios
        .get("packs")
        .then((res) => {

          setPacks(res.data.body);
        })
        .catch((err) => console.log(err));
    }
  }, [session]);
  //

  useEffect(() => {
    if (session?.token) {
      useAxios
        .get("services")
        .then((res) => {
          setServices(res.data.body);
        })
        .catch((err) => console.log(err));
    }
  }, [session]);

  console.log(services);

  return (
    <div>
      <h1 className="w-96 text-gray-800 text-4xl font-medium font-['Rubik'] leading-10 pb-10 whitespace-nowrap">Hola👋, {username}!</h1>
      <p>Elige el servicio que quieres agendar</p>

      <div>
        
      </div>
    </div>
  )
}