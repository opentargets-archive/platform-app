import React from "react";
import { NavBar, Footer } from "ot-ui";

import { externalLinks } from "../constants";

const BasePage = ({ children }) => {
  return (
    <div>
      <NavBar name="Platform" />
      {children}
      <Footer externalLinks={externalLinks} />
    </div>
  );
};

export default BasePage;
