import React, { Component } from "react";
import { BrowserRouter as Router , Route, Switch, Redirect, Link } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import { MDBContainer, MDBMask, MDBView, MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBInput, MDBFormInline} from "mdbreact";

import loginBg from "../images/buildings.jpg";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      modal2: false,
      modal3: false,
      modal4: false,
      radio: 2,
      startDate: new Date(),
      org: false,
      toggleShow: "d-block",
      toggleHide: "d-none",
      firstName: '',
      lastName: "",
      orgName: "",
      phone: "",
      email: '',
      password: '',
      location: '',
      doBirth: "",
      sex: '',
      photo: ''
    };
  }

  doCollapse() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  signupSubmit = () => {
    axios.post("https://betalife-backend.herokuapp.com/api/auth/signup", this.state)
    .then(response => {
      this.props.history.push("/events");
    })
    .catch(error => {
      console.log(error);
    });
  }

  // nr represents modal number
  toggle = (nr) => (e) => {
    e.preventDefault();

    // sign up submit button
    if (nr === 2) {
      this.setState({
        modal2: !this.state.modal2
      });
      this.signupSubmit();
    }
    else if (nr === 3){
      this.setState({
      modal3: !this.state.modal3
      });
    }
    else if (nr === 4){
      this.setState({
        modal4: !this.state.modal4
      });
      this.doCollapse();
    }
  }

  handleRadio = (nr) => () => {
    this.setState({
      radio: nr
    });
  }

  handleBirth = (date) => {
    this.setState({
      startDate: date
    });
  }

  handleTrainee = (event) => {
    event.preventDefault();
    this.setState({ org: false });
  }

  handleOrganizer = (event) => {
    event.preventDefault();
    this.setState({ org: true });
  }

  handleSponsor = (event) => {
    event.preventDefault();
    this.setState({ org: true });
  }
  
  handleLogin = (e) => {
    e.preventDefault();
    this.setState({
      loggedIn: true,
      modal4: false,
      collapse: false
    });
    this.doCollapse();
    this.props.history.push("/events");
  }

  render() {
    const {
      org,
      firstName,
      lastName,
      orgName,
      phone,
      email,
      password,
      location,
      doBirth,
      sex,
      photo } = this.state;
    return (
      <div>
        <MDBView src={loginBg}>
          <MDBMask overlay="black-light" className="flex-center flex-column text-white text-center">

            <MDBContainer>

              <p className="my-3">Betalife is a platform that matches users with existing opportunities in skill training. </p>

              <MDBBtn color="primary" onClick={this.toggle(2)}>
                <MDBIcon icon="user-plus" className="mr-1" /> Sign up
              </MDBBtn>

              <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} size="lg" cascading>
                <MDBModalHeader
                  toggle={this.toggle(2)}
                  titleClass="d-inline title"
                  className="text-center light-blue darken-3 white-text"
                ><MDBIcon />
                  <MDBIcon icon="user-plus" className="px-3" />
                  Sign up Form
                </MDBModalHeader>
                <MDBModalBody>
                  <h3 className="text-center"> Select Role </h3>

                  <fragment className="btn-group text-center">
                    <MDBBtn color="reset-color" className="text-primary" onClick={this.handleTrainee}>
                      Trainee
                      <MDBIcon  icon="diagnoses" className="ml-1" />
                    </MDBBtn>
                    <MDBBtn color="reset-color" className="text-primary" onClick={this.handleOrganizer}>
                      Organizer
                      <MDBIcon icon="user-tie" className="ml-1" />
                    </MDBBtn>
                    <MDBBtn color="reset-color" className="text-primary" onClick={this.handleSponsor}>
                      Sponsor
                      <MDBIcon  icon="crown" className="ml-1" />
                    </MDBBtn>
                  </fragment>

                  <div className="text-left">
                    <MDBInput
                      label="First name"
                      name="firstName"
                      type="text"
                      iconClass="dark-grey"
                      onChange={this.changeHandler}
                      value={firstName}
                    />

                    <MDBInput
                      label="last name"
                      name="lastName"
                      type="text"
                      iconClass="dark-grey"
                      onChange={this.changeHandler}
                      value={lastName}
                    />
                    {/* hide organization field based on role selected */}
                    { org !== true ?
                      <fragment className="d-none">
                        <MDBInput
                          label="Organization name"
                          Name="orgName"
                          type="text"
                          iconClass="dark-grey"
                          onChange={this.changeHandler}
                          value={orgName}
                        />
                      </fragment>
                    :
                    <fragment>
                      <MDBInput
                        label="Organization name"
                        name="orgName"
                        type="text"
                        iconClass="dark-grey"
                        onChange={this.changeHandler}
                        value={orgName}
                      />
                    </fragment>
                    }

                    <MDBInput
                      label="Phone number"
                      name="phone"
                      type="number"
                      iconClass="dark-grey"
                      onChange={this.changeHandler}
                      value={phone}
                    />

                    <MDBInput
                      label="Your email"
                      name="email"
                      type="email"
                      onChange={this.changeHandler}
                      value={email}
                    />
                    <MDBInput
                      label="Your password"
                      name="password"
                      type="password"
                      iconClass="dark-grey"
                      onChange={this.changeHandler}
                      value={password}
                    />
                    <MDBInput
                      className="d-inline"
                      label="City"
                      name="location"
                      type="text"
                      iconClass="dark-grey"
                      onChange={this.changeHandler}
                      value={location}
                    />

                    <MDBFormInline className="my-4">
                      <label className="mr-2">Date of birth</label>
                      <DatePicker anme="doBirth" className="border border-top-0 border-left-0 border-right-0 border-bottom border-dark-grey pb-1"
                        selected={this.state.startDate}
                        omChange={this.handleBirth}
                      />
                    </MDBFormInline>

                    <fragment className="form-check-inline mb-3">
                      <label className="mr-5">Sex</label>
                      <MDBInput
                        gap
                        onClick={this.handleRadio(1)}
                        checked={this.state.radio === 1 ? true : false}
                        label="Male"
                        name="sex"
                        type="radio"
                        id="radio1"
                        size="sm"
                        containerClass="mr-3"
                      />
                      <MDBInput
                        gap
                        onClick={this.handleRadio(2)}
                        checked={this.state.radio === 2 ? true : false}
                        label="Female"
                        name="sex"
                        type="radio"
                        id="radio2"
                        size="sm"
                        containerClass="mr-3"
                      />
                    </fragment>

                    <div className="input-group mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupFileAddon01">
                          Upload
                        </span>
                      </div>
                      <div className="custom-file">
                        <input
                          name="photo"
                          type="file"
                          className="custom-file-input"
                          id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01"
                        />
                        <label className="custom-file-label" htmlFor="inputGroupFile01">
                          Choose file
                        </label>
                      </div>
                    </div>

                    <div className="text-center mt-1-half">
                      <MDBBtn
                        color="info"
                        className="mb-2"
                        onClick={this.toggle(2)}
                      >
                        Sign up
                        <MDBIcon icon="paper-plane" className="ml-1" />
                      </MDBBtn>
                    </div>
                  </div>
                </MDBModalBody>
              </MDBModal>

              {/* <MDBBtn color="light" className="text-primary" onClick={this.toggle(3)}>
                Login
                <MDBIcon far icon="user" className="ml-1" />
              </MDBBtn> */}

              <MDBBtn href="/events" color="light" className="text-primary">
                Login
                <MDBIcon far icon="user" className="ml-1" />
              </MDBBtn>

              {/* <MDBBtn color="light" className="text-primary" href="/events">
                Take a tour
                <MDBIcon far icon="user" className="ml-1" />
              </MDBBtn> */}


              <MDBModal isOpen={this.state.modal3} toggle={this.toggle(3)} size="md" cascading>
                <MDBModalHeader
                  toggle={this.toggle(3)}
                  titleClass="d-inline title"
                  className="text-center light-blue darken-3 white-text"
                >
                  <MDBIcon icon="user" className="px-3" />
                  Login Form
                </MDBModalHeader>
                <MDBModalBody>
                  <MDBInput label="Your email"
                    type="email"
                  />
                  <MDBInput
                    label="Your password"
                    type="password"
                    iconClass="dark-grey"
                  />
                  <div className="text-center mt-1-half">
                    <MDBBtn
                      color="info"
                      className="mb-2"
                      onClick={this.toggle(3)}
                    >
                      login
                      <MDBIcon icon="paper-plane" className="ml-1" />
                    </MDBBtn>
                  </div>
                </MDBModalBody>
              </MDBModal>

          </MDBContainer>
        </MDBMask>
      </MDBView>
      </div>
    );
  }
}

export default Signup;
