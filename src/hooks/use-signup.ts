import { atom, useAtom } from "jotai";

export const signUpAtom = atom(false);

export const useSignUp = () => {
  const [signUp, setSignUp] = useAtom(signUpAtom);

  return { signUp, setSignUp };
};
