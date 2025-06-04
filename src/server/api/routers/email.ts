import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Resend } from "resend";

import { env } from "~/env";

const resend = new Resend(env.RESEND_API_KEY);

export const emailRouter = createTRPCRouter({
  sendEmail: publicProcedure.input(z.object({
    to: z.string().email(),
    subject: z.string(),
    html: z.string(),
  })).mutation(async ({ input }) => {
    const { to, subject, html } = input;
    
    const { data, error } = await resend.emails.send({
      from: "No-reply <no-reply@callica.app>",
      to,
      subject,
      html,
    });
  }),
});
