import { TTask } from "../types";
import {addTask, deleteTask, editTask} from "../api/tasks";

type TParams = {
  getTasksFromStore: () => void;
};

type TResult = {
  handleSave: (task: TTask) => void;
  handleDeleteTask: (taskId: number) => void;
};

export const useTaskHandlers = ({getTasksFromStore,}: TParams): TResult => {

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

  return {
    handleSave,
    handleDeleteTask,
  };
};
