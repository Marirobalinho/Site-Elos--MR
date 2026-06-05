import { useState } from 'react';
import type { Provider } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

type AuthMode = 'signIn' | 'signUp';

export default function Login() {
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (mode === 'signUp') {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        setError(error.message);
        return;
      }

      if (data?.user) {
        setSuccess('Conta criada! Verifique seu email para confirmar o cadastro.');
        return;
      }

      setSuccess('Verifique seu email para confirmar sua conta.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    }
  };

  const handleOAuth = async (provider: Provider) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    }
  };

  const isSignUp = mode === 'signUp';

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f1ea] px-4 py-10">
      <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setMode('signIn')}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                !isSignUp ? 'bg-brand-primary text-white' : 'bg-[#f1f2ed] text-brand-charcoal'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setMode('signUp')}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                isSignUp ? 'bg-brand-primary text-white' : 'bg-[#f1f2ed] text-brand-charcoal'
              }`}
            >
              Cadastrar
            </button>
          </div>
          <h1 className="text-3xl font-black text-brand-primary">
            {isSignUp ? 'Crie sua conta' : 'Acessar Elos Locais'}
          </h1>
          <p className="mt-2 text-sm text-[#6f766d]">
            {isSignUp
              ? 'Use seu email para criar acesso à plataforma.'
              : 'Entre com seu email e senha para continuar.'}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={() => handleOAuth('google')}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-3xl border border-[#d3d8cc] bg-white text-sm font-bold text-brand-charcoal transition hover:bg-[#f4f7f0]"
          >
            Continuar com Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuth('github')}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-3xl border border-[#d3d8cc] bg-white text-sm font-bold text-brand-charcoal transition hover:bg-[#f4f7f0]"
          >
            Continuar com GitHub
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 text-sm text-[#6f766d] mb-6">
          <span className="h-px flex-1 bg-[#d9dbd1]" />
          <span>ou</span>
          <span className="h-px flex-1 bg-[#d9dbd1]" />
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
        {success && <p className="mt-4 text-sm text-green-600">{success}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full rounded-3xl bg-brand-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-[#2d5a27] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (isSignUp ? 'Criando...' : 'Entrando...') : isSignUp ? 'Criar conta' : 'Entrar'}
        </button>

        <p className="mt-5 text-center text-sm text-[#6f766d]">
          {isSignUp ? 'Já tem uma conta?' : 'Ainda não tem conta?'}{' '}
          <button
            onClick={() => setMode(isSignUp ? 'signIn' : 'signUp')}
            className="font-bold text-brand-primary hover:underline"
          >
            {isSignUp ? 'Entrar' : 'Cadastrar'}
          </button>
        </p>
      </div>
    </div>
  );
}
