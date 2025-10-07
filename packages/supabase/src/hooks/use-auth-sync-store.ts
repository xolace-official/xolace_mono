import { useEffect } from "react";
import { useSupabase } from "./use-supabase";
import { useAppStore } from "@xolacekit/state"; // path to your state package

export function useAuthSyncStore() {
    const supabase = useSupabase();
    const setAuth = useAppStore((s) => s.setAuth);
    const resetAuth = useAppStore((s) => s.resetAuth);

    useEffect(() => {
        const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
            const user = session?.user ?? null;
            if (user) {
                // Extract minimal, non-sensitive derived fields
                setAuth({ userId: user.id, email: user.email ?? null });
            } else {
                resetAuth();
            }
        });

        // also do an initial pull on mount
        supabase.auth.getSession().then(({ data }) => {
            const user = data.session?.user ?? null;
            if (user) setAuth({ userId: user.id, email: user.email ?? null });
            else resetAuth();
        });

        return () => {
            sub.subscription.unsubscribe();
        };
    }, [resetAuth, setAuth, supabase]);
}
