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

const CreateProductForm = props => {
  const { handleSubmit, handleChange } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <div>
          <Field
            name="name"
            component={renderField}
            validate={[required]}
            type="text"
            placeholder="Name"
          />
        </div>
      </div>
      <div>
        <label>Description</label>
        <div>
          <Field
            name="description"
            component={textArea}
            validate={[required, minLength2]}
            type="textarea"
            placeholder="Description"
          />
        </div>
      </div>
      <div>
        <label>Price</label>
        <div>
          <Field
            name="price"
            component={renderField}
            validate={[required, minNumber01]}
            type="number"
            placeholder="Price"
          />
        </div>
      </div>
      <div>
        <label>Image</label>
        <div>
          <Field
            name="image"
            component={uploadField}
            validate={[required]}
            onChange={handleChange}
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
  form: "create-product"
})(CreateProductForm);
