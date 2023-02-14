import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const groupRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.group.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.group.create({
        data: {
          id: input.title,
        },
      });
    }),
});
