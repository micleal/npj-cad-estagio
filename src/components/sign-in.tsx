"use client";

import { useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { signUpAtom } from "~/hooks/use-signup";
import { signIn } from "~/lib/auth-client";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const setSignUp = useSetAtom(signUpAtom);
  const router = useRouter();

  return (
    <Card className="z-50 min-w-md rounded-md shadow-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Entrar</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Insira seu email abaixo para entrar na sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>

          <div className="grid gap-2">
            {/* <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Esqueceu sua senha?
              </Link>
            </div> */}

            <Input
              id="password"
              type="password"
              placeholder="senha"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              onClick={() => {
                setRememberMe(!rememberMe);
              }}
            />
            <Label htmlFor="remember">Lembrar-me</Label>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={async () => {
              await signIn.email({
                email,
                password,
                rememberMe,
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/dashboard");
                  },
                  onRequest: () => {
                    setLoading(true);
                  },
                  onResponse: () => {
                    setLoading(false);
                  },
                  onError: (ctx) => {
                    toast.error(ctx.error.message);
                  },
                },
              });
            }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <p> Entrar </p>
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center border-t py-4">
          <p className="text-center text-neutral-500 text-sm">
            Não tem uma conta?
            <Button
              variant="link"
              onClick={() => setSignUp(true)}
              className="text-sm"
            >
              Cadastrar
            </Button>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
