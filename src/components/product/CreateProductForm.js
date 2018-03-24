import React from "react";
import { Field, reduxForm, Form } from "redux-form";
import {
  minLength2,
  required,
  renderField,
  textArea,
  minNumber01,
  uploadField
} from "../validations";
import { RaisedButton } from "material-ui";
import "./style.css";

const CreateProductForm = props => {
  const { handleSubmit, handleChange } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div className="pb-5">
        <div>
          <Field
            name="name"
            component={renderField}
            validate={[required]}
            type="text"
            label="Name"
          />
        </div>
      </div>
      <div className="pb-5">
        <div>
          <Field
            name="description"
            component={textArea}
            validate={[required, minLength2]}
            type="textarea"
            label="Description"
          />
        </div>
      </div>
      <div className="pb-5">
        <div>
          <Field
            name="price"
            component={renderField}
            validate={[required, minNumber01]}
            type="number"
            label="Price"
          />
        </div>
      </div>
      <div className="pb-5">
        <div>
          <Field
            name="image"
            component={uploadField}
            validate={[required]}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="pb-5 products">
        {props ? props.image ? <img src={props.image} /> : null : null}
      </div>
      <div>
        <RaisedButton primary={true} type="submit" fullWidth={true}>
          Submit
        </RaisedButton>
      </div>
    </Form>
  );
};

export default reduxForm({
  form: "create-product"
})(CreateProductForm);
