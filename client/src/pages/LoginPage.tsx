// src/pages/LoginPage.tsx
import { useState, useEffect } from 'react';
import { Mail, Lock, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Page } from '../types';

interface LoginPageProps {
  onNavigate: (page: Page) => void;
  onLoginSuccess: () => void;
}

export default function LoginPage({ onNavigate, onLoginSuccess }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://127.0.0.1:8000';

  // Check if we came back from Google OAuth with token
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('access_token', token);
      onLoginSuccess();
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [onLoginSuccess]);

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/login/google`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            username: email,
            password,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || 'Login failed');

        localStorage.setItem('access_token', data.access_token);
        onLoginSuccess();
      } else {
        const res = await fetch(`${API_URL}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            name: username || email.split('@')[0],
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || 'Signup failed');

        localStorage.setItem('access_token', data.access_token);
        setSuccess('Account created! Please sign in.');
        setIsLogin(true);
        setPassword('');
        setUsername('');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 space-y-8">

          {success && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">{success}</span>
            </div>
          )}

          <div className="text-center space-y-4">
            <div className="inline-block p-3 bg-blue-100 rounded-2xl">
              <Shield className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
          </div>

          {/* Google Login — ONLY on Login screen */}
          {isLogin && (
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 flex items-center justify-center space-x-3 disabled:opacity-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          )}

          {/* Only show divider if Google button is visible */}
          {isLogin && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or sign in with email</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="text-sm font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full mt-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}</span>
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </span>{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
              }}
              className="text-blue-600 hover:text-blue-700 font-bold"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}