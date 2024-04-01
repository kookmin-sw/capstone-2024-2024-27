import React, { Component } from "react";
import "./App.css";

import Profile from "./page/Profile";
import Home from "./page/Home";
import Header from "./components/Header";

interface AppState {
  currentPage: "home" | "profile";
}
class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentPage: "home",
    };
  }

  handleProfileClick = () => {
    this.setState({
      currentPage: "profile",
    });
  };

  handleHomeClick = () => {
    this.setState({
      currentPage: "home",
    });
  };

  render() {
    const { currentPage } = this.state;

    return (
      <div className="App">
        <Header
          currentPage={currentPage}
          onProfileClick={this.handleProfileClick}
          onHomeClick={this.handleHomeClick}
        />
        {currentPage === "home" ? <Home /> : <Profile />}
      </div>
    );
  }
}

export default App;
