import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Academic Portal
        </h1>
        <p className="text-slate-600 text-sm">
          Welcome to the student services portal. Access your terminal report cards securely using your credentials.
        </p>
        <div>
          <Link
            href="/result-checker"
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Go to Result Checker
          </Link>
        </div>
      </div>
    </main>
  );
}