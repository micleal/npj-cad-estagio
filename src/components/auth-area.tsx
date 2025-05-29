"use client";

import { useAtomValue } from "jotai";
import { signUpAtom } from "~/hooks/use-signup";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";

export function AuthArea() {
  const signUp = useAtomValue(signUpAtom);

  return (
    <div className="flex flex-col items-center gap-2">
      {signUp ? <SignUp /> : <SignIn />}
    </div>
  );
}
