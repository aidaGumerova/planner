import React, { FC, MouseEventHandler, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { MayBe, TTask } from "../types";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import "moment/locale/ru";

type Props = {
  isOpen: boolean;
  task: MayBe<Partial<TTask>>;
  onSave: (task: TTask) => void;
  onClose: () => void;
};
moment.locale("ru");

export const Modal: FC<Props> = ({ isOpen, task, onSave, onClose }) => {
  const [values, setValues] = useState<Partial<TTask>>();

  useEffect(() => {
    setValues(task ?? {});
  }, [task]);

  const handleChangeDate = (date: MaterialUiPickersDate | null): void => {
    setValues({
      ...values,
      date: date?.valueOf() ?? null,
    });
  };

  const handleChangeUrgent = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setValues({
      ...values,
      urgent: event.target.checked,
    });
  };

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    console.log(event.target.value);
    setValues({
      ...values,
      name: event.target.value,
    });
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    console.log(event.target.value);
    setValues({
      ...values,
      description: event.target.value,
    });
  };

  const handleSubmitForm = () => {
    if (values) {
      const newTaskModel: TTask = {
        id: values.id,
        date: values.date ?? null,
        urgent: values.urgent ?? false,
        name: values.name ?? null,
        description: values.description ?? null,
        status: values.status ?? null,
      };
      onSave(newTaskModel);
      onClose();
    }
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale="ru">
      <div>
        <Dialog
          open={isOpen}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {values?.id ? "Редактирование задачи" : "Новая задача"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {new Date(values?.date ? values?.date : 0).toLocaleDateString()}
            </DialogContentText>

            <form name="taskForm" onSubmit={handleSubmitForm}>
              <>
                <KeyboardDatePicker
                  disableToolbar
                  lang={"ru"}
                  variant="inline"
                  format="DD.MM.yyyy"
                  margin="normal"
                  id="date"
                  label="Дата"
                  value={values?.date}
                  onChange={handleChangeDate}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!values?.urgent}
                      onChange={handleChangeUrgent}
                      name="urgent"
                      color="primary"
                    />
                  }
                  label="Важно"
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Название"
                  type="text"
                  value={values?.name}
                  onChange={handleChangeName}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="description"
                  label="Описание"
                  type="text"
                  value={values?.description}
                  onChange={handleChangeDescription}
                  fullWidth
                />
              </>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Отмена
            </Button>
            <Button onClick={handleSubmitForm} color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </MuiPickersUtilsProvider>
  );
};
