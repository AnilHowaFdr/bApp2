import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
// import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const auth = getAuth();
  const [passShow, setPassShow] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [userErr, setUserErr] = useState({
    emailErr: "",
    passwordErr: "",
  });
  const handleSubmit = () => {
    if (!user.email) {
      setUserErr({ ...userErr, emailErr: "Email is required!" });
    } else if (!user.password) {
      setUserErr({ ...userErr, passwordErr: "Password is required!" });
    } else {
      // setLoading(true);
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          // dispatch(userData(res.user));
          toast.success("Login successfull!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
          console.log(res.user);
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code == "auth/invalid-email") {
            setUserErr({
              ...userErr,
              emailErr: "Invalid Email!",
            });
          } else if (error.code == "auth/invalid-credential") {
            setUserErr({
              ...userErr,
              passwordErr: "Authentication failed!",
            });
          } else {
            console.log(error.code);
            console.log(error.message);
          }
        });
    }
  };
  return (
    <section className="bg-slate-700">
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
      <div className="container flex items-center justify-center h-screen">
        <div className="containerForm">
          <div className="heading">Sign In</div>
          <div className="form">
            <input
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
                setUserErr("");
              }}
              required=""
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={user.email}
            />
            {userErr.emailErr && (
              <p className="text-red-500">{userErr.emailErr}</p>
            )}
            <div className="relative">
              <input
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                  setUserErr("");
                }}
                required=""
                className="input"
                type={passShow ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={user.password}
              />
              {passShow ? (
                <IoMdEye
                  onClick={() => setPassShow(false)}
                  className="absolute text-gray-600 top-11 right-1 -translate-y-1/2 text-2xl cursor-pointer"
                />
              ) : (
                <IoMdEyeOff
                  onClick={() => setPassShow(true)}
                  className="absolute text-gray-600 top-11 right-1 -translate-y-1/2 text-2xl cursor-pointer"
                />
              )}
            </div>

            {userErr.passwordErr && (
              <p className="text-red-500">{userErr.passwordErr}</p>
            )}
            <span className="forgot-password">
              <a href="#">Forgot Password ?</a>
            </span>
            <button
              onClick={handleSubmit}
              className="login-button"
              type="submit"
            >
              Sign In
            </button>
            <p className="signin">
              Now Here?
              <Link className="link pl-1" to="/register">
                Create Account
              </Link>
            </p>
          </div>
          {/* <div className="social-account-container">
            <span className="title">Or Sign in with</span>
            <div className="social-accounts">
              <button className="social-button google">
                <FaGoogle className="text-white" />
              </button>
              <button className="social-button apple">
                <FaFacebookF className="text-white" />
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Login;
