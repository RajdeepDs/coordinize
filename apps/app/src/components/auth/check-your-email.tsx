"use client";

import { type LoginCodeSchema, loginCodeSchema } from "@coordinize/api/schemas";
import { authClient } from "@coordinize/auth/auth-client";
import { Button } from "@coordinize/ui/components/button";
import { Input } from "@coordinize/ui/components/input";
import { toast } from "@coordinize/ui/components/sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion as m } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

type CheckYourEmailProps = {
  email: string;
  onReset?: () => void;
};

export function CheckYourEmail({ email, onReset }: CheckYourEmailProps) {
  const { handleAuthSuccess } = useAuthRedirect();
  const [isLoginWithCode, setIsLoginWithCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginCodeSchema),
    defaultValues: { code: "" },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit = async (values: LoginCodeSchema) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    try {
      const { error } = await authClient.signIn.emailOtp({
        email,
        otp: values.code,
      });

      if (error) {
        const errorMessage =
          error.code === "invalid_otp"
            ? "Invalid verification code. Please check and try again."
            : "Authentication failed. Please try again.";
        toast.error(errorMessage);
        return;
      }

      handleAuthSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  async function handleLoginWithCode() {
    if (isSendingOtp) {
      return;
    }
    setIsSendingOtp(true);

    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
      });

      if (error) {
        toast.error("Failed to send verification code. Please try again.");
        return;
      }

      setIsLoginWithCode(true);
    } finally {
      setIsSendingOtp(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h1 className="font-medium text-lg">Check your email</h1>
        <p className="text-sm text-ui-gray-900">
          We've sent you a temporary login {isLoginWithCode ? "code" : "link"}.{" "}
          <br /> Please check your inbox at{" "}
          <span className="text-foreground">{email}</span>.
        </p>
        {isLoginWithCode ? (
          <m.form
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            className="space-y-3"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            onSubmit={handleSubmit(onSubmit)}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Input
              aria-describedby="code-error"
              aria-label="Login verification code"
              autoComplete="off"
              className="h-11 bg-transparent"
              placeholder="Enter code"
              type="text"
              {...register("code")}
            />
            {errors.code && (
              <p
                className="text-start text-ui-red-800 text-xs"
                id="code-error"
                role="alert"
              >
                {errors.code?.message}
              </p>
            )}
            <Button
              className="h-11 w-full"
              disabled={isSubmitting}
              size={"lg"}
              type="submit"
              variant={"outline"}
            >
              Continue with login code
            </Button>
          </m.form>
        ) : (
          <div className="space-y-3">
            <Button
              className="h-11 w-full"
              disabled={isSendingOtp}
              onClick={handleLoginWithCode}
              size={"lg"}
              variant={"outline"}
            >
              Enter code manually
            </Button>
          </div>
        )}
      </div>
      <Button
        className="px-0"
        onClick={() => {
          onReset?.();
        }}
        variant={"link"}
      >
        Back to login
      </Button>
    </div>
  );
}
