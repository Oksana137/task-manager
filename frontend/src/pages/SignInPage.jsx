import { authorize, authorizeDemo } from "../units/network";
import AuthForm from "../components/AuthForm";

const SignInPage = () => {
  return (
    <AuthForm
      buttonText="Sign In"
      redirectPath="/"
      apiCall={authorize}
      demoApiCall={authorizeDemo}
      regLink={true}
    />
  );
};

export default SignInPage;
