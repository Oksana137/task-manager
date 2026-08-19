import { registrate } from "../units/network";
import AuthForm from "../components/AuthForm";

const SignUp = () => {
  return (
    <AuthForm
      buttonText="Sign Up"
      redirectPath="/login"
      apiCall={registrate}
      regLink={false}
      showProfileFields={true}
    />
  );
};

export default SignUp;
