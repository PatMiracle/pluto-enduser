import AuthLayout from "@/components/auth/AuthLayout";

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Create New Password"
      sideTitle="Don’t have an Account?"
      sideSubtitle="Enter your personal details to start with us today"
      sideButtonLabel="Register Me"
      sideButtonHref="/register"
      reverse
    >
      <></>
    </AuthLayout>
  );
}
