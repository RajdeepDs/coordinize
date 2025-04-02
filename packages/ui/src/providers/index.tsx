import { AuthProvider } from "@coordinize/auth/providers";
import type { ThemeProviderProps } from "next-themes";
import { Toaster } from "../components/sonner";
import { TooltipProvider } from "../components/tooltip";
import { ThemeProvider } from "./theme-provider";

type DesignSystemProviderProperties = ThemeProviderProps;

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
    <AuthProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </AuthProvider>
    <Toaster />
  </ThemeProvider>
);
