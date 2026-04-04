import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import { prisma } from '@/lib/db';
 
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure
    .query(({ctx}) => {
      return prisma.workflow.findMany();
    }),
  createWorkflow: protectedProcedure.mutation(() => {
    return prisma.workflow.create({
      data: {
        name: 'New Workflow',
      //   description: 'New Workflow Description',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      }
    });
  })
});
 
// export type definition of API
export type AppRouter = typeof appRouter;