import React, { useState } from "react";

type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export interface InputProps {
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  defaultValue?: string;
  label: string;
  type: InputType;
}

const Input: React.FC<InputProps> = ({
  label,
  required = false,
  type,
  onChange,
  placeholder,
}: InputProps) => {
  const [inputValue, setInputValue] = useState<string | number | undefined>(undefined);
  const emptyLabel = label.trim() === '';
  const renderAccessibilityError = (): JSX.Element | null => {
    return emptyLabel ? <span>Provide a non-empty label for input</span> : null
  }
  const renderRequiredSpan = (): JSX.Element => {
    return <span className="required">*</span>
  }
  const renderInput = (): JSX.Element => {
    return <>
      <label htmlFor="label">
        {label} {required && renderRequiredSpan()}
      </label>
      <input
        id="label"
        name="label"
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={inputValue}
        required={required}
      />
    </>
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange && onChange(e);
  }
  return emptyLabel ? renderAccessibilityError() : renderInput();
};
