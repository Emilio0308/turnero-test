"use client";
import styles from "../components/carrousel/carrousel.module.scss";

interface HourCardProps {
  hour: {
    value: string;
    isValid: boolean;
  };
  setFormData: any;
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
