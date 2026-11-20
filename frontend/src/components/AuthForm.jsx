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
  demoApiCall,
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
  const [pendingAction, setPendingAction] = useState(null);
  const [demoError, setDemoError] = useState(false);

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

    if (pendingAction) return;
    setDemoError(false);
    setErrors({
      ok: true,
      emailError: "",
      passError: "",
    });

    const isValid = validate();
    if (!isValid) {
      return;
    }

    setPendingAction("submit");
    try {
      await apiCall(formData);

      await loadUser();

      navigate(redirectPath);
    } catch {
      setErrors((prev) => ({ ...prev, ok: false }));
    } finally {
      setPendingAction(null);
    }
  };

  const handleDemo = async () => {
    if (pendingAction) return;
    setPendingAction("demo");
    setDemoError(false);
    setErrors({ ok: true, emailError: "", passError: "" });

    try {
      await demoApiCall();
      if (!(await loadUser())) {
        localStorage.removeItem("token");
        setDemoError(true);
        return;
      }

      navigate(redirectPath);
    } catch {
      setDemoError(true);
    } finally {
      setPendingAction(null);
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
          disabled={Boolean(pendingAction)}
          className="mt-1 h-12 rounded-xl bg-[#5030E5] text-[15px] font-medium text-white transition hover:bg-[#4123D7] disabled:opacity-60"
        >
          {buttonText}
        </button>

        {demoApiCall && (
          <div>
            <button
              type="button"
              onClick={handleDemo}
              disabled={Boolean(pendingAction)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#DED5FC] bg-[#F7F4FF] text-[15px] font-semibold text-[#5030E5] transition hover:border-[#B9A8F6] hover:bg-[#EEE8FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5030E5] disabled:opacity-60"
            >
              <span className="grid size-6 place-items-center rounded-full bg-white" aria-hidden="true">
                <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
                  <path d="M5 2.8a.7.7 0 0 1 1.07-.59l7 5.2a.7.7 0 0 1 0 1.18l-7 5.2A.7.7 0 0 1 5 13.2Z" />
                </svg>
              </span>
              {pendingAction === "demo" ? "Opening demo…" : "Try Demo"}
            </button>
            {demoError && (
              <p role="alert" className="mt-2 text-center text-xs text-red-500">
                The demo is unavailable. Please try again later.
              </p>
            )}
          </div>
        )}

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
