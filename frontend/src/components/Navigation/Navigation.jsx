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
    <nav className="nav-container">
      <ul className="navigation">
        <li>
          <div className="logo-container" onClick={home}>
            <HiHomeModern className="logo" />
            <h1 className="home">Getaway</h1>
          </div>
        </li>
        
        {isLoaded && (
          sessionUser ? (
            <div className="action-container">
              <li>
                <NavLink to="/spots/new">Create a New Spot</NavLink>
              </li>
              <li>
                <ProfileButton user={sessionUser} />
              </li>
            </div>
          ) : (
            <div className="action-container">
              <li>
                <ProfileButton user={sessionUser} />
              </li>
            </div>
          )
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
