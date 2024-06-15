import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { HiHomeModern } from "react-icons/hi2";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from '../SignupFormModal';
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  const home = () => {
    const path = `/`;
    navigate(path);
  };

  return (
    <nav>
      <ul className="navigation">
        <li>
          <div className="logo-container" onClick={home}>
            <HiHomeModern className="logo" />
            <h1>Getaway</h1>
          </div>
        </li>
        {sessionUser ? (
          <li>
            <NavLink to="/spots/new">Create a New Spot</NavLink>
          </li>
        ) : (
          ""
        )}
        {isLoaded && (
          <li>
            <div className="button-container">
              <ProfileButton user={sessionUser} />
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
