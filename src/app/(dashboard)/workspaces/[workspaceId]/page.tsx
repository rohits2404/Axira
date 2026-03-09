import { getCurrent } from "@/features/auth/queries";
import { WorkspaceIdClient } from "@/features/dashboard/components/workspace-id-client";
import { redirect } from "next/navigation";
import React from "react";

const WorkspaceIdPage = async () => {
  
    const user = await getCurrent();
    if (!user) redirect('/sign-in');

    return <WorkspaceIdClient />;
};

export default WorkspaceIdPage;