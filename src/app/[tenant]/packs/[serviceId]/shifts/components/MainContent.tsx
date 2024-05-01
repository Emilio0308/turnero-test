"use client";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ClassDescription from "./ClassDescription";

const MainContent = () => {
  const { data: session } = useSession();
  const useAxios = useAxiosAuth();
  const [classData, setClassData] = useState([]);
  const [currentClassData, setCurrentClassData] = useState(null);

  useEffect(() => {
    if (session?.token) {
      useAxios
        .get("class")
        .then((res) => {
          setClassData(res.data.body);
        })
        .catch((err) => console.log(err));
    }
  }, [session]);

  return (
    <div>
      <section className="grid grid-cols-[repeat(auto-fill,_minmax(192px,_1fr))] gap-[25px]">
        {classData.map((data) => (
          <div
            className="bg-alabaster-100 bg-opacity-100 capitalize px-4 py-8 rounded-2xl h-[120px] flex justify-center items-center font-medium tracking-widest flex-col"
            onClick={() => setCurrentClassData(data)}
            key={data.id}
          >
            <span>{data.name}</span>
            <span>{data.periodicity}</span>
          </div>
        ))}
      </section>

      <article>
        {currentClassData && <ClassDescription data={currentClassData} />}
      </article>
    </div>
  );
};

export default MainContent;
