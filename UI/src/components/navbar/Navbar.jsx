import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, AUTH_ACTIONS } from '../../context/AuthContext';

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogoutClick = async e => {
    e.preventDefault();
    try {
      dispatch({ type: AUTH_ACTIONS.RESET_AUTH });
      navigate('/');
    } catch (err) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: err.response.data });
    }
  };

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className="logo">HotelBooking</span>
        </Link>
        {user ? (
          <div className="navItems">
            {user.username}
            <button className="navButton" onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton" onClick={handleClick}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
