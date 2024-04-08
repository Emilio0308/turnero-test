import React from 'react';
import Carrousel from './components/carrousel/Carrousel';

const Shift = () => {
  // Supongamos que tienes los datos necesarios en una variable llamada 'data'
  const data: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <div>
      <Carrousel data={data} />
    </div>
  );
};

export default Shift;
