import { FC, SyntheticEvent, useState } from "react";

import { useStore } from "@/hooks/useStore";

import { LoginUI } from "@/components/ui/pages/login/login";

export const Login: FC = () => {
  const { authStore } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    authStore.signIn(email, password);
  }

  return (
    <LoginUI
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  )
}