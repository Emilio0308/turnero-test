import HourCard from "./HourCard";
import styles from '../components/carrousel/carrousel.module.scss'

interface DayCardProps {
  day: string;
}


const DayCard = ({ day }: DayCardProps) => {
  let hours: string[] = [];
  function generateDateRange(startDate: Date, startTime: string, endTime: string): string[] {
    const datesAndTimes: string[] = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    // Crear la fecha y hora de inicio
    const startDateTime = new Date(startDate);
    startDateTime.setHours(startHour, startMinute, 0, 0);
    // Crear la fecha y hora de fin
    const endDateTime = new Date(startDate);
    endDateTime.setHours(endHour, endMinute, 0, 0);
  
    const interval = 60 * 60 * 1000; // 1-hour interval
    for (let currentTime = startDateTime; currentTime <= endDateTime; currentTime.setTime(currentTime.getTime() + interval)) {
      datesAndTimes.push(currentTime.toString());
    }
    return datesAndTimes;
  }
  
  // Example usage:
  const exampleStartDate = new Date('2024-01-30T10:00:00.000Z');
  console.log({exampleStartDate})
  const exampleStartTime = '08:00';
  const exampleEndTime = '20:00';
  
 hours = generateDateRange(exampleStartDate, exampleStartTime, exampleEndTime);
  return (
    <div className={styles.carrousel__day}>
      <h3>{day}</h3>
      {hours.map((hour, index) => (
        <HourCard key={index} hour={hour} />
      ))}
    </div>
  );
};

export default DayCard;