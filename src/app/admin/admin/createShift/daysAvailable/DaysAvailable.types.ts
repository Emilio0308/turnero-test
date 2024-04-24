import { Dispatch } from "react";

export interface Day {
  viewDay: string;
  name: string;
  startTime: string;
  endTime: string;
}

export interface DayToPush {
  [key: string]: {
    startTime: string;
    endTime: string;
  };
}

export interface Props {
  selectedDays: DayToPush[];
  setSelectedDays: Dispatch<React.SetStateAction<DayToPush[]>>;
}
