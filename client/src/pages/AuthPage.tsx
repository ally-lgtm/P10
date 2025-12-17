import { useEffect, useMemo, useState, type FormEvent } from 'react';

import { supabase } from '../lib/supabase';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [signedInEmail, setSignedInEmail] = useState<string | null>(null);

  const emailRedirectTo = useMemo(() => {
    try {
      return window.location.origin;
    } catch {
      return undefined;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (!isMounted) return;

      const currentEmail = data.user?.email ?? null;
      setSignedInEmail(currentEmail);
    };

    void init();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentEmail = session?.user?.email ?? null;
      setSignedInEmail(currentEmail);
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const submitMagicLink = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setError('Please enter your email.');
      return;
    }

    setIsLoading(true);
    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: {
          emailRedirectTo,
        },
      });

      if (otpError) {
        setError(otpError.message);
        return;
      }

      setInfo('Check your email for a sign-in link.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start sign-in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setError(null);
    setInfo(null);
    setIsLoading(true);
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        setError(signOutError.message);
        return;
      }

      setSignedInEmail(null);
      setInfo('Signed out.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <h1>Sign In</h1>
      <section>
        <h2>Email OTP Authentication</h2>

        {signedInEmail ? (
          <div>
            <p>Signed in as: {signedInEmail}</p>
            <button type="button" onClick={handleSignOut} disabled={isLoading}>
              {isLoading ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        ) : (
          <form onSubmit={submitMagicLink}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending link…' : 'Send magic link'}
            </button>
          </form>
        )}

        {error ? <p>{error}</p> : null}
        {info ? <p>{info}</p> : null}
      </section>
    </main>
  );
}
