import React from "react";
import AppContext from "./Auth/AppContext";
import { AuthProvider } from "./Auth/AuthConfig";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import PageRouter from "./app/Routes/Routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <AppContext.Provider>
      <AuthProvider>
        <Router>
          <PageRouter />
        </Router>
      </AuthProvider>
      <Toaster />
    </AppContext.Provider>
  );
};

export default App;
