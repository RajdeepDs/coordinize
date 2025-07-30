import type { Metadata } from 'next';
import { WorkspaceSetup } from '@/components/setup/workspace-setup';

export const metadata: Metadata = {
  title: 'Workspace Setup',
};

export const dynamic = 'force-dynamic';

export default function WorkspaceSetupPage() {
  return <WorkspaceSetup />;
}
