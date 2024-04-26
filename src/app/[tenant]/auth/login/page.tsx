"use client"
import { usePathname } from 'next/navigation'
import Button from "@/components/button/Button";
import Title from "@/components/title/Title";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import styles from "@/styles/form.module.scss";
import globals from "@/styles/globals.module.scss";
import { FcGoogle } from "react-icons/fc";
import { FadeLoader } from "react-spinners";
import LoadingLayout from "@/components/LoadingLayout/LoadingLayout";
export default function Login() {

  const [isLoading, setIsLoading] = useState(false)

  const pathname = usePathname();
  const segments = pathname.split('/');
  const tenant = segments[1]
  console.log(tenant);




  const [visiblePassword, setVisiblePassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });
  const { data: session, status } = useSession();
  const router = useRouter();



// Efecto para manejar la redirección y el estado de carga
useEffect(() => {
  if (status === "authenticated") {
    setIsLoading(true);
    if (tenant) {
      router.push(`/${tenant}/packs`);
    }
  } else {
    setIsLoading(false);
  }
}, [status]); // Ejecutar el efecto cuando el estado 'status' cambie



  const showPassword = () => {
    setVisiblePassword(!visiblePassword);
  };
  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      setIsLoading(true)
      const signInData = await signIn("credentials", {
        email,
        password,
        redirect: false, headers: {
          "tenant": tenant,
        },
      });

      if (!signInData?.ok)
      return Swal.fire({
        title: "¡Error!",
        text: "Usuario o clave incorrecto",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    
  

        if (tenant) {
          router.push(`/${tenant}/packs`);
        }
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    
    }
  });



  const googleSingin = async () => {
    setIsLoading(true)
    const signInData = await signIn("google");
    // mandara a nuestro back
    if (tenant) {
      router.push(`/${tenant}/packs`);
    }
    setIsLoading(false)
  };

  return (
    <div className={styles.formPage}>
      <div className={styles.formPage__logo_box}>
        <div className={styles.formPage__logo}></div>
      </div>
      <div className={styles.formPage__form}>
        <Title text="Iniciar sesión" />
        <span className={styles.formPage__subtitle}>
          Ingresa tus datos y accede a tu cuenta.
        </span>
        <form name="loginForm" className="max-w-sm" onSubmit={onSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className={`block mb-2 text-sm font-medium ${errors.email?.type === "required"
                  ? "text-red-700 dark:text-red-500"
                  : ""
                }`}
            >
              Correo Electrónico
            </label>
            <div className="relative">
              <input disabled={isLoading}
                type="text"
                id="email"
                className={`${errors.email?.type !== "required"
                    ? globals.input
                    : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  }`}
                placeholder="jsmith@mail.com"
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
              className={`block mb-2 text-sm font-medium  ${errors.password?.type === "required"
                  ? " text-red-700 dark:text-red-500"
                  : ""
                }`}
            >
              Contraseña
            </label>
            <div className="relative">
              <input disabled={isLoading}
                type={visiblePassword ? "text" : "password"}
                id="password"
                className={`${errors.password?.type !== "required"
                    ? globals.input
                    : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  }`}
                placeholder="*********"
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

          <div className={styles.formPage__button_box}>
            <Button text={isLoading ? <FadeLoader color="#5F3CAA" /> : "Iniciar sesión"} type="submit" disabled={isLoading} />


            <button type="button"
              className={`rounded-lg flex justify-center p-2 border w-full ${styles.formPage__button_box}`}
              onClick={googleSingin}
            >
              <FcGoogle size={24} className="mr-5" />
              Continuar con Google
            </button>
          </div>
        </form>
        <div className={styles.formPage__account_box}>
          <div className={styles.formPage__with_account}>
            ¿No tienes cuenta?
          </div>
          {tenant ? (
            <Link href={`/${tenant}/auth/register`}>
              <div className={styles.formPage__login}>Registrate</div>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
