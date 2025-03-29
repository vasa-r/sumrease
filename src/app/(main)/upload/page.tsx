import BgGradient from "@/components/common/bg-gradient";
import { MotionDiv } from "@/components/common/motion-wrapper";
import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";
import { hasReachedUploadLimit } from "@/lib/user";
import { containerVariants } from "@/utils/motion-animate";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Upload = async () => {
  const user = await currentUser();
  const userId = user?.id;
  const emailAddress = user?.emailAddresses[0].emailAddress;

  if (!userId || !emailAddress) {
    return redirect("sign-in");
  }

  const { hasReachedLimit } = await hasReachedUploadLimit(userId, emailAddress);

  if (hasReachedLimit) {
    redirect("/dashboard");
  }
  return (
    <section className="m-h-screen">
      <BgGradient />
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:px-8"
      >
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </MotionDiv>
    </section>
  );
};

export default Upload;
