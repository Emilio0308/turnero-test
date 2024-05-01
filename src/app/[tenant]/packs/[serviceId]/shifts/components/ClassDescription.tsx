// import DayCard from "./DayCard";
import Carrousel from "./carrousel/Carrousel";

interface Props {
  data: any;
}

interface Values {
  endTime: string;
  startTime: string;
}
function ClassDescription(props: Props) {
  const { data } = props;

  const days = Object.keys(data.daysavailable).sort((a, b) => {
    const order: Record<string, number> = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7,
    };
    return order[a] - order[b];
  });

  const orderedValues: Values[] = days.map((day) => data.daysavailable[day]);
  //   console.log(orderedValues);

  const periodicity = parseInt(data.periodicity);

  return (
    <section>
      <Carrousel
        days={days}
        data={data.daysavailable}
        values={orderedValues}
        periodicity={periodicity}
      />
    </section>
  );
}
export default ClassDescription;
