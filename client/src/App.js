import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
import AlertState from "./context/alert/AlertState";
import UserimgState from "./context/userimg/UserimgState";
import Profile from "./components/pages/Profile";
import Footer from "./components/layout/Footer";
import "./App.css";
import styled from "styled-components";
import breakpoints from "./essentials/screensize";
import FileUpload from "./components/UserImage/FileUpload";

const Container = styled.div`
  padding: 10vw 3vw 2vw 3vw;
  justify-content: center;
  @media (max-width: ${breakpoints.sm}px) {
    padding: 26vw 6vw;
  }
`;

const App = () => {
  return (
    <UserimgState>
      <AlertState>
        <Router>
          <Fragment>
            <Navbar />
            <Container>
              <Alerts />
              <Switch>
                <Route exact path="/" component={Profile} />
                <Route exact path="/userimage" component={FileUpload} />
              </Switch>
            </Container>
            <Footer />
          </Fragment>
        </Router>
      </AlertState>
    </UserimgState>
  );
};

export default App;
