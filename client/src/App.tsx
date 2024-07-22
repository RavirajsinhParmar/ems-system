import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import { store } from "./Store/Store";
import Workspace from "./Components/Workspace";
import MyProfile from "./Components/MyProfile";
import "./App.css";
import Employees from "./Components/Employees";
import ValidateRoute from "./Utils/ValidateRoute";

function App() {
  return (
    <div className="App bg-white h-screen w-screen">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/workspace"
              element={
                <ValidateRoute roles={['super_admin', 'workspace_admin']}>
                  <Workspace />
                </ValidateRoute>
              }
            />
            <Route path="/employees" element={<Employees />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/my-profile" element={<MyProfile />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
