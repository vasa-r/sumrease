import FreeUserUi from "@/components/common/free-user-ui";
import { getSubscriptionStatus } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await currentUser();
  if (!user || !user.emailAddresses[0].emailAddress) {
    redirect("/sign-in");
  }

  const email = user.emailAddresses[0].emailAddress;

  const hasActiveSubscription = await getSubscriptionStatus(email);

  if (!hasActiveSubscription) {
    return <FreeUserUi />;
  }
  return <>{children}</>;
};

export default Layout;
