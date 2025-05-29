"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { signUp } from "~/lib/auth-client";
import { convertImageToBase64 } from "~/lib/image";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const createUserSchema = z.object({
  firstName: z
    .string({
      message: "Nome é obrigatório",
    })
    .min(2, {
      message: "Nome deve ter pelo menos 2 caracteres",
    }),
  lastName: z
    .string({
      message: "Sobrenome é obrigatório",
    })
    .min(2, {
      message: "Sobrenome deve ter pelo menos 2 caracteres",
    }),
  email: z
    .string({
      message: "Email é obrigatório",
    })
    .email({
      message: "Email inválido",
    }),
  ra: z
    .string({
      message: "RA é obrigatório",
    })
    .min(1, {
      message: "RA deve ter pelo menos 1 caractere",
    }),
  password: z
    .string({
      message: "Senha é obrigatória",
    })
    .min(8, {
      message: "Senha deve ter pelo menos 8 caracteres",
    }),
  role: z.enum(["user", "admin"], {
    message: "Obrigatório selecionar uma função",
  }),
  image: z.instanceof(File).optional(),
});

export function SignUpForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      ra: "",
      password: "",
      role: undefined,
    },
  });

  const handleSubmit = async ({
    firstName,
    lastName,
    email,
    ra,
    password,
    role,
    image,
  }: z.infer<typeof createUserSchema>) => {
    await signUp.email({
      email,
      password,
      name: `${firstName} ${lastName}`,
      username: ra,
      role,
      image: image ? await convertImageToBase64(image) : "",
      callbackURL: "/dashboard",
      fetchOptions: {
        onResponse: () => {
          setLoading(false);
        },
        onRequest: () => {
          setLoading(true);
        },
        onError: (ctx) => {
          toast.error(
            ctx.error.message === "User already exists"
              ? "Usuário já existe"
              : ctx.error.message,
          );
        },
        onSuccess: async () => {
          toast.success("Usuário criado com sucesso");
        },
      },
    });
  };

  return (
    <Card className="w-full rounded-md shadow-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Adicionar usuário</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Adicione um novo usuário ao sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="hidden">Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="hidden">Sobrenome</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Sobrenome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ra"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="hidden">RA</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="RA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="hidden">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="hidden">Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Senha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="hidden">É aluno?</FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="É aluno?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">Sim</SelectItem>
                            <SelectItem value="admin">Não</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2Icon size={16} className="animate-spin" />
                    <span>Criando usuário...</span>
                  </>
                ) : (
                  "Criar usuário"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
