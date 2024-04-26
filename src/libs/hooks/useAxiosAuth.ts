"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { axiosAuth } from "../axios";
const useAxiosAuth = () => {
const location = useLocation()
console.log(location);

  const { data: session } = useSession();



  useEffect(() => {
    const reqIntercept = axiosAuth.interceptors.request.use((config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${session.token}`;
        config.headers.tenant= 'gymtest'
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
