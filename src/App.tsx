import React, { Component } from "react";
import "./App.css";

import Profile from "./page/Profile";
import Home from "./page/Home";
import Header from "./components/Header";

interface AppState {
  currentPage: "home" | "profile";
  isReadOnly?: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentPage: "home",
      isReadOnly: true,
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

  handleEditClick = () => {
    this.setState((prevState) => ({
      isReadOnly: !prevState.isReadOnly,
      //setReadOnly: true,
    }));
  };

  render() {
    const { currentPage, isReadOnly } = this.state;

    return (
      <div className="App">
        <Header
          currentPage={currentPage}
          onProfileClick={this.handleProfileClick}
          onHomeClick={this.handleHomeClick}
          onEditClick={this.handleEditClick}
          isReadOnly={isReadOnly}
        />
        {currentPage === "home" ? (
          <Home />
        ) : (
          <Profile onEditClick={this.handleEditClick} isReadOnly={isReadOnly} />
        )}
      </div>
    );
  }
}

export default App;
