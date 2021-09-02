import React, { FC, MouseEventHandler, useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {MayBe, TTask} from "../types";
import {
  getDayName,
  getWeekByDate,
  getFormatDay,
  DAY_MILLISECONDS,
} from "../../utils";
import "../styles.css";
import { CalendarCell } from "../CalendarCell/CalendarCell";
import {addTask, deleteTask, editTask, getTasks} from "../api/tasks";

type Props = {
  dayTask: TTask;
  onSave: (dayTasks: TTask) => void;
};

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

const currentDay = new Date().setHours(0, 0, 0, 0);

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
  const [currentWeek, setCurrentWeek] = useState<number[]>(
    getWeekByDate(currentDay)
  );

  console.log(tasks);
  const getTasksFromStore = () => {
    const tasksFromStore = getTasks();
    setDayTasks(tasksFromStore.sort((a, b) => ((a.id ?? 0) - (b.id ?? 0))));
  };

  useEffect(() => {
    getTasksFromStore();
  }, []);


  const handleSave = (task: TTask): void => {
    console.log(task, "handleSave");
    const saveFunction = !task.id ? addTask : editTask;
    if (saveFunction(task)) {
      getTasksFromStore();
    }
  };

  const getLastWeek = () => {
    setCurrentWeek(getWeekByDate(currentWeek[0] - DAY_MILLISECONDS * 7));
  };

  const getNextWeek = () => {
    setCurrentWeek(getWeekByDate(currentWeek[0] + DAY_MILLISECONDS * 7));
  };

  const handleDeleteTask = (taskId: number): void => {
    if (deleteTask(taskId)) {
      getTasksFromStore();
    }
  }

  return (
    <>
      <div className="wrapper">
        <h1 className="week-block">
          <Button size="small" className={classes.margin} onClick={getLastWeek}>
            last
          </Button>
          <span className="week-name">
            {`${getFormatDay(currentWeek[0])} - ${getFormatDay(
              currentWeek[6]
            )}`}
          </span>
          <Button size="small" className={classes.margin} onClick={getNextWeek}>
            next
          </Button>
        </h1>
        <div className="week">
          {currentWeek.map((day) => (
            <div className="day">
              <h4>{getFormatDay(day)}</h4>
              <h4>{dayInWeek(day)}</h4>
              <CalendarCell
                day={day}
                dayTasks={getTasksByDay(tasks, day)}
                onSave={handleSave}
                onDelete={handleDeleteTask}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
