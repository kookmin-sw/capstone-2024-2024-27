import React, { useState, useEffect } from "react";
import "./App.css";

import Profile from "./page/Profile";
import Home from "./page/Home";
import Header from "./components/Header";
import Login from "./page/Login";

interface AppState {
  currentPage: String;
  isReadOnly: boolean;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentPage: "home",
    isReadOnly: true,
  });
  const { currentPage, isReadOnly } = state;

  const handleProfileClick = () => {
    setState((prevState) => ({
      ...prevState,
      currentPage: "profile",
    }));
  };

  const handleHomeClick = () => {
    setState((prevState) => ({
      ...prevState,
      currentPage: "home",
    }));
  };

  const handleEditClick = () => {
    setState((prevState) => ({
      ...prevState,
      isReadOnly: !prevState.isReadOnly,
    }));
  };

  return (
    <div className="App">
      <Header
        currentPage={currentPage}
        onProfileClick={handleProfileClick}
        onHomeClick={handleHomeClick}
        onEditClick={handleEditClick}
        isReadOnly={isReadOnly}
      />
      {currentPage === "home" ? (
        <Home />
      ) : (
        <Profile onEditClick={handleEditClick} isReadOnly={isReadOnly} />
      )}
    </div>
  );
};

// const temp = ({}) => {
//   const [isLogin, setIsLogin] = useState(false);
//   const [currentPage, setCurrentPage] = useState("login");
//   const [accessToken, setAccessToken] = useState("");
//   const [isReadOnly, setIsReadOnly] = useState(true);

//   const handleLogin = (token: string) => {
//     setAccessToken(token);
//     setIsLogin(true);
//     setCurrentPage("home");
//   };

//   const handleEditClick = () => {
//     setIsReadOnly((prev) => !prev);
//   };

//   useEffect(() => {
//     if (window && currentPage === "login") {
//       const params = new URLSearchParams(window.location.search).get("code");
//       if (params) {
//         console.log("params: ", params);
//         //console.log(params);
//         setIsLogin(true);
//         setCurrentPage("home");
//       }
//     }
//   }, [currentPage]);

//   return (
//     <div className="App">
//       {isLogin ? (
//         <>
//           <Header
//             currentPage={currentPage}
//             onProfileClick={() => setCurrentPage("profile")}
//             onHomeClick={() => setCurrentPage("home")}
//           />
//           {currentPage === "home" ? (
//             <Home />
//           ) : (
//             <Profile isReadOnly={isReadOnly} /> // Pass the isReadOnly prop correctly
//           )}
//         </>
//       ) : (
//         <Login onLogin={handleLogin} />
//       )}
//     </div>
//   );
// };

class oldApp extends React.Component<{}, AppState> {
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
