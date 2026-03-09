import { Layout } from '@/features/dashboard/layout/dashboard-layout'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Layout>
            {children}
        </Layout>
    )
}

export default DashboardLayout