import { verifyPayment } from "@/lib/dodo";
import { SuccessContent } from "./SuccessContent";

export const metadata = {
  title: "Purchase Complete | College Move-In Kit",
  robots: "noindex, nofollow",
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const paymentId = typeof params.payment_id === "string" ? params.payment_id : undefined;

  let isVerified = false;
  let transactionId: string | undefined;

  if (paymentId) {
    // Server-side verification
    const verification = await verifyPayment(paymentId);
    isVerified = verification.verified;
    transactionId = verification.transactionId;
  }

  return (
    <main className="min-h-screen bg-[#FFF9F1] flex items-center justify-center p-4">
      <SuccessContent isVerified={isVerified} transactionId={transactionId} />
    </main>
  );
}
