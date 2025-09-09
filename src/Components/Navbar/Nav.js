import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={"/gates"}>Gates</Link>
            <br />
            <Link to={"/zones"}>zones</Link>
            <br />

            <Link to={"/tickets"}>tickets</Link>
            <br />

            <Link to={"/checkpoint"}>checkpoint</Link>
            <br />

            <Link to={"/checkin"}>checkin</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
