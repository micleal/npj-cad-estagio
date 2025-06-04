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
import { signUp } from "~/lib/auth-client";
import { toast } from "sonner";

const cadAdminFormSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
});

export function CadAdminForm() {
  const form = useForm<z.infer<typeof cadAdminFormSchema>>({
    resolver: zodResolver(cadAdminFormSchema),
  });

  async function onSubmit(data: z.infer<typeof cadAdminFormSchema>) {
    const { name, email, password } = data;

    const { data: user, error } = await signUp.email({
      name,
      email,
      password,
      role: "admin",
    });

    if (error) {
      toast.error(error.message);
    }

    toast.success("Administrador cadastrado com sucesso");
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <h2 className="font-medium text-lg">Cadastrar administrador</h2>
        </CardTitle>
        <CardDescription>
          Cadastre um administrador para que ele possa gerenciar o sistema.
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
              Cadastrar Administrador
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
