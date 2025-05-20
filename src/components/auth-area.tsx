"use client";

import { SignUp } from "./sign-up";
import { SignIn } from "./sign-in";
import { signUpAtom } from "~/hooks/use-signup";
import { useAtomValue } from "jotai";

export function AuthArea() {
  const signUp = useAtomValue(signUpAtom);

  return (
    <div className="flex flex-col items-center gap-2">
      {signUp ? <SignUp /> : <SignIn />}
    </div>
  );
}
