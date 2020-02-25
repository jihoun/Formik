import React, { Fragment } from "react";
import { Field, ErrorMessage } from "formik";

import { Row, Col, FormGroup, Input, Label } from "reactstrap";
import { Wizard } from "./Wizard";
import { TextInput } from "./TexInput";
const initialValues = {
  firstName: "",
  middleName: "",
  sirName: "",
  favoritePet: "",
  email: "",
  favoriteColor: ""
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const petOptions = [
  { value: "#ff0000", label: "❤️ Dog" },
  { value: "#00ff00", label: "💚 Cat" },
  { value: "#0000ff", label: "💙 Mouse" }
];
export const App = () => {
  return (
    <div className="App">
      <h1>Multistep / Form Wizard </h1>
      <Wizard
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          sleep(300).then(() => {
            window.alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          });
        }}
      >
        <Wizard.Page>
          {props => {
            // console.log(props, "this props 1");
            return (
              <Fragment>
                <div>
                  <Row>
                    <Col xs={{ size: 6, offset: 3 }}>
                      <FormGroup>
                        <Label for="exampleEmail">First Name</Label>
                        <Input
                          tag={Field}
                          name="firstName"
                          component="input"
                          type="text"
                          placeholder="First Name"
                        />
                        {props.errors.firstName && props.touched.firstName && (
                          <div className="input-feedback">
                            {props.errors.firstName}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs={{ size: 6, offset: 3 }}>
                      <FormGroup>
                        <Label for="exampleMiddle">Middle Name</Label>
                        <Input
                          tag={Field}
                          name="middleName"
                          component="input"
                          type="text"
                          placeholder="Middle Name"
                        />
                        <ErrorMessage
                          name="middleName"
                          component="div"
                          className="input-feedback"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={{ size: 6, offset: 3 }}>
                      <FormGroup>
                        <TextInput
                          id="sirName"
                          type="text"
                          label="Sir Name"
                          placeholder="John"
                          error={props.touched.sirName && props.errors.sirName}
                          value={props.values.sirName}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={{ size: 6, offset: 3 }}>
                      <FormGroup>
                        <div className="dropdown-wrapper">
                          <Label>Favorite Pet</Label>
                          <Input
                            tag={Field}
                            name="favoritePet"
                            component="select"
                          >
                            <option value="">Select a Pet</option>
                            {petOptions.map(op => (
                              <option value={op.value} key={op.value}>
                                {op.label}
                              </option>
                            ))}
                          </Input>
                        </div>
                        <ErrorMessage
                          name="favoritePet"
                          component="div"
                          className="input-feedback"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Fragment>
            );
          }}
        </Wizard.Page>
        <Wizard.Page
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            }
            if (!values.favoriteColor) {
              errors.favoriteColor = "Required";
            }
            return errors;
          }}
        >
          {props => {
            console.log(props, "this props last");
            return (
              <Fragment>
                <div>
                  <Row>
                    <Col xs={{ size: 6, offset: 3 }}>
                      <FormGroup>
                        <Label for="exampleMiddle">Email Address</Label>
                        <Input
                          tag={Field}
                          name="email"
                          component="input"
                          type="text"
                          placeholder="Email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="input-feedback"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={{ size: 6, offset: 3 }}>
                      <FormGroup>
                        <div className="dropdown-wrapper">
                          <Label>Favorite Color</Label>
                          <Input
                            tag={Field}
                            name="favoriteColor"
                            component="select"
                          >
                            <option value="">Select a Color</option>
                            <option value="#ff0000">❤️ Red</option>
                            <option value="#00ff00">💚 Green</option>
                            <option value="#0000ff">💙 Blue</option>
                          </Input>
                        </div>
                        <ErrorMessage
                          name="favoriteColor"
                          component="div"
                          className="input-feedback"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Fragment>
            );
          }}
        </Wizard.Page>
      </Wizard>
    </div>
  );
};
