"use client";
import { z } from "zod";

import styles from "../../../../styles/form.module.scss";
import globals from "../../../../styles/globals.module.scss";
import { useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { errorUtil } from "zod/lib/helpers/errorUtil";
import Swal from "sweetalert2";

export default function createService() {
  const axiosAuth = useAxiosAuth();
  const ServiceShema = z.object({
    name: z.string(),
    type: z.string(),
    duration: z.string(),
    capacity: z.number(),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<z.infer<typeof ServiceShema>>();
  const serviceSubmit = async (data: z.infer<typeof ServiceShema>) => {
    try {
      console.log(data);
      const result = await axiosAuth.post("services", data);
      console.log(result.data);
    } catch (error) {
        console.log(error)
        Swal.fire({
          title: "Error",
          text: "Peticion rechaza por favor verifique la informacion",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(serviceSubmit)}>
        <div className="relative">
          <label>Nombre del servicio</label>
          <input
            type="text"
            id="name"
            className={`${
              errors.name?.type !== "required"
                ? globals.input
                : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            }`}
            placeholder="Nombre del servicio"
            {...register("name", { required: true })}
            aria-invalid={errors.name ? "true" : "false"}
          />
        </div>
        <div className="relative">
          <label>tipo del servicio</label>
          <input
            type="text"
            id="type"
            className={`${
              errors.name?.type !== "required"
                ? globals.input
                : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            }`}
            placeholder="tipo del servicio"
            {...register("type", { required: true })}
            aria-invalid={errors.name ? "true" : "false"}
          />
        </div>
        <div className="relative">
          <label>duracion del servicio</label>
          <input
            type="text"
            id="duration"
            className={`${
              errors.name?.type !== "required"
                ? globals.input
                : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            }`}
            placeholder="Duracion del servicio"
            {...register("duration", { required: true })}
            aria-invalid={errors.name ? "true" : "false"}
          />
        </div>
        <div className="relative">
          <label>Capacidad del servicio</label>
          <input
            type="number"
            id="capacity"
            className={`${
              errors.name?.type !== "required"
                ? globals.input
                : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            }`}
            placeholder="Capacidad del servicio"
            {...register("capacity", { required: true })}
            aria-invalid={errors.name ? "true" : "false"}
          />
        </div>
        <Button text="Crear service" type="submit" disabled={false} />
      </form>
    </section>
  );
}
