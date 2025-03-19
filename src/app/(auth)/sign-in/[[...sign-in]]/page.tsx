import BgGradient from "@/components/common/bg-gradient";
import { SignIn } from "@clerk/nextjs";

export default function Signin() {
  return (
    <div className="flex items-center justify-center flex-1">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <BgGradient />
        <SignIn signUpUrl="/sign-up" />
      </div>
    </div>
  );
}
