/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { action_current_user } from "../../store-actions";
import { PanFlip } from "../../animations/pan-animated";
import { LoaderAnimation } from "../../animations/loader";
import { color_scheme, server_ip } from "../../constants";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
axios.defaults.baseURL = server_ip;

// plug in state
const mapStateToProps = (state) => {
  const { current_user } = state;
  return { current_user };
};

const Register = ({ current_user }) => {
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

  const handle_sign_up = (e) => {
    e.preventDefault();
    if (Object.values(user).filter((v) => !!v).length < 4)
      return Swal.fire("All fields are required", "", "error");
    //check is password is similar
    if (user?.password !== user?.password1)
      return Swal.fire("Password mismatch", "", "error");
    delete user["password1"];
    setLoading(true);
    axios
      .post(`/users`, user)
      .then((res) => {
        dispatch(action_current_user.login(res.data));
        navigate("/", { replace: true });
      })
      .catch((err) =>
        Swal.fire("Server Error - Please try again later", "", "error")
      )
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
            <strong> Momos - Register</strong>
          </h4>

          <form onSubmit={(e) => handle_sign_up(e)}>
            <div className="form-group">
              <label htmlFor="">Preferred name</label>
              <input
                type="text"
                className="form-control"
                placeholder="name"
                required
                name="name"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
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
              <label htmlFor="">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                name="password"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Confirm password</label>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                name="password1"
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
              Already registered?{" "}
              <a href="/auth/login" style={{ color: color_scheme.primary }}>
                Login
              </a>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Register);
