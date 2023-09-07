import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/sharedrecipes">Shared Recipes</NavLink>
      <NavLink to="/myrecipes">My Recipes</NavLink>
    </div>
  );
};
export default NavBar;
