import AuthLayout from "@/app/(auth)/AuthLayout";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Log In To Your Account"
      sideTitle="Don’t have an Account?"
      sideSubtitle="Enter your personal details to start with us today"
      sideButtonLabel="Register Me"
      sideButtonHref="/signup"
    >
      <LoginForm />
    </AuthLayout>
  );
}
