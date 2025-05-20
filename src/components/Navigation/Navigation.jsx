import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => (
  <header className={css.header}>
    <nav>
      <ul className={css.nav_list}>
        <li>
          <NavLink to="/" className={css.nav_item}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={css.nav_item}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navigation;
