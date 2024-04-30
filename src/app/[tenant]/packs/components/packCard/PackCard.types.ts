interface Pack {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    duration: string;
    active: boolean;
    extra_data: any; // Puedes ajustar este tipo según la estructura real de los datos adicionales
    serviceid: string;
    quantityclass: number;
    createat: string;
    updatedat: string;
  }

export interface Props {
  pack: Pack;
}

