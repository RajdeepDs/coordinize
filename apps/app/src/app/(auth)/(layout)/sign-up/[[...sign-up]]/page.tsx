import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const title = "Sign up";
const SignUp = dynamic(() =>
  import("@/components/auth/sign-up-form").then((mod) => mod.SignUp),
);

export const metadata: Metadata = {
  title,
};

export default function SignUpPage() {
  return (
    <div className="mx-auto flex h-full max-w-[20rem] flex-col justify-center space-y-3">
      <div className="flex flex-col">
        <h1 className="font-semibold text-base">{title}</h1>
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link
            href={"/private-beta"}
            className="text-blue-700 underline-offset-1 hover:underline dark:text-blue-400"
          >
            Sign in
          </Link>
          .
        </p>
      </div>
      <SignUp />
    </div>
  );
}
