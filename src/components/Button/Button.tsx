import React, { useState } from "react";

type AvailableCustomTags = 'div' | 'span' | 'a';

export interface ButtonProps {
  label: string;
  description: string;
  size?: 'small' | 'medium' | 'large';
  action?: () => void;
  tag?: AvailableCustomTags;
  toggleble?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  description,
  tag,
  size = 'medium',
  action,
  ...props
}: ButtonProps) => {
  const isButton = !tag;
  const isEmptyLabel = label.trim() === '';
  const isEmptyDescription = description.trim() === '';
  const renderAccessibilityError = (): JSX.Element | null => {
    const errorTextPart =
      isEmptyLabel ?
        'button label' :
        isEmptyDescription ?
          'button description' : null;

    return errorTextPart ? <span>{`Please provide a ${errorTextPart}`}</span> : null;
  }

  const [ariaPressed, setAriaPressed] = useState(false)

  const renderButton = (): JSX.Element =>
    <button
      type="button"
      aria-describedby={description}
      onClick={action}
      {...props}
    >
      {label}
    </button>;

  const renderCustomTag = (Tag: keyof JSX.IntrinsicElements): JSX.Element =>
    <Tag
      role="button"
      tabIndex={0}
      aria-pressed={ariaPressed}
      aria-describedby={description}
      onClick={handlePush}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {label}
    </Tag>;

  const renderButtonOrCustomNode = (): JSX.Element => isButton ? renderButton() : renderCustomTag(tag);

  const handlePush = () => {
    setAriaPressed(pressed => !pressed);
    action && action();
  }
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key in ['Enter', ' ']) {
      return;
    }
    setAriaPressed(pressed => !pressed);
    action && action();
  }
  return (
    (isEmptyLabel || isEmptyDescription) ?
      renderAccessibilityError() :
      renderButtonOrCustomNode()
  );
};

export default Button;
