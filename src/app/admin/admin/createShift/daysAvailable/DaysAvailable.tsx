import { Day, Props } from "./DaysAvailable.types";
import { days } from "./daysAvailable.helper";
import globals from "@/styles/globals.module.scss";

export default function DaysAvailable(props: Props) {
  const { selectedDays, setSelectedDays } = props;

  const toggleDay = (day: Day) => {
    const dayToPush = {
      [day.name]: {
        startTime: day.startTime,
        endTime: day.endTime,
      },
    };
    const newSelected = selectedDays.filter((d) => {
      const key = Object.keys(d)[0];
      return key != day.name;
    });
    const rst = [...newSelected, dayToPush];
    setSelectedDays(rst);
  };
  return (
    <>
      <div>
        <label>Selecciona los días en los que estará disponible el turno</label>
        <div className="grid">
          {days.map((day, i) => (
            <div key={i} className="grid">
              <button
                type="button"
                className={`rounded-md w-32 px-4 py-2 m-1 focus:outline-none 
                ${
                  //   selectedDays.includes(day.viewDay)
                  true
                    ? "bg-violet-300 border border-violet-900 text-violet-900"
                    : "bg-gray-100 border border-gray-400 hover:border-primary"
                }`}
                onClick={() => toggleDay(day)}
              >
                {day.viewDay}
              </button>

              <article>
                <label>Selecciona la franja horaria del turno</label>
                <div className="flex">
                  <div>
                    <label>Desde</label>
                    <input
                      onChange={(e) => {
                        day.startTime = e.target.value;
                        toggleDay(day);
                      }}
                      id="startTime"
                      style={{ width: "120px" }}
                      className={`${globals.input} `}
                      type="time"
                    />
                  </div>
                  <div>
                    <label>Hasta</label>
                    <input
                      id="endTime"
                      onChange={(e) => {
                        day.endTime = e.target.value;
                        toggleDay(day);
                      }}
                      style={{ width: "120px" }}
                      className={`${globals.input}`}
                      type="time"
                    />
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
