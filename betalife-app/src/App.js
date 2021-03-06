import React, { Component } from "react";
import { BrowserRouter as Router , Route, Switch, Redirect, Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

import { MDBContainer } from "mdbreact";

import About from "./components/About";
import Contact from "./components/Contact";
import Events from "./components/Events";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Message from "./components/Message";
import Dashboard from "./components/Admin/Dashboard";
import Announcement from "./components/Announcement";
import Funds from "./components/Funds";

class App extends Component {
  constructor(props) {
    super(props);

    const data = localStorage.getItem("currentState");
    if(data){
      this.state = JSON.parse(data);
    }
    else {
      this.state = {
        collapse: false,
        isWideEnough: false,
        modal2: false,
        modal3: false,
        modal4: false,
        radio: 2,
        startDate: new Date(),
        org: false,
        showSignupPg: "d-block",
        showEventPg: "d-none",
        loggedIn: false,
        redirect: null,
        showContent: false,
        detailContainer: ''
      };
    }
    this.handleDisplay = this.handleDisplay.bind(this);
    this.controlViewEventDetail = this.controlViewEventDetail.bind(this);
  }

  doCollapse() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  // nr represents modal number
  toggle = (nr) => (e) => {
    e.preventDefault();

    if (nr === 2) {
      this.setState({
        modal2: !this.state.modal2
      });

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

  handleDisplay = () => {
    // localStorage.setItem("currentState", JSON.stringify(this.state));
    // localStorage.clear();
    // this.setState({
    //   // showEventPg: "d-block",
    //   // showSignupPg: "d-none",
    // });
    this.doCollapse();
  }

  handleLogin = (e) => {
    e.preventDefault();
    // localStorage.setItem("currentState", JSON.stringify(this.state));
    // localStorage.clear();
    this.setState({
      loggedIn: true,
      modal4: false,
      collapse: false
    });
    this.doCollapse();
  }

  handleLogout = (e) => {
    e.preventDefault();
    this.setState({
      // loggedIn: false,
      // // showEventPg: "d-block",
      // // showSignupPg: "d-none",
      // redirect: "/Signup"
    });
    // localStorage.setItem("currentState", JSON.stringify(this.state));
    this.doCollapse();
    if(this.state.redirect){
    return <Redirect to={this.state.redirect} />
    }
    return(
      <Signup />
    )
    // this.props.history.push("/")
  }

  closeNav = (e) => {
    // e.preventDefault();
    if (this.state.collapse === true) {
      this.setState({
        collapse: false
      });
    }
  }

  controlViewEventDetail = (detailContainer) => {
    this.setState({
      detailContainer: detailContainer
    })
  }
// ping
  render() {
    const { org } = this.state;
    const {showEvent} = this.state;
    const {collapse} = this.state;
    const {showContent} = this.state
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route path="/" render={
              (props) => {
                return (
                  <div>

                    {localStorage.getItem("currentUser") !== null ? <Redirect to="/Event"/>  :
                    <Signup /> }
                  </div>
                )
              }
            } exact />
            <main>
              <MDBContainer>
                <Route
                  path={"/About"}
                  render={props => (
                    <About {...props} exact />
                  )} />
                <Route
                  path={"/Contact"}
                  render={props => (
                    <Contact {...props} exact />
                  )} />
                <Route
                  path={"/Events"}
                  render={props => (
                    <Events {...props} eventDetailsProps={this.controlViewEventDetail} exact />
                  )} />                  
                {/* <Route path="/EventDetails"
                  render= {
                    (props) => {
                  return (
                  <EventDetails {...props} eventDetailsProps={this.state.detailContainer} exact />
                  )
                }} /> */}
                <Route
                  path={"/Funds"}
                  render={props => (
                    <Funds {...props} exact />
                  )} />
                <Route
                  path={"/Profile"}
                  render={props => (
                    <Profile {...props} exact />
                  )} />
                <Route
                  path={"/Message"}
                  render={props => (
                    <Message {...props} exact />
                  )} />
                <Route
                  path={"/Announcement"}
                  render={props => (
                    <Announcement {...props} exact />
                  )} />
                <Route
                  path={"/Dashboard"}
                  render={props => (
                    <Dashboard {...props} exact />
                  )} />
                <Footer />
                <Route
                  path={"/Footer"}
                  render={props => (
                    <Footer {...props} exact />
                  )} />
                {/* <Footer /> */}
              </MDBContainer>
            </main>

            <Route
              path="*"
              component={()=> "404 ! PAGE NOT FOUND"} />
          </Switch>
        </Router>
      </div>
        );
  }
}

export default App;
