"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSignInMutation } from "@/graphql/generated/react-query";
import { setAuthCookie } from "@/lib/auth-cookies";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/hooks/user-hook";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { setUser } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useSignInMutation({
    async onSuccess(data) {
      const { signIn } = data;
      if (!signIn.accessToken || !signIn.role) {
        console.error("No access token or role received after sign in.");
        return;
      }

      setAuthCookie(signIn.accessToken, signIn.role);
      toast.success("Logged in successfully!");
      setUser(signIn);
      const redirectTo = searchParams.get("redirect") || "/";

      router.replace(redirectTo);
    },
    onError(error) {
      toast.error(`Error: ${error.message}`);
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    mutate({
      signInInput: {
        email,
        password,
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-muted-foreground text-balance">
                  Welcome! Please sign In for your account.
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button disabled={isPending} type="submit">
                  {isPending ? "Creating account..." : "Create Account"}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              {/* your social login buttons... */}
            </FieldGroup>
          </form>

          <div className="bg-muted relative hidden md:block">
            <img
              src="/hero.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
