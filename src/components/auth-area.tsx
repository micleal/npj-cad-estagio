"use client";

import { useAtom } from "jotai";
import { signUpAtom } from "~/hooks/use-signup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import Link from "next/link";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import {
  signIn as signInClient,
  signUp as signUpClient,
} from "~/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { convertImageToBase64 } from "~/lib/image";
import { api } from "~/trpc/react";
import { useSignUp } from "~/hooks/use-signup";

export function AuthArea() {
  const { signUp, setSignUp } = useSignUp();

  const signInData = {
    title: "Entrar",
    description: "Insira seu email abaixo para entrar na sua conta",
    content: SignInForm,
  };

  const signUpData = {
    title: "Cadastrar",
    description: "Insira seu email abaixo para criar uma conta",
    content: SignUpForm,
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Card className="z-50 min-w-md rounded-md shadow-md">
        <CardHeader>
          <CardTitle>{signUp ? signUpData.title : signInData.title}</CardTitle>
          <CardDescription>
            {signUp ? signUpData.description : signInData.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {signUp ? <signUpData.content /> : <signInData.content />}
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-center border-t py-4">
            <p className="text-center text-neutral-500 text-sm">
              {signUp ? "Já tem uma conta?" : "Não tem uma conta?"}
              <Button variant="link" onClick={() => setSignUp(!signUp)}>
                {signUp ? signInData.title : signUpData.title}
              </Button>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
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
        <div className="flex items-center">
          <Label htmlFor="password">Senha</Label>
          <Link href="#" className="ml-auto inline-block text-sm underline">
            Esqueceu sua senha?
          </Link>
        </div>

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
          await signInClient.email({
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
  );
}

function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ra, setRA] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const studentMutation = api.student.create.useMutation({
    onSuccess: () => {
      toast.success("Conta criada com sucesso!");
      router.push("/dashboard");
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="first-name">Nome (*)</Label>
          <Input
            id="first-name"
            placeholder="Max"
            required
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="last-name">Sobrenome (*)</Label>
          <Input
            id="last-name"
            placeholder="Robinson"
            required
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email (*)</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">RA (*)</Label>
        <Input
          id="username"
          name="username"
          type="username"
          placeholder="RA"
          required
          onChange={(e) => setRA(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Senha (*)</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          placeholder="Senha"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password_confirmation">Confirmar Senha (*)</Label>
        <Input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          required
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="new-password"
          placeholder="Confirmar Senha"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="image">Imagem de Perfil (opcional)</Label>
        <div className="flex items-end gap-4">
          {imagePreview && (
            <div className="relative h-16 w-16 overflow-hidden rounded-sm">
              <Image
                src={imagePreview}
                alt="Profile preview"
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <div className="flex w-full items-center gap-2">
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {imagePreview && (
              <X
                className="cursor-pointer"
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={loading}
        onClick={async () => {
          await signUpClient.email({
            email,
            password,
            name: `${firstName} ${lastName}`,
            image: image ? await convertImageToBase64(image) : "",
            ra,
            callbackURL: "/dashboard",
            fetchOptions: {
              onResponse: () => {
                setLoading(false);
              },
              onRequest: () => {
                setLoading(true);
              },
              onError: (ctx) => {
                toast.error(ctx.error.message);
              },
              onSuccess: async ({ data }) => {
                studentMutation.mutate({
                  ra,
                  name: `${firstName} ${lastName}`,
                });
              },
            },
          });
        }}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Criando conta...</span>
          </>
        ) : (
          "Criar conta"
        )}
      </Button>
      <p className="items-center text-neutral-500 text-sm">
        (*) Campos obrigatórios
      </p>
    </div>
  );
}
