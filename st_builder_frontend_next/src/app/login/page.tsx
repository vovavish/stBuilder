'use client';

import { FC, FormEventHandler, SyntheticEvent, useState } from 'react';

//import { useStore } from '@/hooks/useStore';

import { LoginUI } from '@/components/ui/pages/login';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Login: FC = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  //const { authStore } = useStore();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
      callbackUrlL: callbackUrl ?? "/",
    });

    if (res) {
      router.push(callbackUrl);
    } else {
      console.error('error', res);
    }

    //authStore.signIn(email, password);
  };

  return (
    <LoginUI
      // email={email}
      // setEmail={setEmail}
      // password={password}
      // setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;