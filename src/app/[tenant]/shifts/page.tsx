import React from 'react';
import Carrousel from './components/carrousel/Carrousel';
import { createShift } from '@/libs/shifts';


const Shift = () => {
  // Supongamos que tienes los datos necesarios en una variable llamada 'data'
//  const bodySchema = Joi.object({
//    packId: Joi.string()
//      .guid({ version: ['uuidv4'] })
//      .required(),
//    expertId: Joi.string().guid({ version: ['uuidv4'] }),
//    timeRange: Joi.string().valid('15 min', '30 min', '60 min').required(),
//    date: Joi.date().greater('now').required(),
//    shift_from: Joi.string()
//      .pattern(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
//      .required(),
//    shift_to: Joi.string()
//      .pattern(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
//      .required(),
//  });
//

  
  
  const data: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];




  return (
    <div>
      <Carrousel data={data} />
    </div>
  );
};

export default Shift;
