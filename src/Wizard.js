import React from "react";
import * as Yup from "yup";
import { Row, Col } from "reactstrap";
import { Formik } from "formik";

const Step1Schema = Yup.object().shape({
  firstName: Yup.string().required("First Name Is Required"),
  middleName: Yup.string().required("Middle Name Is Required"),
  sirName: Yup.string().required("Sir Name Is Required"),
  favoritePet: Yup.string().required("Pet is required")
});
const Step2Schema = Yup.object().shape({
  email: Yup.string().required("Email Is Required"),
  favoriteColor: Yup.string().required("Favorite color required")
});

const schemaArray = [Step1Schema, Step2Schema];

export class Wizard extends React.Component {
  static Page = ({ children, parentState }) => {
    return children(parentState);
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues
    };
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }));

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      bag.setSubmitting(false);
      this.next(values);
    }
  };

  arrayProgress = [
    {
      title: "Certificate Request",
      description: "Your company details & certificate options"
    },
    {
      title: "Domain Verification",
      description: "Show you have control of your domain"
    },
    {
      title: "Complete",
      description: "Process complete & next steps"
    }
  ];
  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    // console.log(activePage, "activePage");
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        // validate={this.validate}
        // validationSchema={this.schemaArray[page]}
        validationSchema={schemaArray[page]}
        onSubmit={this.handleSubmit}
      >
        {props => {
          const { handleSubmit, isSubmitting } = props;
          return (
            <form onSubmit={handleSubmit}>
              <div className="progressbar-wrapper">
                <ol className="progressbar">
                  {this.arrayProgress.map((item, index) => {
                    return (
                      <li className={page >= index ? "active" : ""} key={index}>
                        <h2>{item.title}</h2>
                        <p className="text--size-small">{item.description}</p>
                      </li>
                    );
                  })}
                </ol>
              </div>
              {React.cloneElement(activePage, { parentState: { ...props } })}
              <Row>
                <Col xs={{ size: 6, offset: 3 }}>
                  <div className="buttons">
                    {page > 0 && (
                      <button
                        type="button"
                        className="secondary"
                        onClick={this.previous}
                      >
                        « Previous
                      </button>
                    )}

                    {!isLastPage && <button type="submit">Next »</button>}
                    {isLastPage && (
                      <button type="submit" disabled={isSubmitting}>
                        Submit
                      </button>
                    )}
                  </div>
                </Col>
              </Row>
            </form>
          );
        }}
      </Formik>
    );
  }
}
