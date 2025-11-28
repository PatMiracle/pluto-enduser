import AuthLayout from "@/app/(auth)/AuthLayout";

export default function CreateNewPasswordForm() {
  return (
    <AuthLayout
      title="Create New Password"
      sideTitle="Don’t have an Account?"
      sideSubtitle="Enter your personal details to start with us today"
      sideButtonLabel="Register Me"
      sideButtonHref="/signup"
      reverse
    >
      <CreateNewPasswordForm />
    </AuthLayout>
  );
}
