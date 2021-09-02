import { DAY_MILLISECONDS } from "../../utils";
import { RefObject, useEffect, useRef } from "react";
import { TTask } from "../types";

const SCROLL_DELAY = 1000;

type TParams = {
  currentDay: number;
  setCurrentDay: (currentDay: number) => void;
  tasks: TTask[];
};

type TResult = {
  scrollableWrapperRef: RefObject<HTMLDivElement>;
  handleClickPreviousWeek: () => void;
  handleClickNextWeek: () => void;
};

export const useWeekContainer = ({
  currentDay,
  setCurrentDay,
  tasks,
}: TParams): TResult => {
  const scrollableWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableWrapperRef.current) {
      scrollableWrapperRef.current.scrollTo({
        left: scrollableWrapperRef.current.offsetWidth,
      });
    }
  }, [currentDay, tasks]);

  const handleClickPreviousWeek = () => {
    if (scrollableWrapperRef.current) {
      scrollableWrapperRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
      setTimeout(() => {
        setCurrentDay(currentDay - DAY_MILLISECONDS * 7);
      }, SCROLL_DELAY);
    }
  };

  const handleClickNextWeek = () => {
    if (scrollableWrapperRef.current) {
      scrollableWrapperRef.current.scrollTo({
        left: scrollableWrapperRef.current.scrollWidth,
        behavior: "smooth",
      });
      setTimeout(() => {
        setCurrentDay(currentDay + DAY_MILLISECONDS * 7);
      }, SCROLL_DELAY);
    }
  };

  return {
    scrollableWrapperRef,
    handleClickPreviousWeek,
    handleClickNextWeek,
  };
};
