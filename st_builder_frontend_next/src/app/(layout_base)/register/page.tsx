"use client";

import { FC, FormEventHandler, useState } from "react";
import { useStore } from "@/hooks/useStore";
import { RegisterUI } from "@/components/ui/pages/register";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const Register: FC = () => {
  const { authStore } = useStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [error, setError] = useState<string | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await authStore.signUp(email, password);
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: callbackUrl ?? "/",
      });

      if (res?.ok) {
        router.push(callbackUrl);
      } else {
        setError('Ошибка при входе после регистрации');
      }
    } catch (err) {
      setError('Пользователь с такой почтой уже зарегистрирован');
    }
  };

  return (
    <RegisterUI
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

export default Register;