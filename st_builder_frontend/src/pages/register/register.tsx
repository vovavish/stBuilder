import { FC, SyntheticEvent, useState } from "react";

import { useStore } from "@/hooks/useStore";

import { RegisterUI } from "@/components/ui/pages/register";

export const Register: FC = () => {
  const { authStore } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    authStore.signUp(email, password);
  }

  return (
    <RegisterUI
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  )
}