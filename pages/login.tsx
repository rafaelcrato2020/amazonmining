import { LoginForm } from "../components/login-form"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/images/amazon-mining-logo.png"
              alt="Amazon Mining"
              width={150}
              height={150}
              className="mx-auto"
            />
          </Link>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-hidden">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
