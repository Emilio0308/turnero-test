"use client";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ServiceCard from "./components/ServiceCard/ServiceCard";
import { FadeLoader } from "react-spinners";

export default function PacksPage() {
  const useAxios = useAxiosAuth();
  const [services, setServices] = useState([]);
  const { data: session } = useSession();
  const username = session?.userData?.name;
  useEffect(() => {
    console.log(session)
    if (session?.token) {
      useAxios
        .get("services")
        .then((res) => {
          setServices(res.data.body);
        })
        .catch((err) => console.log(err));
    }
  }, [session]);

  return (
    <div>
      <h1 className="w-96 text-gray-800 text-4xl font-medium font-['Rubik'] leading-10 pb-10 whitespace-nowrap">
        Hola👋, {username}!
      </h1>
      <div></div>
      <p className="mb-[60px]">Elige el servicio que quieres agendar</p>
      <section className="grid grid-cols-[repeat(auto-fill,_minmax(192px,_1fr))] gap-[25px]">
        {services ? (
          services.map((service) => <ServiceCard service={service} />)
        ) : (
          <FadeLoader color="#5F3CAA" />
        )}
      </section>
    </div>
  );
}
