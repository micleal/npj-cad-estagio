import { atom, useAtom } from "jotai";

export const selectedDateAtom = atom<"today" | "week" | "month">("today");

export const useSelectedDate = () => {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);

  return { selectedDate, setSelectedDate };
};
