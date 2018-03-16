import React from "react";
import { Field, reduxForm, Form } from "redux-form";
import {
  maxLength,
  minLength2,
  required,
  email,
  renderField
} from "./validations";

const RegisterForm = props => {
  const { handleSubmit, submitting } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <div>
          <Field
            name="firstName"
            component={renderField}
            validate={[required, minLength2]}
            type="text"
            placeholder="First Name"
          />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field
            name="lastName"
            component="input"
            component={renderField}
            validate={[required, minLength2]}
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <Field
            name="pass"
            component="input"
            component={renderField}
            validate={required}
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </div>
    </Form>
  );
};

export default reduxForm({
  form: "register" // a unique identifier for this form
})(RegisterForm);
