'use client';

import { ResponsiveModal } from '@/components/responsive-modal';
import { useCreateProjectModal } from '@/features/projects/hooks/use-create-project-modal';

import { CreateProjectForm } from './create-project-form';

export const CreateProjectModal = () => {

    const { isOpen, setIsOpen, close } = useCreateProjectModal();

    return (
        <ResponsiveModal 
        title="Create Project" 
        description="Get Started By Creating A New Project." 
        open={isOpen} 
        onOpenChange={setIsOpen}
        >
            <CreateProjectForm onCancel={close} />
        </ResponsiveModal>
    );
};