"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { PackProps } from "../pack.interface";


const PackCard = ({ pack }: PackProps) => {
  const router = useRouter();

  return (
    <div className=" py-8 px-4 hover:bg-gray-100 cursor-pointer border-2 justify-center text-center md:w-40 rounded-2xl"
      onClick={() => { router.push(`./Packs/edit/${pack.id}`) }}>
      <p className="text-alabaster-950 font-bold text-xl">{pack.description}</p>
    </div>
  )
}

export default PackCard;