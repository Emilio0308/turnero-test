"use client"
import React from "react";
import { createPacks as CreatePackModule } from "../../../../libs/packs"
import { z } from "zod";
import styles from "../../../../styles/form.module.scss";
import globals from "../../../../styles/globals.module.scss";
import { useForm } from 'react-hook-form';
import Button from "@/components/button/Button";
const PackSchema = z.object({
    serviceId: z.string(),
    name: z.string(),
    descriptcion: z.string(),
    price: z.number(),
    quantityclass: z.number(),
})

export default async function createPacks() {


    const { handleSubmit, formState: { errors }, register } = useForm<z.infer<typeof PackSchema>>();
    const packSubmit = async (data: z.infer<typeof PackSchema>) => {
        try {
            const dataPacks = data
            console.log(dataPacks);
            const result = await CreatePackModule(dataPacks)
            console.log(result.data);

        } catch (error) {

        }
    }

    return (

        <form onSubmit={handleSubmit(packSubmit)}>
            <div className="grid gap-4 py-4">
                <div className="flex flex-col items-start gap-4">
                <div className="relative">
                        <label>Nombre del Pack</label>
                        <input
                            type="text"
                            id="name"
                            className={`${errors.name?.type !== "required"
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
                            className={`${errors.description?.type !== "required"
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
                            className={`${errors.price?.type !== "required"
                                    ? globals.input
                                    : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                                }`}
                            placeholder="Precio del pack"
                            {...register("price", { required: true })}
                            aria-invalid={errors.price ? "true" : "false"}
                        />
                    </div>
                    <div className="relative">
                        <label>Pecio del pack</label>
                        <input
                            type="text"
                            id="price"
                            className={`${errors.price?.type !== "required"
                                    ? globals.input
                                    : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                                }`}
                            placeholder="Precio del pack"
                            {...register("price", { required: true })}
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
                        <option value="ars">Pesos Argentinos</option>
                        <option value="usd">Dolares</option>


                    </select>

               
                </div>


            </div>
            <Button text="Crear Pack" type="submit" disabled={false} />
        </form>
    )
}