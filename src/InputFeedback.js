import React from "react";

/**
 *
 * Custom Inputs for sirName only
 */
export const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;
