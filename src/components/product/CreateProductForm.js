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
import { RaisedButton, LinearProgress } from "material-ui";
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
      <div className="pb-5 w-100">
        <div>
          {props.loading ? (
            <LinearProgress mode="indeterminate" color="red" />
          ) : null}
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
        {props ? (
          props.image ? (
            <img src={props.image} alt="loading-bar" />
          ) : null
        ) : null}
      </div>
      <div>
        <RaisedButton
          icon={<i className="fas fa-location-arrow white" />}
          backgroundColor="#a4c639"
          type="submit"
          fullWidth={true}
          label="Submit"
          labelColor="#ffffff"
        />
      </div>
    </Form>
  );
};

export default reduxForm({
  form: "create-product"
})(CreateProductForm);
