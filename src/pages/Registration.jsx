import React, { useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { TbCloverFilled } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Registration = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userErr, setUserErr] = useState({
    nameErr: "",
    emailErr: "",
    passwordErr: "",
  });
  const handleSubmit = () => {
    if (!user.name) {
      setUserErr({ ...userErr, nameErr: "Name is required" });
    } else if (!user.email) {
      setUserErr({ ...userErr, emailErr: "Email is required" });
    } else if (!user.password) {
      setUserErr({ ...userErr, passwordErr: "Password is required" });
    } else {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          updateProfile(auth.currentUser, {
            displayName: user.name,
            photoURL: "/user.jpg",
          })
            .then(() => {
              sendEmailVerification(auth.currentUser).then(() => {
                setUser({
                  name: "",
                  email: "",
                  password: "",
                });
                setLoading(false);
                toast.success("Please verify your email!");
                setTimeout(() => navigate("/login"), 2000);
              });
            })
            .then(() => {
              console.log(res.user);
            })
            .catch((error) => {
              console.log(error.code);
            });
        })
        .catch((error) => {
          setLoading(false);
          if (error.code == "auth/invalid-email") {
            setUserErr({ ...user, emailErr: "Email is invalid" });
          } else if (error.code == "auth/email-already-in-use") {
            setUserErr({ ...user, emailErr: "Email is already used" });
          } else if (error.code == "auth/weak-password") {
            setUserErr({
              ...user,
              passwordErr: "Password should be atleast 6 characters!",
            });
          } else {
            console.log(error.code);
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
                setUser({ ...user, name: e.target.value });
                setUserErr("");
              }}
              required=""
              className="input"
              type="name"
              name="name"
              id="name"
              placeholder="Name"
              value={user.name}
            />
            {userErr.nameErr && (
              <p className="text-red-500">{userErr.nameErr}</p>
            )}
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
            <input
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                setUserErr("");
              }}
              required=""
              className="input relative"
              type={passShow ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={user.password}
            />

            {passShow ? (
              <IoMdEye
                onClick={() => setPassShow(false)}
                className="absolute text-black top-7 right-0 -translate-y-1/2 text-2xl cursor-pointer"
              />
            ) : (
              <IoMdEyeOff
                onClick={() => setPassShow(true)}
                className="absolute text-black top-7 right-0 -translate-y-1/2 text-2xl cursor-pointer"
              />
            )}

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
              disabled={loading}
            >
              {loading ? <BarLoader color="white" /> : "Sign In"}
            </button>
          </div>
          <div className="social-account-container">
            <span className="title">Or Sign in with</span>
            <div className="social-accounts">
              <button className="social-button google">
                <FaGoogle className="text-white" />
              </button>
              <button className="social-button apple">
                <FaFacebookF className="text-white" />
              </button>
            </div>
          </div>
          <p className="signin">
            Already have an account ?
            <Link className="link" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Registration;
