import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<(typeof client.api.workspaces)[':workspaceId']['join']['$post'], 200>;
type RequestType = InferRequestType<(typeof client.api.workspaces)[':workspaceId']['join']['$post']>;

export const useJoinWorkspace = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param, json }) => {
            const response = await client.api.workspaces[':workspaceId']['join']['$post']({ param, json });
            if (!response.ok) throw new Error('Failed To Join Workspace.');
            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success('Joined Workspace.');
            queryClient.invalidateQueries({
                queryKey: ['workspaces'],
            });
            queryClient.invalidateQueries({
                queryKey: ['workspace', data.$id],
                exact: true,
            });
        },
        onError: (error) => {
            console.error('[JOIN_WORKSPACE]: ', error);
            toast.error('Failed To Join Workspace.');
        },
    });
    return mutation;
};