"use client";
import Button from "@/components/button/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import globals from "../../../../styles/globals.module.scss";
import { useEffect, useState } from "react";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
const PackSchema = z.object({
  serviceId: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantityClass: z.number(),
  duration: z.string(),
});

export default function CreatePacks() {
  const [services, setServices] = useState([]);
  const axiosAuth = useAxiosAuth();
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.token) {
      axiosAuth
        .get("services")
        .then((res) => {
          setServices(res.data.body);
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }, [session]);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<z.infer<typeof PackSchema>>();
  const packSubmit = async (data: z.infer<typeof PackSchema>) => {
    try {
      const dataPacks = data;
      //(dataPacks);
      const result = await axiosAuth.post("packs", dataPacks);
      //(result.data);
    } catch (error) {
      //(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(packSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col items-start gap-4">
          <div>
            <label>Services</label>
            <select
              id="serviceId"
              placeholder="my service"
              {...register("serviceId")} // Register the input field with react-hook-form
              className="col-span-3"
            >
              <option value={null}>--Please choose an option--</option>
              {services.map(({ name, id }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <label>Nombre del Pack</label>
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
          </div>
          <div className="relative">
            <label>Descripcion del pack</label>
            <input
              type="text"
              id="description"
              className={`${
                errors.description?.type !== "required"
                  ? globals.input
                  : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              }`}
              placeholder="Descripcion del pack"
              {...register("description", { required: true })}
              aria-invalid={errors.description ? "true" : "false"}
            />
          </div>
          <div className="relative">
            <label>Pecio del pack</label>
            <input
              type="text"
              id="price"
              className={`${
                errors.price?.type !== "required"
                  ? globals.input
                  : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              }`}
              placeholder="Precio del pack"
              {...register("price", { required: true })}
              aria-invalid={errors.price ? "true" : "false"}
            />
          </div>
          <div className="relative">
            <label>quantityclass</label>
            <input
              type="number"
              id="quantityClass"
              className={`${
                errors.quantityClass?.type !== "required"
                  ? globals.input
                  : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              }`}
              placeholder="quantityclass"
              {...register("quantityClass", { required: true })}
              aria-invalid={errors.price ? "true" : "false"}
            />
          </div>

          <label>Duracion</label>
          <select
            id="duration"
            placeholder="12345678-9"
            {...register("duration")} // Register the input field with react-hook-form
            className="col-span-3"
          >
            <option value="">--Please choose an option--</option>
            <option value="2 meses">2 meses</option>
            <option value="3 meses">3 meses</option>
            <option value="4 meses">4 meses</option>
          </select>
        </div>
      </div>
      <Button text="Crear Pack" type="submit" disabled={false} />
    </form>
  );
}
