"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import { api } from "~/trpc/react";
import { signUp } from "~/lib/auth-client";
import { toast } from "sonner";
import { Role } from "~/server/auth/config";

const cadUserFormSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  ra: z.string().min(1, { message: "RA é obrigatório" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
});

export function CadUserForm() {
  const studentMutation = api.student.create.useMutation();

  const form = useForm<z.infer<typeof cadUserFormSchema>>({
    resolver: zodResolver(cadUserFormSchema),
  });

  async function onSubmit(data: z.infer<typeof cadUserFormSchema>) {
    const { name, email, ra, password } = data;

    const { data: user, error } = await signUp.email({
      name,
      email,
      password,
      role: "user",
      ra,
      fetchOptions: {
        onSuccess: async ({ data }) => {
          await studentMutation.mutate({
            ra,
            name,
          });
          toast.success("Estagiário cadastrado com sucesso");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <h2 className="font-medium text-lg">Cadastrar estagiário</h2>
        </CardTitle>
        <CardDescription>
          Cadastre um estagiário para que ele possa agendar consultas no
          sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Nome" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
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
                  <FormLabel>RA</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="RA" {...field} />
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
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full border border-primary bg-primary/50 text-foreground transition-none hover:bg-primary/70"
            >
              Cadastrar Estagiário
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
