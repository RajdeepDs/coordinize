'use client';

interface InviteProps {
  nextStep: () => void;
}

export function Invite({ nextStep }: InviteProps) {
  return (
    <div>
      <h1>Invite Component</h1>
      <button onClick={nextStep} type="button">
        Next
      </button>
    </div>
  );
}
