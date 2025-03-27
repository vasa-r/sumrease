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

const Dashboard = async () => {
  const uploadLimit = 5;

  const user = await currentUser();

  if (!user?.id) {
    return redirect("sign-in");
  }

  const summaries = (await getSummaries(user?.id)) as PdfSummary[];

  console.log(summaries);
  return (
    <main className="flex-1">
      <BgGradient />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between items-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Transform your PDF&apos;s into concise, actionable insights
              </p>
            </div>

            <Button
              variant={"link"}
              className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-200 group hover:no-underline"
            >
              <Link href={"/upload"} className="flex items-center text-white">
                <Plus className="w-5 h-5 mr-2" />
                New Summary
              </Link>
            </Button>
          </div>
          <div className="mb-6">
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
              <p className="text-sm">
                You&apos;ve reached the limit of {uploadLimit} uploads on the
                basic plan.{" "}
                <Link
                  href={"/#pricing"}
                  className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center"
                >
                  Click here to upgrade to Pro{" "}
                  <ArrowRight className="w-4 h-4 inline-block" /> for unlimited
                  uploads.
                </Link>
              </p>
            </div>
          </div>
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
