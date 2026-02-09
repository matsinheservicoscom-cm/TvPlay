import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Settings, Users, Radio, FileText, Layout, Bell, Shield, LogOut, Trash2, Copy, CheckCircle, Calendar, X, User, Tv } from 'lucide-react';
import { MOCK_STATS } from '../constants';
import { NewsItem, Program, User as UserType } from '../types';

interface AdminDashboardProps {
  onUpdateStream: (url: string) => void;
  currentStreamUrl: string;
  onExit: () => void;
  onLogout: () => void;
  news: NewsItem[];
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  programs: Program[];
  setPrograms: React.Dispatch<React.SetStateAction<Program[]>>;
  adminUser: UserType;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  onUpdateStream, 
  currentStreamUrl, 
  onExit,
  onLogout,
  news,
  setNews,
  programs,
  setPrograms,
  adminUser
}) => {
  const [streamUrl, setStreamUrl] = useState(currentStreamUrl);
  const [activeTab, setActiveTab] = useState<'overview' | 'stream' | 'news' | 'users' | 'programs'>('overview');
  
  const [newNews, setNewNews] = useState<Partial<NewsItem>>({
    category: 'Sociedade',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [newProgram, setNewProgram] = useState<Partial<Program>>({
    day: 'Hoje',
    time: '00:00'
  });

  const [copiedKey, setCopiedKey] = useState(false);

  const handleUpdateStream = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStream(streamUrl);
    alert('Link de streaming atualizado!');
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNews.title || !newNews.content) return;
    
    const item: NewsItem = {
      id: Date.now().toString(),
      title: newNews.title,
      content: newNews.content,
      image: newNews.image || `https://picsum.photos/800/400?random=${Date.now()}`,
      category: newNews.category as any || 'Sociedade',
      date: newNews.date || new Date().toISOString().split('T')[0]
    };
    
    setNews(prev => [item, ...prev]);
    setNewNews({ category: 'Sociedade', date: new Date().toISOString().split('T')[0] });
    alert('Notícia publicada com sucesso!');
  };

  const handleDeleteNews = (id: string) => {
    if (confirm('Deseja realmente excluir esta notícia?')) {
      setNews(prev => prev.filter(n => n.id !== id));
    }
  };

  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgram.name || !newProgram.time) return;
    
    const item: Program = {
      id: Date.now().toString(),
      name: newProgram.name,
      time: newProgram.time,
      description: newProgram.description || '',
      image: newProgram.image || `https://picsum.photos/200/120?random=${Date.now()}`,
      day: newProgram.day as any || 'Hoje'
    };
    
    setPrograms(prev => [...prev, item].sort((a, b) => a.time.localeCompare(b.time)));
    setNewProgram({ day: 'Hoje', time: '00:00' });
    alert('Programa adicionado à grade!');
  };

  const handleDeleteProgram = (id: string) => {
    setPrograms(prev => prev.filter(p => p.id !== id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      {/* Sidebar Admin */}
      <aside className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={onExit}>
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter">TXOPELA ADMIN</span>
        </div>

        <div className="mb-8 p-4 bg-black/50 rounded-2xl border border-zinc-800">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                 <User className="w-5 h-5 text-zinc-400" />
              </div>
              <div>
                 <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Sessão Ativa</p>
                 <p className="text-sm font-bold text-white truncate w-32">{adminUser.username}</p>
              </div>
           </div>
        </div>

        <nav className="flex-1 space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'overview' ? 'bg-red-600 shadow-lg shadow-red-600/20' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'}`}>
            <Layout className="w-5 h-5" /> Visão Geral
          </button>
          <button onClick={() => setActiveTab('stream')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'stream' ? 'bg-red-600 shadow-lg shadow-red-600/20' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'}`}>
            <Radio className="w-5 h-5" /> Live OBS/vMix
          </button>
          <button onClick={() => setActiveTab('news')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'news' ? 'bg-red-600 shadow-lg shadow-red-600/20' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'}`}>
            <FileText className="w-5 h-5" /> Portal de Notícias
          </button>
          <button onClick={() => setActiveTab('programs')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'programs' ? 'bg-red-600 shadow-lg shadow-red-600/20' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'}`}>
            <Calendar className="w-5 h-5" /> Grade TV
          </button>
        </nav>

        <div className="pt-6 border-t border-zinc-800 space-y-2">
          <button onClick={onExit} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition">
            <Tv className="w-5 h-5" /> Voltar à TV
          </button>
          <button onClick={onLogout} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-600/20 text-red-500 transition font-bold">
            <LogOut className="w-5 h-5" /> Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black">Dashboard Administrativo</h1>
            <p className="text-zinc-500">Gestão centralizada de conteúdos e transmissões.</p>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={onExit} className="md:hidden bg-zinc-800 p-2 rounded-lg"><X /></button>
             <div className="hidden sm:flex items-center gap-3 bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-zinc-400">STATUS DO SISTEMA: OK</span>
             </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Espectadores Ativos', value: '1,284', change: '+12%', color: 'text-green-500' },
                { label: 'Notícias Publicadas', value: news.length.toString(), change: '+8', color: 'text-blue-500' },
                { label: 'Audiência Semanal', value: '45.2K', change: '+5.4%', color: 'text-purple-500' },
                { label: 'Uptime do Servidor', value: '99.9%', change: 'Estável', color: 'text-yellow-500' },
              ].map((stat, i) => (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl backdrop-blur-md">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-black">{stat.value}</span>
                    <span className={`text-xs font-bold ${stat.color}`}>{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-6">Audiência em Tempo Real</h2>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_STATS}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="date" stroke="#71717a" />
                    <YAxis stroke="#71717a" />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }} />
                    <Bar dataKey="viewers" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stream' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom duration-500">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl h-fit">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-red-600" /> 
                Credenciais OBS / vMix
              </h2>
              <p className="text-zinc-500 mb-8 text-sm leading-relaxed">
                Utilize as informações abaixo para configurar sua transmissão externa. Copie e cole no campo "Servidor" e "Chave de Fluxo" do seu software.
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">URL do Servidor (RTMP)</label>
                  <div className="flex bg-black p-4 rounded-xl border border-zinc-800 items-center justify-between">
                    <code className="text-red-500 text-sm font-mono">rtmp://live.txopelatv.com/app</code>
                    <button onClick={() => copyToClipboard('rtmp://live.txopelatv.com/app')} className="p-1 hover:text-red-600 transition"><Copy className="w-5 h-5"/></button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">Chave de Transmissão</label>
                  <div className="flex bg-black p-4 rounded-xl border border-zinc-800 items-center justify-between">
                    <code className="text-zinc-300 text-sm font-mono">tx_********_live_primary</code>
                    <button onClick={() => copyToClipboard('tx_********_live_primary')} className="p-1 hover:text-red-600 transition"><Copy className="w-5 h-5"/></button>
                  </div>
                </div>
                {copiedKey && <p className="text-green-500 text-xs font-bold flex items-center gap-1 animate-bounce"><CheckCircle className="w-3 h-3"/> Chave copiada para a área de transferência!</p>}
              </div>

              <div className="mt-10 p-6 bg-red-600/5 rounded-2xl border border-red-600/10">
                <h4 className="font-bold text-sm text-red-500 mb-3 flex items-center gap-2">Protocolo de Transmissão:</h4>
                <ul className="text-xs text-zinc-400 space-y-3">
                  <li className="flex gap-2">
                    <span className="text-red-600 font-black">01.</span>
                    No OBS, vá em Configurações &gt; Transmissão e selecione "Personalizado".
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600 font-black">02.</span>
                    Configure o bitrate de vídeo entre 2500kbps e 6000kbps para estabilidade.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600 font-black">03.</span>
                    Inicie a transmissão e salve o link HLS no painel ao lado para que apareça no App.
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl h-fit">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <Radio className="w-6 h-6 text-red-600" /> 
                Saída HLS (Playback)
              </h2>
              <form onSubmit={handleUpdateStream} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-widest">Link Público (.m3u8)</label>
                  <input 
                    type="text" 
                    value={streamUrl}
                    onChange={(e) => setStreamUrl(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-red-600 transition font-mono text-sm"
                    placeholder="https://cdn.txopela.com/hls/stream.m3u8"
                  />
                  <p className="mt-3 text-xs text-zinc-600 italic">Este link será lido pelo player do aplicativo em tempo real.</p>
                </div>
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl shadow-lg shadow-red-600/20 transition flex items-center justify-center gap-2">
                  <Settings className="w-5 h-5" /> Aplicar Nova Transmissão
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
              <h2 className="text-2xl font-black mb-6">Redação de Notícias</h2>
              <form onSubmit={handleAddNews} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                     <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">Título da Matéria</label>
                     <input 
                        type="text" required
                        className="w-full bg-black border border-zinc-800 p-4 rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition"
                        value={newNews.title || ''}
                        onChange={e => setNewNews({...newNews, title: e.target.value})}
                      />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">Categoria</label>
                        <select 
                          className="w-full bg-black border border-zinc-800 p-4 rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition"
                          value={newNews.category}
                          onChange={e => setNewNews({...newNews, category: e.target.value as any})}
                        >
                          <option>Política</option>
                          <option>Desporto</option>
                          <option>Sociedade</option>
                          <option>Cultura</option>
                          <option>Última Hora</option>
                        </select>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">Data de Publicação</label>
                        <input 
                          type="date"
                          className="w-full bg-black border border-zinc-800 p-4 rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition"
                          value={newNews.date}
                          onChange={e => setNewNews({...newNews, date: e.target.value})}
                        />
                     </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">URL da Imagem de Capa</label>
                    <input 
                      type="text" 
                      className="w-full bg-black border border-zinc-800 p-4 rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition"
                      value={newNews.image || ''}
                      onChange={e => setNewNews({...newNews, image: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">Corpo da Notícia</label>
                  <textarea 
                    required rows={7}
                    className="w-full bg-black border border-zinc-800 p-4 rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition resize-none"
                    value={newNews.content || ''}
                    onChange={e => setNewNews({...newNews, content: e.target.value})}
                  ></textarea>
                  <button type="submit" className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl font-black shadow-lg shadow-red-600/20 transition flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5"/> Publicar no Portal
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 bg-zinc-800/30 border-b border-zinc-800">
                 <h3 className="font-black uppercase tracking-widest text-sm">Notícias Recentes</h3>
              </div>
              <table className="w-full text-left">
                <thead className="bg-zinc-800/50 text-zinc-500 text-[10px] font-black uppercase tracking-tighter">
                  <tr>
                    <th className="p-5">Manchete</th>
                    <th className="p-5">Editoria</th>
                    <th className="p-5">Publicado em</th>
                    <th className="p-5 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {news.map(n => (
                    <tr key={n.id} className="hover:bg-black/20 transition group">
                      <td className="p-5 font-bold max-w-md truncate">{n.title}</td>
                      <td className="p-5"><span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-[10px] font-black uppercase tracking-widest">{n.category}</span></td>
                      <td className="p-5 text-zinc-500 text-xs font-bold">{new Date(n.date).toLocaleDateString()}</td>
                      <td className="p-5 text-right">
                        <button onClick={() => handleDeleteNews(n.id)} className="p-2 text-zinc-600 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4"/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
              <h2 className="text-2xl font-black mb-6">Grade de Programação</h2>
              <form onSubmit={handleAddProgram} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">Nome da Atração</label>
                  <input 
                    type="text" required
                    className="w-full bg-black border border-zinc-800 p-4 rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition"
                    value={newProgram.name || ''}
                    onChange={e => setNewProgram({...newProgram, name: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">Horário</label>
                        <input 
                          type="time" required
                          className="w-full bg-black border border-zinc-800 p-4 rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition"
                          value={newProgram.time || ''}
                          onChange={e => setNewProgram({...newProgram, time: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">Dia</label>
                        <select 
                          className="w-full bg-black border border-zinc-800 p-4 rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition"
                          value={newProgram.day}
                          onChange={e => setNewProgram({...newProgram, day: e.target.value as any})}
                        >
                          <option>Hoje</option>
                          <option>Amanhã</option>
                        </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">Sinopse/Descrição</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-black border border-zinc-800 p-4 rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition resize-none"
                    value={newProgram.description || ''}
                    onChange={e => setNewProgram({...newProgram, description: e.target.value})}
                  ></textarea>
                  <button type="submit" className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl font-black shadow-lg shadow-red-600/20 transition flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5"/> Atualizar Grade
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
               <div className="p-6 bg-zinc-800/30 border-b border-zinc-800 flex items-center justify-between">
                 <h3 className="font-black uppercase tracking-widest text-sm">Programação Completa</h3>
                 <div className="flex gap-2">
                    <button className="px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase rounded-lg">Hoje</button>
                    <button className="px-4 py-1.5 bg-zinc-800 text-zinc-500 text-[10px] font-black uppercase rounded-lg hover:text-white transition">Amanhã</button>
                 </div>
               </div>
               <table className="w-full text-left">
                <thead className="bg-zinc-800/50 text-zinc-500 text-[10px] font-black uppercase tracking-tighter">
                  <tr>
                    <th className="p-5">Horário</th>
                    <th className="p-5">Atração</th>
                    <th className="p-5">Dia</th>
                    <th className="p-5 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {programs.map(p => (
                    <tr key={p.id} className="hover:bg-black/20 transition group">
                      <td className="p-5 font-black text-red-500">{p.time}</td>
                      <td className="p-5">
                        <div className="font-black">{p.name}</div>
                        <div className="text-[10px] text-zinc-500 font-medium leading-relaxed max-w-sm">{p.description}</div>
                      </td>
                      <td className="p-5 text-zinc-400 text-xs font-bold">{p.day}</td>
                      <td className="p-5 text-right">
                        <button onClick={() => handleDeleteProgram(p.id)} className="p-2 text-zinc-600 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4"/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
           <div className="bg-zinc-900/50 border border-zinc-800 p-20 rounded-[40px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700 backdrop-blur-3xl">
              <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mb-8">
                 <Users className="w-12 h-12 text-zinc-600" />
              </div>
              <h3 className="text-2xl font-black mb-3">Controle de Administradores</h3>
              <p className="text-zinc-500 max-w-sm font-medium">Esta seção permite gerenciar permissões e novos acessos. Funcionalidade bloqueada para o nível de acesso: {adminUser.username}.</p>
              <div className="mt-8 flex gap-4">
                 <button className="px-8 py-3 bg-zinc-800 text-zinc-400 font-black rounded-xl cursor-not-allowed opacity-50">Novo Admin</button>
                 <button className="px-8 py-3 border border-zinc-800 text-zinc-500 font-black rounded-xl">Solicitar Upgrade</button>
              </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;