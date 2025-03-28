import Stripe from "stripe";
import { UserWithSql, PaymentWithSql } from "../../types/type";
import { getDbConnection } from "./db";

export const handleCheckoutSessionCompleted = async (
  session: Stripe.Checkout.Session,
  stripe: Stripe
) => {
  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0]?.price?.id;

  if ("email" in customer && priceId) {
    const { email, name } = customer;

    const sql = await getDbConnection();

    await createOrUpdateUser({
      sql,
      email: email as string,
      fullName: name as string,
      customerId,
      priceId,
      status: "active",
    });

    await createPayment({ sql, session, priceId, userEmail: email! });
  }
};

export const handleSubscriptionDeleted = async (
  subscriptionId: string,
  stripe: Stripe
) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const sql = await getDbConnection();

    await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${subscription.customer}`;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createOrUpdateUser = async ({
  sql,
  email,
  fullName,
  customerId,
  priceId,
  status,
}: UserWithSql) => {
  try {
    const existingUser = await sql`
    SELECT * FROM users WHERE email = ${email} LIMIT 1;
  `;

    if (existingUser.length == 0) {
      await sql`
      INSERT INTO users (email, full_name, customer_id, price_id, status)
      VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status});
    `;
    }
  } catch (error) {
    console.log(error);
  }
};

const createPayment = async ({
  sql,
  session,
  priceId,
  userEmail,
}: PaymentWithSql) => {
  try {
    const { amount_total, status, id } = session;
    await sql`
        INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email)
        VALUES (${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail});
      `;
  } catch (error) {
    console.error("Error in createPayment:", error);
  }
};
