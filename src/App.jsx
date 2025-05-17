import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="/friends" element={<Friends />} />
          <Route path="/chat" element={<Chat />} /> */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
