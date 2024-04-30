"use client";
import Button from "@/components/button/Button";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import globals from "@/styles/globals.module.scss";
import styles from "@/styles/form.module.scss"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";
import DaysAvailable from "./daysAvailable/DaysAvailable";
import { DayToPush } from "./daysAvailable/DaysAvailable.types";

const ClassSchema = z.object({
  name: z.string(),
  daysAvailable: z.object({
    Monday: z.object({
      startTime: z.string(),
      endTime: z.string(),
    }),
    Tuesday: z.object({
      startTime: z.string(),
      endTime: z.string(),
    }),
    Wednesday: z.object({
      startTime: z.string(),
      endTime: z.string(),
    }),
    Thursday: z.object({
      startTime: z.string(),
      endTime: z.string(),
    }),
    Friday: z.object({
      startTime: z.string(),
      endTime: z.string(),
    }),
    Saturday: z.object({
      startTime: z.string(),
      endTime: z.string(),
    }),
    Sunday: z.object({
      startTime: z.string(),
      endTime: z.string(),
    }),
  }),
  periodicity: z.string(),
  serviceId: z.string(),
  // pilates o osteopatria
});

export default function createShift() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<z.infer<typeof ClassSchema>>();
  const [selectedDays, setSelectedDays] = useState<DayToPush[]>([]);
  const [selectedPacks, setSelectedPacks] = useState([]);
  const [packs, setPacks] = useState([]);
  const [services, setServices] = useState([]);

  const axiosAuth = useAxiosAuth();
  const { data: session } = useSession();

  // useEffect(() => {
  //   if (session?.token) {
  //     axiosAuth
  //       .get("packs")
  //       .then((res) => {
  //         setPacks(res.data.body);
  //       })
  //       .catch((err) => //(err));
  //   }
  // }, [session]);

  useEffect(() => {
    if (session?.token) {
      axiosAuth
        .get("services")
        .then((res) => {
          //(res);
          setServices(res.data.body);
        })
        .catch((err) => (
          console.log(err)
        ));
    }
  }, [session]);

  const togglePack = (pack: any) => {
    if (selectedPacks.includes(pack)) {
      setSelectedPacks(
        selectedPacks.filter((selectedPack) => selectedPack !== pack)
      );
    } else {
      setSelectedPacks([...selectedPacks, pack]);
    }
  };

  const classSubmint = async (data: z.infer<any>) => {
    try {
      let daysAvailable: { [key: string]: any } = {};
      selectedDays.forEach((day: DayToPush) => {
        const key = Object.keys(day)[0];
        //(key);
        daysAvailable[key] = {
          ...day[key],
        };
      });

      const result = await axiosAuth.post("class", { ...data, daysAvailable });
      //(result);
    } catch (error) {
      //(error);
      Swal.fire({
        title: "Error",
        text: "Peticion rechaza por favor verifique la informacion",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(classSubmint)}>
        <div>
          <label>Nombre del turno</label>
          <input
            type="text"
            id="name"
            className={`${
              errors.name?.type !== "required"
                ? globals.input
                : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            }`}
            placeholder="Nombre del pack"
            {...register("name", { required: true })}
            aria-invalid={errors.name ? "true" : "false"}
          />
          <p>*campo obligatorio</p>
        </div>
        <DaysAvailable
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
        <div className="flex gap-5">
          <label>Periodicidad del turno</label>
          <select
            id="periodicity"
            placeholder="xx minutos"
            {...register("periodicity")} // Register the input field with react-hook-form
            className="col-span-3"
          >
            <option value="">--Please choose an option--</option>
            <option value="15min">15 minutos</option>
            <option value="30min">30 minutos</option>
            <option value="60min">60 minutos</option>
          </select>
        </div>
        <div className="flex gap-5">
          <label>Servicio</label>
          <select
            id="serviceId"
            placeholder="xx minutos"
            {...register("serviceId")} // Register the input field with react-hook-form
            className="col-span-3"
          >
            <option value="">--Please choose an option--</option>
            {services.map((s) => (
              <option value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Selecciona los packs disponibles para el turno</label>
          <div className="flex flex-wrap">
            {packs.map((pack) => (
              <button
                type="button"
                key={pack.id}
                className={`rounded-md px-4 py-2 m-1 focus:outline-none ${
                  selectedPacks.includes(pack)
                    ? "bg-violet-300 border border-violet-900 text-violet-900"
                    : "bg-gray-100 border border-gray-400 hover:border-primary"
                }`}
                onClick={() => togglePack(pack.id)}
              >
                {pack.quantityclass} clases en {pack.duration}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.formPage__button_box}>
          <Button text="Crear Clase" type="submit" disabled={false} />
        </div>
      </form>
    </div>
  );
}

// const days = [
//   "Lunes",
//   "Martes",
//   "Miércoles",
//   "Jueves",
//   "Viernes",
//   "Sábado",
//   "Domingo",
// ];
// const hours = [
//   "08:00",
//   "09:00",
//   "10:00",
//   "11:00",
//   "12:00",
//   "13:00",
//   "14:00",
//   "15:00",
//   "16:00",
//   "17:00",
//   "18:00",
//   "19:00",
//   "20:00",
//   "21:00",
//   "22:00",
//   "23:00",
//   "00:00",
// ];
// const packs = ['Clase suelta', '4 clases al mes', '8 clases al mes', '12 clases al mes']
