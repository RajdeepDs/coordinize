'use client';

interface ChooseStyleProps {
  nextStep: () => void;
}

export function ChooseStyle({ nextStep }: ChooseStyleProps) {
  return (
    <div>
      <h1>Choose Style Component</h1>
      <button onClick={nextStep} type="button">
        Next
      </button>
    </div>
  );
}
