"use client";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PackCard from "../components/packCard/PackCard";

export default function page() {
  const useAxios = useAxiosAuth();
  const { data: session } = useSession();
  const params = useParams();
  const serviceId = params.serviceId as string;
  const [list, setList] = useState([]);

  useEffect(() => {
    if (session?.token) {
      useAxios
        .get(`packs?serviceId=${serviceId}`)
        .then((res) => {
          const listPacks = res.data.body;
          setList(listPacks);
        })
        .catch((err) => console.log(err));
    }
  }, [session]);

  return (
    <section>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(192px,_1fr))] gap-[25px]">
        {list.map((pack) => (
          <PackCard key={pack.id} pack={pack} />
        ))}
      </div>
    </section>
  );
}
