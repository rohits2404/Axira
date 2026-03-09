import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<(typeof client.api.workspaces)[':workspaceId']['$delete'], 200>;
type RequestType = InferRequestType<(typeof client.api.workspaces)[':workspaceId']['$delete']>;

export const useDeleteWorkspace = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await client.api.workspaces[':workspaceId']['$delete']({ param });
            if (!response.ok) throw new Error('Failed To Delete Workspace.');
            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success('Workspace Deleted.');
            queryClient.invalidateQueries({
                queryKey: ['workspaces'],
            });
            queryClient.invalidateQueries({
                queryKey: ['workspace', data.$id],
                exact: true,
            });
        },
        onError: (error) => {
            console.error('[DELETE_WORKSPACE]: ', error);
            toast.error('Failed To Delete Workspace.');
        },
    });
    return mutation;
};