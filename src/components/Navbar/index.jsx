import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

import { useAuthValue } from "../../context/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logOut } = useAuthentication();

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Mini<span>Blog</span>
      </NavLink>

      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Inicio
          </NavLink>
        </li>
        {user && (
          <>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/posts/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Novo post
              </NavLink>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastre-se
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        {user && <button onClick={logOut}>Sair</button>}
      </ul>
    </nav>
  );
};

export default Navbar;
