import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import TinderCards from "./components/TinderCards";
import Profile from "./page/Profile";

import logo from "./logo.svg";

// const App: React.FC = () => {
//   return (
//     <div className="App">
//     <Router>
//         <Header />
//         <h1>??????adshjkfgjsklkl</h1>
//         <Routes>
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//            <h1 className="App-title">Welcome to React</h1>
//          </header>
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/" element={ <Header />} />
//         </Routes>
//     </Router>
//       </div>
//   );


// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <Header />
//         <h1>??????adshjkfgjsklkl</h1>
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
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
         <h1>??????adshjkfgjsklkl</h1>
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
