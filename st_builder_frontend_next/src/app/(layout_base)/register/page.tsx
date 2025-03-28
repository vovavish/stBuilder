"use client";

import { FC, FormEventHandler } from "react";

import { useStore } from "@/hooks/useStore";

import { RegisterUI } from "@/components/ui/pages/register";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const Register: FC = () => {
  const { authStore } = useStore();

  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await authStore.signUp(email, password);

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrlL: callbackUrl ?? "/",
    });

    if (res) {
      router.push(callbackUrl);
    } else {
      console.error('error', res);
    }
  };

  return (
    <RegisterUI
      handleSubmit={handleSubmit}
    />
  )
}

export default Register;