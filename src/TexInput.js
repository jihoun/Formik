import React from "react";
import classnames from "classnames";
import { Labely } from "./Labely";
import { InputFeedback } from "./InputFeedback";

export const TextInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  className,
  ...props
}) => {
  const classes = classnames(
    "input-group",
    {
      "animated shake error": !!error
    },
    className
  );
  return (
    <div className={classes}>
      <Labely htmlFor={id} error={error}>
        {label}
      </Labely>
      <input
        id={id}
        className="text-input"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
    </div>
  );
};
