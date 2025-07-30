'use client';

interface ReadyProps {
  nextStep: () => void;
}

export function Ready({ nextStep }: ReadyProps) {
  return (
    <div>
      <h1>Ready Component</h1>
      <button onClick={nextStep} type="button">
        Finish
      </button>
    </div>
  );
}
