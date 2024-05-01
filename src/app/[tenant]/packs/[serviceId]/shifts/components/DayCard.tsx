import { useSearchParams } from "next/navigation";
import styles from "../components/carrousel/carrousel.module.scss";
import HourCard from "./HourCard";
import { useState } from "react";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";

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

interface From {
  packId: string;
  timeRange: string;
  date: string;
  shift_from: string;
  shift_to: string;
}

const DayCard = ({ dayData, periodicity }: DayCardProps) => {
  const searchParams = useSearchParams();
  const packId = searchParams.get("packId");
  const serviceId = searchParams.get("serviceId");
  const useAxios = useAxiosAuth();

  function transformarFecha(fecha: string) {
    const [dia, mes, anio] = fecha.split("/");
    return `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
  }

  const [formData, setFormData] = useState<From>({
    packId,
    timeRange: `${periodicity} min`,
    date: transformarFecha(dayData.date),
    shift_from: "",
    shift_to: "",
  });

  function sumarMinutos(hora: string, minutosASumar: number): string {
    const [horaStr, minutosStr] = hora.split(":");
    const horas = parseInt(horaStr, 10);
    const minutos = parseInt(minutosStr, 10);
    const totalMinutos = horas * 60 + minutos + minutosASumar;
    const nuevasHoras = Math.floor(totalMinutos / 60);
    const nuevosMinutos = totalMinutos % 60;
    const nuevaHoraStr = `${nuevasHoras
      .toString()
      .padStart(2, "0")}:${nuevosMinutos.toString().padStart(2, "0")}`;

    return nuevaHoraStr;
  }

  const { data: session } = useSession();
  const userId = session.userData.id

  const handleSaveShift = () => {
    const shift_to = sumarMinutos(formData.shift_from, periodicity);
    console.log(shift_to);
    console.log(userId)
    useAxios
      .post(`shift/${userId}`, { ...formData, shift_to })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

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
      <button className="" onClick={handleSaveShift}>
        agregar shift
      </button>
      <h3>{dayData.day}</h3>
      <div>{dayData.date}</div>
      {hours.map((hour, index) => (
        <HourCard key={index} hour={hour} setFormData={setFormData} />
      ))}
    </div>
  );
};

export default DayCard;
