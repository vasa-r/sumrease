import BgGradient from "@/components/common/bg-gradient";
import SummaryCard from "@/components/dashboard/summary-card";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { PdfSummary } from "../../../../types/type";
import EmptySummaryState from "@/components/dashboard/empty-summaries";
import { hasReachedUploadLimit } from "@/lib/user";

const Dashboard = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("sign-in");
  }

  const emailAddress = user.emailAddresses[0].emailAddress;

  const summaries = (await getSummaries(user?.id)) as PdfSummary[];

  const { uploadLimit, hasReachedLimit } = await hasReachedUploadLimit(
    user?.id,
    emailAddress
  );
  return (
    <main className="flex-1">
      <BgGradient />
      <div className="container flex flex-col gap-4 mx-auto">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex flex-col items-center justify-between gap-4 mb-8 sm:flex-row">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight text-transparent bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Transform your PDF&apos;s into concise, actionable insights
              </p>
            </div>

            {!hasReachedLimit && (
              <Button
                variant={"link"}
                className="transition-all duration-200 bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 group hover:no-underline"
              >
                <Link href={"/upload"} className="flex items-center text-white">
                  <Plus className="w-5 h-5 mr-2" />
                  New Summary
                </Link>
              </Button>
            )}
          </div>
          {hasReachedLimit && (
            <div className="mb-6">
              <div className="p-4 border rounded-lg bg-rose-50 border-rose-200 text-rose-800">
                <p className="text-sm">
                  You&apos;ve reached the limit of {uploadLimit} uploads on the
                  basic plan.{" "}
                  <Link
                    href={"/#pricing"}
                    className="inline-flex items-center font-medium underline text-rose-800 underline-offset-4"
                  >
                    Click here to upgrade to Pro{" "}
                    <ArrowRight className="inline-block w-4 h-4" /> for
                    unlimited uploads.
                  </Link>
                </p>
              </div>
            </div>
          )}
          {summaries.length === 0 ? (
            <EmptySummaryState />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
              {summaries.map((summary, idx) => (
                <SummaryCard key={idx} summary={summary} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
