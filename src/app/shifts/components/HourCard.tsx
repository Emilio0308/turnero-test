"use client"
import { useState } from 'react';
import styles from '../components/carrousel/carrousel.module.scss';

interface HourCardProps {
  hour: {
    value: string,
    selected: boolean
  }
}

const HourCard = ({ hour }: HourCardProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const newHour = new Date(hour.value);
  const isSelected = selected === newHour.getHours().toLocaleString();

  const handleClick = () => {
    setSelected(prevSelected => (prevSelected !== newHour.getHours().toLocaleString() ? newHour.getHours().toLocaleString() : null));
  };

  return (
    <div
      className={`${styles.carrousel__hour} ${isSelected ? styles.carrousel__hour__selected : ''}`}
      onClick={handleClick}
    >
      {`${newHour.getHours()}:${newHour.getMinutes()}0`}
    </div>
  );
};

export default HourCard;
