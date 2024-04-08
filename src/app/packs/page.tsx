import { prisma } from "@/libs/prisma";
import PackCard from "./components/PackCard";

async function loadPacks() {
  return await prisma.pack.findMany();
}

export const dynamic = 'force-dynamic';

export default async function PacksPage() {
  const packs = await loadPacks();
  return (
    <>
      <div className="font-rubik text-4xl font-medium leading-10">
      Elige tu pack de clases.
    </div>
    <div className="text-alabaster-600 text-xl font-rubik font-normal leading-8 mt-10 mb-16">
      Podrás cambiar de pack siempre que lo necesites. Al solicitar el cambio de pack se verá reflejado al mes siguiente. En caso de requerir clases adicionales, siempre podrás adquirir clases sueltas.
    </div>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:w-3/4 md:w-2/4 lg:w-3/4 xl:w-2/4">
      {
        packs.map(pack => (
          <PackCard pack={pack} key={pack.id} />
        ))
      }
    </div>
    </>    
  )
}
