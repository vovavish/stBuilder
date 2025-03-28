'use client';

import { FC, FormEventHandler } from 'react';

import { LoginUI } from '@/components/ui/pages/login';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Login: FC = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
      callbackUrl: callbackUrl ?? "/",
    });

    if (res) {
      router.push(callbackUrl);
    } else {
      console.error('error', res);
    }
  };

  return (
    <LoginUI
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;