"use client";

import { FC, FormEventHandler, useState, Suspense } from "react";
import { LoginUI } from "@/components/ui/pages/login";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Preloader } from "@/components/ui/preloader";

const LoginContent: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [error, setError] = useState<string | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl: callbackUrl ?? "/",
    });

    if (res?.ok) {
      router.push(callbackUrl);
    } else {
      setError("Неверная почта или пароль");
    }
  };

  return (
    <LoginUI
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

const Login: FC = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <LoginContent />
    </Suspense>
  );
};

export default Login;