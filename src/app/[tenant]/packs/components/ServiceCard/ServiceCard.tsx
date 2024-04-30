import Link from "next/link";
import { Props } from "./Services.types";


export default function ServiceCard(props: Props) {
  const { service } = props;
  console.log(service);
  return (
    <Link  href={`packs/${service.id}`}>
      <article className="bg-alabaster-100 bg-opacity-100 capitalize px-4 py-8 rounded-2xl h-[120px] flex justify-center items-center font-medium tracking-widest" >
        {service.name}
      </article>
    </Link>
  );
}
