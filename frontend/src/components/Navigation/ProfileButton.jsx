import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi2";
import { HiOutlineMenu } from "react-icons/hi";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate("/")
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu} className="menu-button">
        <HiOutlineMenu className="menu-icon" />
        <HiUserCircle className="user-icon" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="dropdown-content">
            <div className="user-info">
              <li>Hello, {user.firstName}</li>
              <li>{user.email}</li>
            </div>
            <div className="manage-spots">
              <Link to={"/spots/current"} className="manage-link" color="black">
                Manage Spots
              </Link>
            </div>
            <div className="logout-button-container">
              <li>
                <button onClick={logout} className="logout-button">
                  Log Out
                </button>
              </li>
            </div>
          </div>
        ) : (
          <div className="dropdown-content">
            <OpenModalButton
              itemText="Sign Up"
              onButtonClick={closeMenu}
              modalComponent={<SignupFormModal />}
              className="signup-button"
            />
            <OpenModalButton
              itemText="Log In"
              onButtonClick={closeMenu}
              modalComponent={<LoginFormModal />}
              className="login-button"
            />
          </div>
        )}
      </ul>
    </>
  );
};

export default ProfileButton;
