
import React, { useState } from 'react';
import { Lock, User, Mail, ArrowRight, ShieldCheck, LogIn, UserPlus } from 'lucide-react';

interface AdminAuthProps {
  onLoginSuccess: (user: any) => void;
  onBack: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onLoginSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simulação de Login
      const savedUser = localStorage.getItem('txopela_admin');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.email === formData.email && formData.password === 'admin123') { // Senha mock
          onLoginSuccess(user);
        } else {
          alert('Credenciais inválidas. Use o email cadastrado e a senha padrão admin123 para este demo.');
        }
      } else {
        alert('Nenhum administrador cadastrado. Por favor, crie uma conta.');
        setIsLogin(false);
      }
    } else {
      // Simulação de Cadastro
      if (formData.password !== formData.confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }
      const newUser = {
        id: Date.now().toString(),
        email: formData.email,
        username: formData.username,
        role: 'admin'
      };
      localStorage.setItem('txopela_admin', JSON.stringify(newUser));
      alert('Conta de administrador criada com sucesso! Use sua senha para entrar.');
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 bg-red-600 rounded-2xl shadow-2xl shadow-red-600/20 mb-6">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-black text-white">Painel Txopela</h2>
          <p className="text-zinc-500 mt-2">{isLogin ? 'Entre na sua conta administrativa' : 'Crie sua conta de administrador'}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400">Nome de Usuário</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                <input 
                  type="text" required
                  placeholder="Ex: João Admin"
                  className="w-full bg-black/50 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-red-600 outline-none transition"
                  value={formData.username}
                  onChange={e => setFormData({...formData, username: e.target.value})}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-400">Email Institucional</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
              <input 
                type="email" required
                placeholder="admin@txopelatv.com"
                className="w-full bg-black/50 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-red-600 outline-none transition"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-400">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
              <input 
                type="password" required
                placeholder="••••••••"
                className="w-full bg-black/50 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-red-600 outline-none transition"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400">Confirmar Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                <input 
                  type="password" required
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-red-600 outline-none transition"
                  value={formData.confirmPassword}
                  onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-600/20 transition flex items-center justify-center gap-2"
          >
            {isLogin ? <LogIn className="w-5 h-5"/> : <UserPlus className="w-5 h-5"/>}
            {isLogin ? 'Entrar no Sistema' : 'Cadastrar Administrador'}
          </button>
        </form>

        <div className="flex flex-col gap-4 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-zinc-400 hover:text-white text-sm font-medium transition"
          >
            {isLogin ? 'Não tem conta? Crie um acesso administrativo' : 'Já possui uma conta? Faça login'}
          </button>
          
          <button 
            onClick={onBack}
            className="text-zinc-600 hover:text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
          >
            Voltar ao Aplicativo <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
