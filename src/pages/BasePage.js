import React from "react";
import { NavBar, Footer } from "ot-ui";

const BasePage = ({ children }) => {
  return (
    <div>
      <NavBar name="Platform" />
      {children}
      <Footer />
    </div>
  );
};

export default BasePage;
