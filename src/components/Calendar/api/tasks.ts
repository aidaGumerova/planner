import { TTask } from "../types";

const TASKS_LOCAL_KEY = "TASKS";

export const getTasks = (): TTask[] => {
  const tasksString = localStorage.getItem(TASKS_LOCAL_KEY);
  return tasksString ? (JSON.parse(tasksString) as TTask[]) : [];
};

export const addTask = (task: TTask): boolean => {
  const newTask = {
    ...task,
    id: Date.now(),
  };
  const tasks = getTasks();
  const newTasks = [...tasks, newTask];
  const tasksString = JSON.stringify(newTasks);
  localStorage.setItem(TASKS_LOCAL_KEY, tasksString);
  return true;
};

export const editTask = (task: TTask): boolean => {
  const tasks = getTasks();
  const newTasks = [...tasks.filter((t) => t.id !== task.id), task];
  const tasksString = JSON.stringify(newTasks);
  localStorage.setItem(TASKS_LOCAL_KEY, tasksString);
  return true;
};

export const deleteTask = (taskId: number): boolean => {
  const tasks = getTasks();
  const newTasks = [...tasks.filter((t) => t.id !== taskId)];
  console.log(newTasks);
  const tasksString = JSON.stringify(newTasks);
  localStorage.setItem(TASKS_LOCAL_KEY, tasksString);
  return true;
};
