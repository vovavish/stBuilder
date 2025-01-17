import { FC, useState } from "react";

import { authStore } from "@/store/AuthStore/AuthStore";

export const SigninForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={() => authStore.signIn(email, password)}>Sign In</button>
      <button onClick={() => authStore.signUp(email, password)}>Sign Up</button>
    </div>
  )
}