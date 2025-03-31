import dynamic from "next/dynamic";
import Link from "next/link";

const title = "Sign up";
const SignUp = dynamic(() =>
  import("@/components/auth/sign-up").then((mod) => mod.SignUp),
);

export default function SignUpPage() {
  return (
    <div className="mx-auto flex h-full w-[30%] flex-col justify-center space-y-3">
      <div className="flex flex-col">
        <h1 className="font-semibold text-base">{title}</h1>
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link
            href={"/private-beta"}
            className="text-blue-700 hover:underline underline-offset-1"
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
