import { SignOut } from "./sign-out";

export function AppHeader() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="font-bold text-2xl">Cadastro de atendimentos NPJ</h1>
      <SignOut />
    </header>
  );
}
