"use client";
import { getCompanies } from "@/libs/company";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "../../../../styles/form.module.scss";
import globals from "../../../../styles/globals.module.scss";
import Title from "@/components/title/Title";
import Button from "@/components/button/Button";
import Link from "next/link";
export default function Inicio() {
  const { data: session } = useSession();
  const username = session?.userData?.name;
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCompanies();

        setCompanies(response.body);
      } catch (error) {
        console.error("Error al obtener empresas:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="w-96 text-gray-800 text-4xl font-medium font-['Rubik'] leading-10 pb-10 whitespace-nowrap">
        Hola👋, {username}
      </h1>
      <span className={styles.formPage__subtitle}>
        Crea nuevas empresas y administra las registradas.
      </span>

      <div className="mt-10 space-x-20">
        <span className="text-2xl font-medium font-rubik text-left">
          Empresas registradas
        </span>
        <div className="flex mt-10 space-x-20 justify-center">
          {companies.map((company) => (
            <div
              className="flex border rounded-xl border-solid border-gray-200 p-5"
              key={company.id}
            >
              <h2>{company.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className={styles.formPage__button_box}>
          <Link href="CreateCompany">
            <Button
              text="Crear nueva empresa"
              disabled={false}
              type={"button"}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
