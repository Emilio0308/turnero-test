"use client";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";

interface FormData {
  name: string;
  lastname: string;
  email: string;
}

export default function EditData() {
  const { data: session, update } = useSession();
  console.log(session);
  const axiosAuth = useAxiosAuth();
  const username = session?.userData?.name;
  const lastName = session?.userData?.lastname;
  const email = session?.userData?.email;
  const id = session?.userData?.id;

  const [formData, setFormData] = useState<FormData>({
    name: session?.userData?.name || "",
    lastname: session?.userData?.lastname || "",
    email: session?.userData?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function updateSession(formData: any) {
    if (session) {
      await update({
        ...session,
        userData: {
          ...session.userData,
          ...formData,
        },
      });
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // const response = await axios.put(`/api/users/${id}`, formData, {
      //   headers: {
      //     Authorization: `Bearer ${session?.token}`,
      //     "Content-Type": "application/json",
      //   },
      // });  
      //*cree una instancia de axios para facilitar el agregar el token a los headers//    
      const response = await axiosAuth.put(`users/${id}`, formData);
      updateSession(formData);
      console.log("User data updated:", response.data);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div>
      <h1 className="w-96 text-gray-800 text-4xl font-medium font-Rubik leading-10 pb-10">
        Editar Usuario
      </h1>
      <form className="inline-grid" onSubmit={handleSubmit}>
        <div className="flex space-x-5">
          <div className="inline-grid py-5 relative">
            <label
              className="w-96 text-slate-700 text-sm font-medium font-Rubik leading-tight"
              htmlFor="name"
            >
              Nombre
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
              <AiOutlineUser className="h-5 w-5" />
            </div>
            <input
              value={formData.name}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 bg-gray-50 rounded-lg border border-slate-400 text-slate-700 text-base font-normal font-Rubik leading-normal focus:outline-none focus:border-blue-500"
              placeholder={username}
              type="text"
              id="name"
              name="name"
            />
          </div>

          <div className="inline-grid py-5 relative">
            <label
              className="w-96 text-slate-700 text-sm font-medium font-Rubik leading-tight"
              htmlFor="lastname"
            >
              Apellido
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
              <AiOutlineUser className="h-5 w-5" />
            </div>
            <input
              value={formData.lastname}
              onChange={handleChange}
              className="w-full h-12 px-4 py-3.5 bg-gray-50 rounded-lg border border-slate-400 text-slate-700 text-base font-normal font-Rubik leading-normal focus:outline-none focus:border-blue-500"
              placeholder={lastName}
              type="text"
              id="lastname"
              name="lastname"
            />
          </div>

          <div className="inline-grid py-5 relative">
            <label
              className="w-96 text-slate-700 text-sm font-medium font-Rubik leading-tight"
              htmlFor="email"
            >
              Email
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
              <AiOutlineMail className="h-5 w-5" />
            </div>
            <input
              value={formData.email}
              onChange={handleChange}
              className="w-full h-12 px-4 py-3.5 bg-gray-50 rounded-lg border border-slate-400 text-slate-700 text-base font-normal font-Rubik leading-normal focus:outline-none focus:border-blue-500"
              placeholder={email}
              type="email"
              id="email"
              name="email"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-64 px-6 py-3.5 bg-purple-800 rounded-lg  font-medium font-Rubik leading-normal whitespace-nowrap items-center"
        >
          <span className="text-base font-medium font-Rubik leading-normal text-white-50">
            Editar información personal
          </span>
        </button>
      </form>

      {/* <button onClick={updateSession} type="button">
        cambiar nombre
      </button> */}
    </div>
  );
}