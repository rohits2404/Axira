import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<(typeof client.api.members)[':memberId']['$patch'], 200>;
type RequestType = InferRequestType<(typeof client.api.members)[':memberId']['$patch']>;

export const useUpdateMember = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param, json }) => {
            const response = await client.api.members[':memberId']['$patch']({ param, json });
            if (!response.ok) throw new Error('Failed To Update Member.');
            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success('Member Updated.');
            queryClient.invalidateQueries({
                queryKey: ['members', data.workspaceId],
                exact: true,
            });
        },
        onError: (error) => {
            console.error('[UPDATE_MEMBER]: ', error);
            toast.error('Failed To Update Member.');
        },
    });
    return mutation;
};