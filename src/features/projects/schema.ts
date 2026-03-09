import { z } from 'zod';

export const createProjectSchema = z.object({
    name: z.string().trim().min(1, 'Project Name Is Required.'),
    image: z.union([z.instanceof(File), z.string().transform((value) => (value === '' ? undefined : value))]).optional(),
    workspaceId: z.string({
        error: 'Workspace Id Is Required.',
    }),
});

export const updateProjectSchema = z.object({
    name: z.string().trim().min(1, 'Project Name Is Required.').optional(),
    image: z.union([z.instanceof(File), z.string().transform((value) => (value === '' ? undefined : value))]).optional(),
    workspaceId: z.string({
        error: 'Workspace Id Is Required.',
    }),
});