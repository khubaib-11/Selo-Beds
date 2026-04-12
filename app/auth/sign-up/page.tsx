import { SignUpForm } from "@/components/sign-up-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create an Account | Selo Beds",
  description:
    "Join the sleep revolution. Create an account to track your orders and enjoy exclusive perks.",
};

export default function SignUpPage() {
  return (
    <main className="container mx-auto flex min-h-[75vh] flex-col items-center justify-center px-4 py-4 bg-background">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Create Account
          </h1>
          <p className="text-sm text-muted-foreground font-medium tracking-wide">
            Join to track your delivery and get exclusive benefits.
          </p>
        </div>
        <Suspense
          fallback={
            <div className="h-96 w-full animate-pulse bg-muted rounded-xl" />
          }
        >
          <SignUpForm />
        </Suspense>
      </div>
    </main>
  );
}
