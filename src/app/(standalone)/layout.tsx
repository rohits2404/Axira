import { Layout } from '@/features/standalone/layout/standalone-layout'
import React from 'react'

const StandaloneLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Layout>
            {children}
        </Layout>
    )
}

export default StandaloneLayout