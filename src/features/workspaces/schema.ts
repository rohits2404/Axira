import { z } from 'zod';

export const createWorkspaceSchema = z.object({
    name: z.string().trim().min(1, 'Workspace Name Is Required.'),
    image: z.union([z.instanceof(File), z.string().transform((value) => (value === '' ? undefined : value))]).optional(),
});

export const updateWorkspaceSchema = z.object({
    name: z.string().trim().min(1, 'Workspace Name Must Be 1 Or More Characters.').optional(),
    image: z.union([z.instanceof(File), z.string().transform((value) => (value === '' ? undefined : value))]).optional(),
});