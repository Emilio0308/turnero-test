"use client"
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";
import { useSession } from 'next-auth/react';
export default function ProfilePage() {

  const { data: session } = useSession();
  const username = session?.userData?.name;
  //(session);
  


  return (
    <div>
    <h1 className="w-96 text-gray-800 text-4xl font-medium font-['Rubik'] leading-10 pb-10 whitespace-nowrap">Hola👋, {username} este es tu perfil!</h1>
    <div className='flex space-x-10'>
      <div>
        <Link href="/profile/editData" className='w-96 h-20 px-4 py-6 bg-gray-50 rounded-2xl border border-slate-200 justify-start items-start gap-2 inline-flex'>
          <button className='flex items-center space-x-3'>
            <span className="w-80 text-gray-800 text-xl font-normal font-['Rubik'] leading-7">Editar información</span>
            <BsChevronRight />
          </button>
        </Link>
      </div>
      <div>
        <Link href="/profile/editPassword" className='w-96 h-20 px-4 py-6 bg-gray-50 rounded-2xl border border-slate-200 justify-start items-start gap-2 inline-flex'>
          <button className=' flex items-center space-x-3'>
            <span className="w-80 text-gray-800 text-xl font-normal font-['Rubik'] leading-normal">Editar contraseña</span>
            <BsChevronRight />
          </button>
        </Link>
      </div>
    </div>
  </div>

  );
}
