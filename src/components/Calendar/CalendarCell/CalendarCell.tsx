import React, { FC, MouseEventHandler, useState } from "react";
import { MayBe, TTask } from "../types";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import "moment/locale/fr";
import "moment/locale/ru";
import { Modal } from "./Modal";
import Checkbox from "@material-ui/core/Checkbox";

type Props = {
  day: number;
  dayTasks: TTask[];
  onSave: (task: TTask) => void;
  onDelete: (taskId: number) => void;
};

export const CalendarCell: FC<Props> = ({ day, dayTasks, onSave, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editableTask, setEditableTask] = useState<MayBe<Partial<TTask>>>(null);

  const openEditableModal = (task: MayBe<TTask>) => {
    setEditableTask(
      task ?? {
        date: day,
      }
    );
    setIsEditModalOpen(true);
  };

  const onClose = () => {
    setEditableTask(null);
    setIsEditModalOpen(false);
  }

  const handleChangeStatus = (task: TTask) => {
    console.log(task);
    onSave({...task, status: !task.status ? true :  !task.status})
  }

  const handleDeleteTask = (taskId: number) => {
    console.log(taskId);
    onDelete(taskId)
  }

  return (
    <>
      <Modal isOpen={isEditModalOpen} task={editableTask} onSave={onSave} onClose={onClose}/>
      <div className="tasks">
        <button className="task add" onClick={() => openEditableModal(null)}>
          + Добавить новую задачу{" "}
        </button>
        {dayTasks.map((task) => (
          <div key={task.id} className="task">
              <Checkbox
                checked={!task.status ? false : true}
                name="urgent"
                color="primary"
                className="task-status"
                onChange={() => handleChangeStatus(task)}
              />
            <button onClick={() => openEditableModal(task)} className="task-value">
                <div>
                  {task.urgent ? <span className="warning">! </span> : null}
                  {task.name }
                </div>
                <div>{task.description}</div>
                <div>{ (!task.description && !task.name) ? <span className="noname"> Задача не описана</span>: null}</div>
            </button>
            <button className="delete" onClick={() => handleDeleteTask(task.id || 0)}><DeleteOutlinedIcon /></button>
          </div>
        ))}
      </div>
    </>
  )
}
