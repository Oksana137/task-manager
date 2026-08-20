import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AvatarIcon from "./AvatarIcon";
import { AVATAR_ICONS, DEFAULT_AVATAR_ICON_ID } from "../units/avatarIcons";

const inputClasses =
  "h-12 w-full rounded-xl border border-[#E5E5E5] bg-white px-4 text-[15px] text-[#0D062D] placeholder:text-gray-400 outline-none transition focus:border-[#5030E5]";

const labelClasses = "mb-2 block text-sm font-medium text-[#787486]";

const AuthForm = ({
  buttonText,
  redirectPath,
  apiCall,
  regLink,
  showProfileFields = false,
}) => {
  const navigate = useNavigate();
  const { loadUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    city: "",
    avatarIcon: DEFAULT_AVATAR_ICON_ID,
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

      await loadUser();

      navigate(redirectPath);
    } catch {
      setErrors((prev) => ({ ...prev, ok: false }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute left-1/2 top-1/2 w-96 max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-[#ECECEC] bg-white p-8 shadow-[0_25px_80px_rgba(0,0,0,0.12)]"
    >
      <h1 className="mb-1 text-2xl font-bold text-[#0D062D]">
        {showProfileFields ? "Create your account" : "Welcome back"}
      </h1>

      <p className="mb-6 text-sm text-[#787486]">
        {showProfileFields
          ? "Fill in your details to get started"
          : "Sign in to continue to your workspace"}
      </p>

      <div className="flex flex-col gap-5">
        {showProfileFields && (
          <>
            <div>
              <label htmlFor="name" className={labelClasses}>
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="city" className={labelClasses}>
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                placeholder="Your city"
                value={formData.city}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <p className={labelClasses}>Choose an icon</p>

              <div className="flex gap-3 overflow-x-auto px-1 py-2">
                {AVATAR_ICONS.map((icon) => (
                  <button
                    key={icon.id}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, avatarIcon: icon.id }))
                    }
                    className={`shrink-0 rounded-full transition ${
                      formData.avatarIcon === icon.id
                        ? "ring-2 ring-[#5030E5] ring-offset-2"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <AvatarIcon iconId={icon.id} size={44} />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
          />
          {errors.emailError && (
            <p className="mt-1 text-xs text-red-500">{errors.emailError}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className={labelClasses}>
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className={inputClasses}
          />
          {errors.passError && (
            <p className="mt-1 text-xs text-red-500">{errors.passError}</p>
          )}
          {!errors.ok && (
            <p className="mt-1 text-xs text-red-500">
              Something went wrong. Please try again.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-1 h-12 rounded-xl bg-[#5030E5] text-[15px] font-medium text-white transition hover:bg-[#4123D7]"
        >
          {buttonText}
        </button>

        {regLink && (
          <p className="text-center text-sm text-[#787486]">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-[#5030E5] hover:underline"
            >
              Sign up
            </Link>
          </p>
        )}
      </div>
    </form>
  );
};

export default AuthForm;