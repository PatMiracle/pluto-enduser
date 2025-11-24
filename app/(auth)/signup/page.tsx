import AuthLayout from "@/components/auth/AuthLayout";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create A New Account"
      sideTitle="I already have an Account?"
      sideSubtitle="To continue your experience, please login with your personal details"
      sideButtonLabel="Login Now"
      sideButtonHref="/login"
      reverse={true}
    >
      <></>
    </AuthLayout>
  );
}
