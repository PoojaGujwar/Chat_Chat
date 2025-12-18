import { BrowserRouter, Route,Routes } from "react-router-dom";
import Register from "./components/Register";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { useState } from "react";
import Chat from "./components/Chat";
import Login from "./components/Login";
import "./styles.css"


function App() {
  const [user,setUser] = useState(null)
  console.log(user)
  return (
    <div className="app">
      <h1>Chat App</h1>
    {!user?(
       <div className="container mt-5 text-center">
          <div className="row">
            <div className="col-md-6">
              <Register setUser={setUser} />
            </div>
            <div className="col-md-6">
              <Login setUser={setUser} />
            </div>
          </div>
        </div>
    ):<Chat user={user}/>}
    </div>
  );
}

export default App;
