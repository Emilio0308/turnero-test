"use client";
import { Dispatch, SetStateAction } from "react";
import styles from "../components/carrousel/carrousel.module.scss";

interface From {
  packId: string;
  timeRange: string; // ¿periodicidad es un número?
  date: string; // ¿dayData.date es una cadena?
  shift_from: string;
  shift_to: string;
}

interface HourCardProps {
  hour: {
    value: string;
    isValid: boolean;
  };
  setFormData: Dispatch<SetStateAction<From>>;
}

const HourCard = (props: HourCardProps) => {
  const { hour, setFormData } = props;

  const handleClick = () => {
    if (!hour.isValid) {
      return;
    }
    setFormData((prev) => {
      return {
        ...prev,
        shift_from: hour.value,
      };
    });
  };

  return (
    <div
      className={`${styles.carrousel__hour} ${
        hour.isValid ? "" : "opacity-60"
      }`}
      onClick={handleClick}
    >
      {hour.value}
    </div>
  );
};

export default HourCard;
