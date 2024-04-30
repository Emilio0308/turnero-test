import { useSearchParams } from "next/navigation";
import styles from "../components/carrousel/carrousel.module.scss";
import HourCard from "./HourCard";
import { useState } from "react";

interface DayCardProps {
  dayData: {
    date: string;
    day: string;
    range: {
      endTime: string;
      startTime: string;
    } | null;
  };
  periodicity: number;
}

interface hour {
  value: string;
  isValid: boolean;
}

const DayCard = ({ dayData, periodicity }: DayCardProps) => {
  const searchParams = useSearchParams();
  const packId = searchParams.get("packId");
  const serviceId = searchParams.get("serviceId");

  const [formData, setFormData] = useState<any>({
    packId,
    timeRange: periodicity,
    date: dayData.date,
    shift_from: "",
    shift_to: "",
  });

  console.log(formData)

  const range = dayData.range;
  function generateHourRange(startTime: string, endTime: string): hour[] {
    const hours: hour[] = [];
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += periodicity) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");

        const value = `${formattedHour}:${formattedMinute}`;

        const hora1 = range.startTime;
        const hora2 = range.endTime;

        const date1 = new Date(`2024-01-01T${hora1}:00`);
        const date2 = new Date(`2024-01-01T${hora2}:00`);
        const currentDate = new Date(`2024-01-01T${value}:00`);
        const isValid = currentDate > date1 && currentDate < date2;

        const hourToPush = {
          value,
          isValid: range ? isValid : false,
        };
        hours.push(hourToPush);
      }
    }

    return hours;
  }

  const hours = generateHourRange("00:06", "22:00");

  return (
    <div className={styles.carrousel__day}>
      <h3>{dayData.day}</h3>
      <div>{dayData.date}</div>
      {hours.map((hour, index) => (
        <HourCard key={index} hour={hour} setFormData={setFormData} />
      ))}
    </div>
  );
};

export default DayCard;
