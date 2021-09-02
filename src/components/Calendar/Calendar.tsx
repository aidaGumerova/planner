import React, { FC, useEffect, useState } from "react";
import { TTask} from "./types";
import { CalendarCell } from "./CalendarCell/CalendarCell";

import "./styles.css";
import {addTask, getTasks} from "./api/tasks";

/*const initialDayTasks: TTask[] = [
  {
    id: 1,
    date: "2021-08-23",
    urgent: false,
    name: "Задача №1",
    description: "Описание задачи",
  },
  {
    id: 2,
    date: "2021-08-23",
    urgent: false,
    name: "Задача №2",
    description: "Описание задачи",
  },
  {
    id: 3,
    date: "2021-08-23",
    urgent: true,
    name: "Задача №3",
    description: "Описание задачи",
  },

  {
    id: 1,
    date: "2021-08-24",
    urgent: false,
    name: "Задача №1",
    description: "Описание задачи",
  },
  {
    id: 2,
    date: "2021-08-24",
    urgent: false,
    name: "Задача №2",
    description: "Описание задачи",
  },
  {
    id: 3,
    date: "2021-08-24",
    urgent: true,
    name: "Задача №3",
    description: "Описание задачи",
  },

  {
    id: 1,
    date: "2021-08-25",
    urgent: false,
    name: "Задача №1",
    description: "Описание задачи",
  },
  {
    id: 2,
    date: "2021-08-25",
    urgent: false,
    name: "Задача №2",
    description: "Описание задачи",
  },
  {
    id: 3,
    date: "2021-08-25",
    urgent: true,
    name: "Задача №3",
    description: "Описание задачи",
  },

  {
    id: 1,
    date: "2021-08-26",
    urgent: false,
    name: "Задача №1",
    description: "Описание задачи",
  },
  {
    id: 2,
    date: "2021-08-26",
    urgent: false,
    name: "Задача №2",
    description: "Описание задачи",
  },
  {
    id: 3,
    date: "2021-08-26",
    urgent: true,
    name: "Задача №3",
    description: "Описание задачи",
  },

  {
    id: 1,
    date: "2021-08-27",
    urgent: false,
    name: "Задача №1",
    description: "Описание задачи",
  },
  {
    id: 2,
    date: "2021-08-27",
    urgent: false,
    name: "Задача №2",
    description: "Описание задачи",
  },
  {
    id: 3,
    date: "2021-08-27",
    urgent: true,
    name: "Задача №3",
    description: "Описание задачи",
  },
  {
    id: 1,
    date: "2021-08-28",
    urgent: false,
    name: "Задача №1",
    description: "Описание задачи",
  },
  {
    id: 2,
    date: "2021-08-28",
    urgent: false,
    name: "Задача №2",
    description: "Описание задачи",
  },
  {
    id: 3,
    date: "2021-08-28",
    urgent: true,
    name: "Задача №3",
    description: "Описание задачи",
  },
];*/

export const Calendar: FC = () => {
  const [tasks, setDayTasks] = useState<TTask[]>([]);

  const getTasksFromStore = () => {
    const tasksFromStore = getTasks();
    setDayTasks(tasksFromStore);
  }

  useEffect(() => {
    getTasksFromStore();
  }, []);

  const handleAdd = (task: TTask) => {
    if (addTask(task)) {
      getTasksFromStore();
    }
  }

  return (
    <div className="wrapper">
      <h1
        onClick={() => {
          setDayTasks([]);
        }}
      >
        23 августа - 29 августа
      </h1>
      <div className="week">

      </div>
    </div>
  );
};
//{dayTasks?.map((dayTask) => (
//           <CalendarCell
//             key={dayTask.id}
//             dayTask={dayTask}
//             onSave={handleSaveNewTask}
//           />
//         ))}