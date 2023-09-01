import { Link, useNavigate } from "react-router-dom";
import { useAuthenticateContext } from "@/middleware/Authenticate";
import authAxios from '@/helpers/authAxios';


export default function Navbar() {
  let appName;
  const { user, setUser } = useAuthenticateContext();
  const navigate = useNavigate();
  const logout = async (e: any) => {
    e.preventDefault();
    const response = await authAxios.get("logout");

    switch (response.status) {
      case 200:
        setUser(null);
        navigate("/");
        break;
      default:
        break;
    }

  }
  if (document.querySelector('meta[name="app-name"]')) {
    const val = document
      .querySelector('meta[name="app-name"]')
      ?.getAttribute("content");

    if ((val || "").trim().length > 0) {
      appName = val;
    }
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {appName}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left Side Of Navbar */}
          <ul className="navbar-nav me-auto"></ul>
          {/* Right Side Of Navbar */}
          <ul className="navbar-nav ms-auto">
            {/* Authentication Links */}
            {(() => {
              if (user != null) {
                return <li className="nav-item dropdown">
                  <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {user.name}
                  </a>
                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#" onClick={(e) => logout(e)}>
                      Logout
                    </a>
                  </div>
                </li>
              }
              return (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )
            })()}
          </ul>
        </div>
      </div>
    </nav>
  )
}
