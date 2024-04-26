import PackCard from "./components/PackCard";
import { getPacks } from "@/libs/packs";



export default async function PacksPage() {


try {
  const response = await getPacks()
  console.log(response.data);
  
} catch (error) {
  
}

return(




<div>
     
    </div>    
  )
}
