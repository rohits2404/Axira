import { z } from 'zod';

import { TaskStatus } from './types';

export const createTaskSchema = z.object({
    name: z.string().trim().min(1, 'Task Name Is Required.'),
    status: z.enum(TaskStatus, {
        error: 'Task Status Is Required.',
    }),
    workspaceId: z.string().trim().min(1, 'Workspace Id Is Required.'),
    projectId: z.string().trim().min(1, 'Project Id Is Required.'),
    dueDate: z.preprocess((val) => (val instanceof Date ? val : new Date(val as string)), z.date()),
    assigneeId: z.string().trim().min(1, 'Assignee Id Is Required.'),
    description: z.string().optional(),
});