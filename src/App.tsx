import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import Header from "./components/Header";
import TinderCards from "./components/TinderCards";
import Profile from "./page/Profile";

import logo from "./logo.svg";
import SwipeButtons from "./components/SwipeButtons";

// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <Router>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <>
//                   <Header />
//                   <TinderCards />
//                   <SwipeButtons />
//                   <h1>??프로젝트 설명??</h1>
//                   <header className="App-header">
//                     <img src={logo} className="App-logo" alt="logo" />
//                     <h1 className="App-title">Welcome to React</h1>
//                   </header>
//                 </>
//               }
//             />
//           </Routes>
//         </Router>

//         {/* <Route path="/profile" element={<Profile />} /> */}
//       </div>
//     );
//   }
// }

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <TinderCards />
        <SwipeButtons />
        <h1>??프로젝트 설명??</h1>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        {/* <Route path="/profile" element={<Profile />} /> */}
      </div>
    );
  }
}

export default App;
