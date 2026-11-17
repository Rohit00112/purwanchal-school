"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, Mail, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (!res || res.error) {
        setError("Invalid credentials. Please verify your administrative email and password.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("An unexpected authentication error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div role="alert" className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3.5 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
          Staff Email Address
        </Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            required
            placeholder="admin@purwanchalschool.edu.np"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-9 text-xs h-11 border-slate-200 focus-visible:ring-brand-700"
          />
          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-xs font-semibold text-slate-700">
            Password
          </Label>
        </div>
        <div className="relative">
          <Input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-9 text-xs h-11 border-slate-200 focus-visible:ring-brand-700"
          />
          <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full !py-3.5 !text-xs !font-bold uppercase tracking-wider shadow-xs"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            <span>Verifying Credentials…</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <span>Sign In to Dashboard</span>
            <ArrowRight className="size-4" />
          </span>
        )}
      </Button>

      <div className="pt-2 text-center">
        <p className="text-[11px] text-slate-500">
          Default administrative credentials configured in environment settings.
        </p>
      </div>
    </form>
  );
}
