import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f1ea] px-4 py-10">
      <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-brand-primary">Acessar Elos Locais</h1>
          <p className="mt-2 text-sm text-[#6f766d]">Entre com seu email e senha para continuar.</p>
        </div>

        <label className="block text-sm font-semibold text-[#4b5249]">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-3 w-full rounded-3xl border border-brand-outline bg-[#f9faf2] px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-primary"
            placeholder="seu@email.com"
          />
        </label>

        <label className="block text-sm font-semibold text-[#4b5249] mt-4">
          Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3 w-full rounded-3xl border border-brand-outline bg-[#f9faf2] px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-primary"
            placeholder="••••••••"
          />
        </label>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 w-full rounded-3xl bg-brand-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-[#2d5a27] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </div>
    </div>
  );
}
