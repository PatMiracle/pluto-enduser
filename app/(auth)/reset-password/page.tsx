import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Create New Password"
      sideTitle="Don’t have an Account?"
      sideSubtitle="Enter your personal details to start with us today"
      sideButtonLabel="Register Me"
      sideButtonHref="/signup"
      reverse
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
