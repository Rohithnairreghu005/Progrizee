// Placeholder only. Admin access control (MFA, RBAC) arrives with issues #6 and #12;
// this app must not expose any data before then.
export default function AdminHomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-4 px-4">
      <h1 className="text-3xl font-semibold">Heard Admin</h1>
      <p>Restricted platform administration.</p>
    </main>
  );
}
