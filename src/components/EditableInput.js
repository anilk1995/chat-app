import { useCallback, useState } from "react";
import { Input, InputGroup, Notification, toaster } from "rsuite";
import CloseIcon from "@rsuite/icons/Close";
import EditIcon from "@rsuite/icons/Edit";
import CheckIcon from "@rsuite/icons/Check";

function EditableInput({
  initialValue,
  onSave,
  label = null,
  placeholder = "Write your value",
  emptyMessage = "Input is empty",
  wrapperClassName = "",
  ...inputProps
}) {
  const [input, setInput] = useState(initialValue);
  const [isEditable, setIsEditable] = useState(false);

  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const onEditClick = useCallback(() => {
    setIsEditable((p) => !p);
    setInput(initialValue);
  }, [initialValue]);

  const onSaveClick = async () => {
    const trimmed = input.trim();

    if (trimmed === "") {
      toaster.push(<Notification>{emptyMessage}</Notification>, {
        duration: 4000,
      });
    }

    if (trimmed !== initialValue) {
      await onSave(trimmed);
    }
    setIsEditable(false);
  };
  return (
    <div className={wrapperClassName}>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          disabled={!isEditable}
          placeholder={placeholder}
          onChange={onInputChange}
          value={input}
        />
        <InputGroup.Button onClick={onEditClick}>
          {isEditable ? <CloseIcon /> : <EditIcon />}
        </InputGroup.Button>
        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <CheckIcon />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
}

export default EditableInput;
