import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { action_current_user } from "../../store-actions";
import { PanFlip } from "../../animations/pan-animated";
import { LoaderAnimation } from "../../animations/loader";
import { color_scheme, server_ip } from "../../constants";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = server_ip;

// plug in state
const mapStateToProps = (state) => {
  const { current_user } = state;
  return { current_user };
};
const Login = ({ current_user }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  //component hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //app handler functions
  const handleInputChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submit_Login = (e) => {
    e.preventDefault();
    if (Object.values(user).filter((v) => !!v).length < 2)
      return Swal.fire("Username and password are required", "", "error");
    setLoading(true);
    axios
      .post(`/users/login`, user)
      .then((res) => {
        dispatch(action_current_user.login(res.data));
        navigate("/", { replace: true });
      })
      .catch((err) => {
        if (err?.response) return Swal.fire(err.response.data, "", "warning");
        else
          Swal.fire(
            "System error - The server gave an invalid 500 response",
            "",
            "error"
          );
      })
      .finally(() => setLoading(false));
  };

  //use effect
  useEffect(() => {
    if (current_user.currentUser) navigate("/");
  }, []);
  return (
    <div className="w-100 wrapper d-flex align-items-center">
      <div className="w-100 px-2 px-md-0">
        <div className="col-md-4 col-sm-11 mx-auto card px-4 pb-4">
          <div className="my-3 w-100 d-flex justify-content-center">
            {!loading ? <PanFlip size={180} /> : <LoaderAnimation />}
          </div>
          <h4 className="mb-3" style={{ color: color_scheme.primary }}>
            <strong> Momos - Login</strong>
          </h4>

          <form onSubmit={(e) => submit_Login(e)}>
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email address"
                required
                name="email"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Password </label>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                name="password"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            {!loading ? (
              <div className="mt-5">
                <button className="btn btn-primary btn-block">
                  <b>Login</b>
                </button>
              </div>
            ) : null}
          </form>
          <br />
          <br className="d-none d-md-block" />
          <div>
            <label htmlFor="" className="">
              If you don not have account.{" "}
              <a href="/auth/signup" style={{ color: color_scheme.primary }}>
                Signup
              </a>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Login);
