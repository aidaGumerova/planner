import React, { FC, useRef, useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { TTask } from "../types";
import {
  getDayName,
  getWeekByDate,
  getFormatDay,
  DAY_MILLISECONDS,
} from "../../utils";
import "../styles.css";
import { CalendarCell } from "../CalendarCell/CalendarCell";
import { addTask, deleteTask, editTask, getTasks } from "../api/tasks";
import { useWeekContainer } from "./useWeekContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

const TODAY = new Date().setHours(0, 0, 0, 0);

const dayInWeek = (day: number): string => {
  return getDayName(new Date(day).getDay());
};

const getTasksByDay = (tasks: TTask[], day: number): TTask[] => {
  return tasks.filter(
    (task) =>
      task.date && task.date >= day && task.date < day + DAY_MILLISECONDS
  );
};

export const Week: FC = ({}) => {
  const classes = useStyles();
  const [tasks, setDayTasks] = useState<TTask[]>([]);
  const [currentDay, setCurrentDay] = useState<number>(TODAY);

  const currentWeek = getWeekByDate(currentDay);
  const nextWeek = getWeekByDate(currentDay + DAY_MILLISECONDS * 7);
  const previousWeek = getWeekByDate(currentDay - DAY_MILLISECONDS * 7);

  const getTasksFromStore = () => {
    const tasksFromStore = getTasks();
    setDayTasks(tasksFromStore.sort((a, b) => (a.id ?? 0) - (b.id ?? 0)));
  };

  useEffect(() => {
    getTasksFromStore();
  }, []);

  const handleSave = (task: TTask): void => {
    const saveFunction = !task.id ? addTask : editTask;
    if (saveFunction(task)) {
      getTasksFromStore();
    }
  };

  const handleDeleteTask = (taskId: number): void => {
    if (deleteTask(taskId)) {
      getTasksFromStore();
    }
  };

  const { scrollableWrapperRef, handleClickPreviousWeek, handleClickNextWeek } =
    useWeekContainer({
      currentDay,
      setCurrentDay,
      tasks,
    });

  return (
    <div className="wrapper">
      <h1 className="week-block">
        <Button
          size="small"
          className={classes.margin}
          onClick={handleClickPreviousWeek}
        >
          <ArrowBackIcon />
        </Button>
        <span className="week-name">
          {`${getFormatDay(currentWeek[0])} - ${getFormatDay(currentWeek[6])}`}
        </span>
        <Button
          size="small"
          className={classes.margin}
          onClick={handleClickNextWeek}
        >
          <ArrowForwardIcon />
        </Button>
      </h1>
      <div className="weeks" ref={scrollableWrapperRef}>
        <div className="week">
          {previousWeek.map((day) => (
            <div className="day">
              <div className="content-day-wrapper">
                <h4>{getFormatDay(day)}</h4>
                <h4>{dayInWeek(day)}</h4>
                <CalendarCell
                  day={day}
                  dayTasks={getTasksByDay(tasks, day)}
                  onSave={handleSave}
                  onDelete={handleDeleteTask}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="week">
          {currentWeek.map((day) => (
            <div className="day">
              <div className="content-day-wrapper">
                <h4>{getFormatDay(day)}</h4>
                <h4>{dayInWeek(day)}</h4>
                <CalendarCell
                  day={day}
                  dayTasks={getTasksByDay(tasks, day)}
                  onSave={handleSave}
                  onDelete={handleDeleteTask}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="week">
          {nextWeek.map((day) => (
            <div className="day">
              <div className="content-day-wrapper">
                <h4>{getFormatDay(day)}</h4>
                <h4>{dayInWeek(day)}</h4>
                <CalendarCell
                  day={day}
                  dayTasks={getTasksByDay(tasks, day)}
                  onSave={handleSave}
                  onDelete={handleDeleteTask}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
