import React from "react";

export const Labely = ({ children, ...props }) => {
  return (
    <label className="label" {...props}>
      {children}
    </label>
  );
};
