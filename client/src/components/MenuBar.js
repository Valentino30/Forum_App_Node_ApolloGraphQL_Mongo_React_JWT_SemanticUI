import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import React, { useState, useContext } from "react";

import { AuthContext } from "../context/auth";

const MenuBar = () => {
  const { pathname } = window.location;
  const { user, logout } = useContext(AuthContext);
  const path = pathname === "/" ? "home" : pathname.substr(1);

  const [activeMenuButton, setActiveMenuButton] = useState(path);

  const handleItemClick = (e, { name }) => setActiveMenuButton(name);

  return (
    <Menu pointing secondary size="massive" color="black">
      {user ? (
        <Menu.Item active name={user.username.toUpperCase()} as={Link} to="/" />
      ) : (
        <Menu.Item
          name="home"
          active={activeMenuButton === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
      )}
      {user ? (
        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={logout} as={Link} to="/" />
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeMenuButton === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeMenuButton === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      )}
    </Menu>
  );
};

export default MenuBar;
