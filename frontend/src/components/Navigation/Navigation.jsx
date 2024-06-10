import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { HiHomeModern } from "react-icons/hi2";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from '../SignupFormModal';
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  // const sessionLinks = sessionUser ? (
  //   <li>
  //     <ProfileButton user={sessionUser} />
  //   </li>
  // ) : (
  //   <>
  //     <li>
  //       <OpenModalButton
  //         buttonText="Log In"
  //         modalComponent={<LoginFormModal />}
  //       />
  //     </li>
  //     <li>
  //       <OpenModalButton
  //         buttonText="Sign Up"
  //         modalComponent={<SignupFormModal />}
  //       />
  //     </li>
  //   </>
  // );
  console.log(sessionUser)
  return (
    <nav>
      <ul className="navigation">
        <li>
          <div className="logo-container">
            <HiHomeModern className="logo"/>
            <NavLink to="/" className={"home"}>
              Getaway
            </NavLink>
          </div>
        </li>
        {sessionUser ? 
        <li>
          <NavLink to="/spots/new">
            Create a New Spot
          </NavLink>
        </li> : ""}
        {isLoaded && (
          <li>
            <div className="button-container">
              <ProfileButton user={sessionUser}/>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
