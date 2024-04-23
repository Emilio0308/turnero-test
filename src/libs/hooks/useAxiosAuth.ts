"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { axiosAuth } from "../axios";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  //!obtener dinamicamente el tenant para tener acceso a la base correspondiente
  useEffect(() => {
    const reqIntercept = axiosAuth.interceptors.request.use((config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${session.token}`;
        config.headers.tenant= 'client-test'
      }
      return config;
    });

    return () => {
      axiosAuth.interceptors.request.eject(reqIntercept);
    };
  }, [session]);

  return axiosAuth;
};

export default useAxiosAuth;
