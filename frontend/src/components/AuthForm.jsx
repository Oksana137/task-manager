import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { isAuthorize } from "../units/network";

const AuthForm = ({ buttonText, redirectPath, apiCall, regLink }) => {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    ok: true,
    emailError: "",
    passError: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^.{8,}$/;

    if (!emailRegex.test(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        emailError: "Invalid Email",
      }));
      isValid = false;
    }

    if (!passRegex.test(formData.password)) {
      setErrors((prev) => ({
        ...prev,
        passError: "Password must be at least 8 characters.",
      }));
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
      ok: true,
      emailError: "",
      passError: "",
    });

    const isValid = validate();
    if (!isValid) {
      return;
    }

    try {
      await apiCall(formData);

      isAuthorize().then((status) => {
        setIsAuth(status);
      });

      navigate(redirectPath);
    } catch (error) {
      setErrors((prev) => ({ ...prev, ok: false }));
    }
  };

  return (
    <form className="card flex flex-col gap-6 p-8 w-96 bg-base-100 shadow-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col">
        <label className="input input-bordered flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            name="email"
            className="grow"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <p className="text-red-500">{errors.emailError}</p>
      </div>
      <div className="flex flex-col">
        <label className="input input-bordered flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            name="password"
            className="grow"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <p className="text-red-500">{errors.passError}</p>
        {!errors.ok && <p className="text-red-500 pt-4"> Failed! </p>}
      </div>
      <button className="btn btn-active" onClick={handleSubmit}>
        {buttonText}
      </button>
      {regLink && (
        <p>
          <span>Don't have an account? </span>
          <Link to="/register" className="link link-info">
            Sign up
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
