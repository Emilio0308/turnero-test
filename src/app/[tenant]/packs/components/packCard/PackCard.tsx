import Link from "next/link";
import { useParams } from "next/navigation";
import { Props } from "./PackCard.types";

export default function PackCard(props: Props) {
  const { pack } = props;
  const packId = pack.id;
  const { tenant, serviceId } = useParams();
  return (
    <Link
      href={{ pathname: `/${tenant}/shifts`, query: { serviceId, packId } }}
    >
      <article className="bg-alabaster-100 bg-opacity-100 capitalize px-4 py-8 rounded-2xl h-[120px] flex justify-center items-center font-medium tracking-widest">
        {pack.quantityclass} clases en {pack.duration}
      </article>
    </Link>
  );
}
