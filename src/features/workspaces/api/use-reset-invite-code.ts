import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<(typeof client.api.workspaces)[':workspaceId']['resetInviteCode']['$post'], 200>;
type RequestType = InferRequestType<(typeof client.api.workspaces)[':workspaceId']['resetInviteCode']['$post']>;

export const useResetInviteCode = () => {
  
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await client.api.workspaces[':workspaceId']['resetInviteCode']['$post']({ param });
            if (!response.ok) throw new Error('Failed To Reset Invite Code.');
            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success('Invite Code Reset.');

            queryClient.invalidateQueries({
                queryKey: ['workspaces'],
            });
            queryClient.invalidateQueries({
                queryKey: ['workspace', data.$id],
                exact: true,
            });
        },
        onError: (error) => {
            console.error('[RESET_INVITE_CODE]: ', error);
            toast.error('Failed To Reset Invite Code.');
        },
    });
    return mutation;
};