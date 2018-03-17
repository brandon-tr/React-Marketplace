import React from "react";
import { Field, reduxForm, Form } from "redux-form";
import { minLength2, required, email, renderField } from "../validations";

const LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component={renderField}
            validate={[required, email]}
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <Field
            name="pass"
            component={renderField}
            validate={[required, minLength2]}
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </Form>
  );
};

export default reduxForm({
  form: "login"
})(LoginForm);
