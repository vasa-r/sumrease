import { pricingPlans } from "@/utils/pricing-plan";
import { getDbConnection } from "./db";
import { getUploadCount } from "./summaries";

export const getPriceIdForActiveUser = async (email: string) => {
  const sql = await getDbConnection();

  const userPlan =
    await sql`SELECT price_id FROM users WHERE email = ${email} AND status = 'active'`;

  return userPlan?.[0]?.price_id || null;
};

export const hasActivePlan = async (email: string) => {
  const sql = await getDbConnection();

  const query =
    await sql`SELECT price_id FROM users WHERE email = ${email} AND status = 'active' AND price_id IS NOT NULL`;

  return query && query.length > 0;
};

export const hasReachedUploadLimit = async (
  userId: string,
  emailAddress: string
) => {
  const uploadCount = await getUploadCount(userId);

  const priceId = await getPriceIdForActiveUser(emailAddress);

  const isPro =
    pricingPlans.find((plan) => plan.priceId === priceId)?.id === "pro";

  const uploadLimit = isPro ? 1000 : 5;

  return {
    hasReachedLimit: uploadCount >= uploadLimit,
    uploadLimit,
  };
};

export const getSubscriptionStatus = async (email: string) => {
  const hasActiveSubscription = await hasActivePlan(email);

  return hasActiveSubscription;
};
