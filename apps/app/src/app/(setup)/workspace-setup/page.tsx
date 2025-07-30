import type { Metadata } from 'next';
import { WorkspaceSetup } from '@/components/setup/workspace-setup';

export const metadata: Metadata = {
  title: 'Workspace Setup',
};

export default function WorkspaceSetupPage() {
  return <WorkspaceSetup />;
}
