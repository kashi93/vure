import App from "@/layouts/App";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setFormError } from "@/helpers";
import guestAxios from "@/helpers/axiosGuest";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<{ [key: string]: string[] }>({});
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await guestAxios.post("register", {
      name,
      email,
      password,
      password_confirmation,
    });

    switch (response.status) {
      case 200:
        guestAxios
          .post("login", {
            email,
            password,
          })
          .then((response) => {
            switch (response.status) {
              case 200:
                return navigate("/home");
              default:
                return navigate("/login");
            }
          });
        break;
      case 422:
        setError(setFormError(response));
        return false;
      case 401:
        const { message } = response.data;

        setError({
          email: [message],
        });

        return false;
      default:
        return false;
    }
  };

  return (
    <App>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Register</div>
              <div className="card-body">
                <form onSubmit={submitForm}>
                  <div className="row mb-3">
                    <label
                      htmlFor="name"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      Name
                    </label>
                    <div className="col-md-6">
                      <input
                        id="name"
                        type="text"
                        className={`form-control ${error.name && "is-invalid"}`}
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        autoComplete="name"
                      />
                      <span className="invalid-feedback" role="alert">
                        <strong>{error.name}</strong>
                      </span>
                    </div>
                  </div>
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
                        className={`form-control ${error.password && "is-invalid"}`}
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        autoComplete="new-password"
                      />
                      <span className="invalid-feedback" role="alert">
                        <strong>{error.password}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="password-confirm"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      Confirm Password
                    </label>
                    <div className="col-md-6">
                      <input
                        id="password-confirm"
                        type="password"
                        className="form-control"
                        value={password_confirmation}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value)}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                  <div className="row mb-0">
                    <div className="col-md-6 offset-md-4">
                      <button type="submit" className="btn btn-primary">
                        Register
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
