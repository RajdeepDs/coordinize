import { useEffect, useState } from 'react';

// Simple layer management system
const layerStack: string[] = [];
const layerListeners = new Set<() => void>();

let layerIdCounter = 0;

function generateLayerId(): string {
  return `layer-${++layerIdCounter}`;
}

function addLayer(layerId: string): void {
  layerStack.push(layerId);
  notifyListeners();
}

function removeLayer(layerId: string): void {
  const index = layerStack.indexOf(layerId);
  if (index >= 0) {
    layerStack.splice(index, 1);
    notifyListeners();
  }
}

function isTopLayer(layerId: string): boolean {
  return (
    layerStack.length === 0 || layerStack[layerStack.length - 1] === layerId
  );
}

function notifyListeners(): void {
  for (const listener of layerListeners) {
    listener();
  }
}

/**
 * Hook to determine if the current component is in the top layer.
 * Used for managing keyboard shortcuts and other interactions that should
 * only work when a component is the topmost layer (e.g., not when a modal is open).
 */
export function useIsTopLayer(): boolean {
  const [layerId] = useState(() => generateLayerId());
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    // Add this layer to the stack
    addLayer(layerId);

    // Subscribe to layer changes
    const updateIsTop = () => {
      setIsTop(isTopLayer(layerId));
    };

    layerListeners.add(updateIsTop);
    updateIsTop(); // Initial check

    // Cleanup: remove layer and listener
    return () => {
      removeLayer(layerId);
      layerListeners.delete(updateIsTop);
    };
  }, [layerId]);

  return isTop;
}

/**
 * Hook to manually register/unregister a layer.
 * Useful for components that need more control over when they are considered active.
 */
export function useLayerManager(active = true): {
  isTopLayer: boolean;
  layerId: string;
} {
  const [layerId] = useState(() => generateLayerId());
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    if (!active) return;

    // Add this layer to the stack
    addLayer(layerId);

    // Subscribe to layer changes
    const updateIsTop = () => {
      setIsTop(isTopLayer(layerId));
    };

    layerListeners.add(updateIsTop);
    updateIsTop(); // Initial check

    // Cleanup: remove layer and listener
    return () => {
      removeLayer(layerId);
      layerListeners.delete(updateIsTop);
    };
  }, [layerId, active]);

  return { isTopLayer: isTop, layerId };
}
