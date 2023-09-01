import App from "@/layouts/App";
import { useState } from "react";
import { setFormError } from "@/helpers";
import { Link, useNavigate } from "react-router-dom";
import guestAxios from "@/helpers/axiosGuest";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ [key: string]: string[] }>({});
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await guestAxios.post("login", {
      email,
      password,
    });

    switch (response.status) {
      case 200:
        return navigate("/home");
      case 422:
        setError(setFormError(response));
        break;
      case 401:
        const { message } = response.data;

        setError({
          email: [message],
        });
        break;
      default:
        break;
    }
  };

  return (
    <App>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Login</div>
              <div className="card-body">
                <form onSubmit={submitForm}>
                  <div className="row mb-3">
                    <label
                      htmlFor="email"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      Email Address
                    </label>
                    <div className="col-md-6">
                      <input
                        id="email"
                        type="email"
                        className={`form-control ${error.email && "is-invalid"}`}
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                      <span className="invalid-feedback" role="alert">
                        <strong>{error.email}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="password"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      Password
                    </label>
                    <div className="col-md-6">
                      <input
                        id="password"
                        type="password"
                        className={`form-control ${error.password && "is-invalid" }`}
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        name="password"
                        autoComplete="current-password"
                      />
                      <span className="invalid-feedback" role="alert">
                        <strong>{error.password}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 offset-md-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="remember"
                          id="remember"
                        />
                        <label className="form-check-label" htmlFor="remember">
                          Remember Me
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-0">
                    <div className="col-md-8 offset-md-4">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </App>
  );
}
