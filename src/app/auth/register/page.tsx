"use client";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

import Button from "@/components/button/Button";
import styles from "../../../styles/form.module.scss";
import globals from "../../../styles/globals.module.scss";
import Title from "@/components/title/Title";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });
  const router = useRouter();
  const showPassword = () => {
    setVisiblePassword(!visiblePassword);
  };
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (data.password !== data.password2) {
        Swal.fire({
          title: "Error",
          text: "Las contraseñas deben coincidir",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return; // Detener la ejecución si las contraseñas no coinciden
      }

      const userNew = {
        ...data,
        lastname: data.lastName,
        permissions: [1],
        packs: [1],
        shifts: [1],
      };

      console.log(data)
      // const res = await axios.post("/api/auth/users/register", userNew);
      const res = await axios.post(
        "https://xuhwe49mk9.execute-api.us-east-2.amazonaws.com/api/auth/users/register",
        userNew
      );

      if (res.status === 200) {
        Swal.fire({
          title: "¡Registro exitoso!",
          text: "Tu usuario se ha creado satisfactoriamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        router.push("/auth/login");
        router.refresh();
      }
    } catch (error) {
      console.log(error)
      const err = error as AxiosError;
      let title = "Error desconocido";
      let text = err.message;

      if (err.response) {
        if (err.response.status === 400) {
          title = (err.response.data as Error).message;
          text = "Tu usuario ya está registrado";
        }
      } else if (err.request) {
        title = "No se recibió respuesta del servidor";
        text = err.request;
      }

      Swal.fire({
        title,
        text,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  });

  return (
    <div className={styles.formPage}>
      <div className={styles.formPage__logo_box}>
        <div className={styles.formPage__logo}></div>
      </div>
      <div className={styles.formPage__form}>
        <Title text="Crear cuenta" />
        <span className={styles.formPage__subtitle}>
          Regístrate y toma el control de tus turnos.
        </span>
        <form name="registerForm" className="max-w-sm" onSubmit={onSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className={`block mb-2 text-sm font-medium  ${
                errors.name?.type === "required"
                  ? " text-red-700 dark:text-red-500"
                  : ""
              }`}
            >
              Nombre
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                className={`${
                  errors.name?.type !== "required"
                    ? globals.input
                    : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                }`}
                placeholder="Nombre"
                {...register("name", { required: true })}
                aria-invalid={errors.name ? "true" : "false"}
              />
            </div>
            {errors.name?.type === "required" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                * Campo requerido.
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="lastName"
              className={`block mb-2 text-sm font-medium  ${
                errors.lastName?.type === "required"
                  ? " text-red-700 dark:text-red-500"
                  : ""
              }`}
            >
              Apellido
            </label>
            <div className="relative">
              <input
                type="text"
                id="lastName"
                className={`${
                  errors.lastName?.type !== "required"
                    ? globals.input
                    : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                }`}
                placeholder="Apellido"
                {...register("lastName", { required: true })}
                aria-invalid={errors.lastName ? "true" : "false"}
              />
            </div>
            {errors.lastName?.type === "required" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                * Campo requerido.
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className={`block mb-2 text-sm font-medium ${
                errors.email?.type === "required"
                  ? "text-red-700 dark:text-red-500"
                  : ""
              }`}
            >
              Correo Electrónico
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                className={`${
                  errors.email?.type !== "required"
                    ? globals.input
                    : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                }`}
                placeholder="Correo electrónico"
                {...register("email", {
                  required: "Campo requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Dirección de correo electrónico no válida",
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                * Campo requerido.
              </p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.email.message?.toString()}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className={`block mb-2 text-sm font-medium  ${
                errors.password?.type === "required"
                  ? " text-red-700 dark:text-red-500"
                  : ""
              }`}
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type={visiblePassword ? "text" : "password"}
                id="password"
                className={`${
                  errors.password?.type !== "required"
                    ? globals.input
                    : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                }`}
                placeholder="Contraseña"
                {...register("password", { required: true })}
                aria-invalid={errors.password ? "true" : "false"}
              />
              <div
                className="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer"
                onClick={showPassword}
              >
                {visiblePassword ? (
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m4 15.6 3-3V12a5 5 0 0 1 5-5h.5l1.8-1.7A9 9 0 0 0 12 5C6.6 5 2 10.3 2 12c.3 1.4 1 2.7 2 3.6Z" />
                    <path d="m14.7 10.7 5-5a1 1 0 1 0-1.4-1.4l-5 5A3 3 0 0 0 9 12.7l.2.6-5 5a1 1 0 1 0 1.4 1.4l5-5 .6.2a3 3 0 0 0 3.6-3.6 3 3 0 0 0-.2-.6Z" />
                    <path d="M19.8 8.6 17 11.5a5 5 0 0 1-5.6 5.5l-1.7 1.8 2.3.2c6.5 0 10-5.2 10-7 0-1.2-1.6-2.9-2.2-3.4Z" />
                  </svg>
                )}
              </div>
            </div>
            {errors.password?.type === "required" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                * Campo requerido.
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password2"
              className={`block mb-2 text-sm font-medium  ${
                errors.password2?.type === "required"
                  ? " text-red-700 dark:text-red-500"
                  : ""
              }`}
            >
              Repite la contraseña
            </label>
            <div className="relative">
              <input
                type={visiblePassword ? "text" : "password"}
                id="password2"
                className={`${
                  errors.password2?.type !== "required"
                    ? globals.input
                    : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                }`}
                placeholder="Repite la contraseña"
                {...register("password2", { required: true })}
                aria-invalid={errors.password2 ? "true" : "false"}
              />
              <div
                className="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer"
                onClick={showPassword}
              >
                {visiblePassword ? (
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m4 15.6 3-3V12a5 5 0 0 1 5-5h.5l1.8-1.7A9 9 0 0 0 12 5C6.6 5 2 10.3 2 12c.3 1.4 1 2.7 2 3.6Z" />
                    <path d="m14.7 10.7 5-5a1 1 0 1 0-1.4-1.4l-5 5A3 3 0 0 0 9 12.7l.2.6-5 5a1 1 0 1 0 1.4 1.4l5-5 .6.2a3 3 0 0 0 3.6-3.6 3 3 0 0 0-.2-.6Z" />
                    <path d="M19.8 8.6 17 11.5a5 5 0 0 1-5.6 5.5l-1.7 1.8 2.3.2c6.5 0 10-5.2 10-7 0-1.2-1.6-2.9-2.2-3.4Z" />
                  </svg>
                )}
              </div>
            </div>
            {errors.password2?.type === "required" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                * Campo requerido.
              </p>
            )}
          </div>
          <div className={styles.formPage__button_box}>
            <Button text="Registrarme" type="submit" disabled={false} />
          </div>
        </form>
        <div className={styles.formPage__account_box}>
          <Link href="/auth/login">
            <div className={styles.formPage__with_account}>
              ¿Ya tienes cuenta?
            </div>

            <div className={styles.formPage__login}>Iniciar sesión</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
