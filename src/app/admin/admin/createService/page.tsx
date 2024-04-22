import { z } from "zod"

export default function createService() {

    const ServiceShema = z.object({
        name: z.string(),
        //  type: z.string(),
        duration: z.string(),
        capacity: z.number(),

    })

    const PackSchema = z.object({
        serviceId: z.string(),
        name: z.string(),
        descriptcion: z.string(),
        price: z.number(),
        quantityclass: z.number(),
    })

    return (<>



    </>)
}