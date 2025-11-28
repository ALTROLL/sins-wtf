import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#ff3333] mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Profile Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          This username hasn&apos;t been claimed yet. Want it? Sign up and make it yours!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="px-6 py-3 bg-gradient-to-r from-[#ff3333] to-[#ff6600] rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Claim This Username
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-[#ff3333]/30 rounded-lg font-semibold hover:bg-white/5 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
