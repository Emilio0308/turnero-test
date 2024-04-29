"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { getCompanies, createCompanyDb } from "@/libs/company"
import globals from "@/styles/globals.module.scss";
import styles from "@/styles/form.module.scss"
import Button from "@/components/button/Button";

const CompanySchema = z.object({
    DBInstanceClass: z.string(),
    DBName: z.string(),
    cuit: z.string(),
    telefono: z.string(),
    address: z.string(),
    services: z.string(),
});



export default function createCompany() {
    const [formData, setFormData] = useState({});

    const { handleSubmit, formState: { errors }, register } = useForm<z.infer<typeof CompanySchema>>();
    const updatedFormData = { ...formData, DBInstanceClass: 'db.t3.micro' };
    const onSubmit = async (formData: any) => {
        console.log(updatedFormData);
        try {
            await createCompanyDb(updatedFormData);
            console.log("Empresa creada exitosamente");
            // Aquí podrías redirigir a otra página o mostrar un mensaje de éxito
        } catch (error) {
            console.error("Error al crear empresa:", error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className="grid grid-cols-3 gap-4">

                    <div>
                        <label>Nombre de la Empresas</label>
                        <input
                            type="text"
                            id="DBName"
                            className={`${errors.DBName?.type !== "required"
                                ? globals.input
                                : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                                }`}
                            placeholder="Ingresa el nombre de la empresa"
                            {...register("DBName", { required: true })}
                            aria-invalid={errors.DBName ? "true" : "false"}
                        />
                        <span className={styles.formPage__subtitle}>
                            *campo obligatorio
                        </span>
                    </div>
                    <div>
                        <label>CUIT de la empresa</label>
                        <input
                            type="text"
                            id="cuit"
                            className={`${errors.cuit?.type !== "required"
                                ? globals.input
                                : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                                }`}
                            placeholder="Ingresa el CUIT de la empresa"
                            {...register("cuit", { required: true })}
                            aria-invalid={errors.cuit ? "true" : "false"}
                        />
                        <span className={styles.formPage__subtitle}>
                            *campo obligatorio
                        </span>
                    </div>
                    <div>
                        <label>Teléfono</label>
                        <input
                            type="text"
                            id="telefono"
                            className={`${errors.telefono?.type !== "required"
                                ? globals.input
                                : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                                }`}
                            placeholder="Ingresa el N° telefónico de la empresa"
                            {...register("telefono", { required: true })}
                            aria-invalid={errors.telefono ? "true" : "false"}
                        />
                        <span className={styles.formPage__subtitle}>
                            *campo obligatorio
                        </span>

                    </div>
                    <div>
                        <label>Domicilio</label>
                        <input
                            type="text"
                            id="address"
                            className={`${errors.address?.type !== "required"
                                ? globals.input
                                : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                                }`}
                            placeholder="Ingresa la dirección de la empresa"
                            {...register("address", { required: true })}
                            aria-invalid={errors.address ? "true" : "false"}
                        />
                        <span className={styles.formPage__subtitle}>
                            *campo obligatorio
                        </span>
                    </div>
                    <div>
                        <label>Servicio que ofrece</label>
                        <input
                            type="text"
                            id="services"
                            className={`${errors.services?.type !== "required"
                                ? globals.input
                                : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                                }`}
                            placeholder="Ingresa el servicio que ofrece la empresa"
                            {...register("services", { required: true })}
                            aria-invalid={errors.services ? "true" : "false"}
                        />
                        <span className={styles.formPage__subtitle}>
                            *campo obligatorio
                        </span>
                    </div>
                </div>
                <div className="flex justify-center">

                <div className={styles.formPage__button_box}>
                    <Button text="Crear nueva empresa" disabled={false} type="submit" />
                    </div >
                </div>

                </div>
        </form>
    </div>)
}