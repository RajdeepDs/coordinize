import { useRouter, useSearchParams } from "next/navigation";

/**
 * Hook to handle authentication redirects after successful login
 * Checks for callbackUrl in search params and redirects accordingly
 */
export function useAuthRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleAuthSuccess = () => {
    const callbackUrl = searchParams.get("callbackUrl");

    if (callbackUrl) {
      router.push(callbackUrl);
    } else {
      router.refresh();
    }
  };

  return { handleAuthSuccess };
}
