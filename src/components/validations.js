import React from "react";
import { TextField, RaisedButton } from "material-ui";
import "./product/style.css";

export const required = value => (value ? undefined : "Required");
// ---------------------------------------------------------------
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength2 = minLength(2);
// ---------------------------------------------------------------
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
// ---------------------------------------------------------------
const minNumber = min => value =>
  value <= min ? `Must be greater than ${min}` : undefined;
export const minNumber01 = minNumber(0.01);

export const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <div>
      <TextField
        {...input}
        placeholder={label}
        type={type}
        fullWidth={true}
        floatingLabelText={label}
      />
      {touched &&
        ((error && (
          <span style={{ color: "red", display: "block", padding: "10px" }}>
            {error}
          </span>
        )) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);
export const uploadField = ({
  input: { value, ...inputProps },
  label,
  type,
  meta: { touched, error, warning, omitMeta },
  ...props
}) => (
  <div>
    <div>
      <RaisedButton
        containerElement="label"
        label="Upload Image"
        fullWidth={true}
        icon={<i className="fas fa-upload" />}
        secondary={true}
      >
        <input type="file" {...inputProps} {...props} />
      </RaisedButton>
      {touched &&
        ((error && (
          <span style={{ color: "red", display: "block", padding: "10px" }}>
            {error}
          </span>
        )) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);
export const textArea = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <div>
      <TextField
        {...input}
        placeholder={label}
        type={type}
        multiLine={true}
        rows={4}
        floatingLabelText={label}
        fullWidth={true}
      />
      {touched &&
        ((error && (
          <span style={{ color: "red", display: "block", padding: "10px" }}>
            {error}
          </span>
        )) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);
