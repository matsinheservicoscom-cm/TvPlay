
import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  Newspaper, 
  Calendar, 
  Heart, 
  Search, 
  Facebook, 
  Youtube, 
  MessageCircle, 
  Music2, 
  Menu, 
  X,
  Bell,
  User,
  Lock,
  Share2,
  ArrowRight
} from 'lucide-react';
import { AppView, NewsItem, Program, User as UserType } from './types';
import { MOCK_NEWS, MOCK_SCHEDULE, INITIAL_STREAM_URL } from './constants';
import VideoPlayer from './components/VideoPlayer';
import AdminDashboard from './components/AdminDashboard';
import AdminAuth from './components/AdminAuth';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [streamUrl, setStreamUrl] = useState(INITIAL_STREAM_URL);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  
  // Auth state
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  
  // Dynamic content state
  const [newsList, setNewsList] = useState<NewsItem[]>(MOCK_NEWS);
  const [scheduleList, setScheduleList] = useState<Program[]>(MOCK_SCHEDULE);

  useEffect(() => {
    const savedSession = localStorage.getItem('txopela_session');
    if (savedSession) {
      setCurrentUser(JSON.parse(savedSession));
    }
  }, []);

  const handleLogin = (user: UserType) => {
    setCurrentUser(user);
    localStorage.setItem('txopela_session', JSON.stringify(user));
    setView('admin');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('txopela_session');
    setView('home');
  };

  const categories = ['Todas', 'Política', 'Desporto', 'Sociedade', 'Cultura', 'Última Hora'];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredNews = newsList.filter(news => {
    const matchesCategory = selectedCategory === 'Todas' || news.category === selectedCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          news.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShareWhatsApp = (news: NewsItem) => {
    const text = `Confira esta notícia na TxopelaTv: ${news.title} - ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const NavItem = ({ icon: Icon, label, target }: { icon: any, label: string, target: AppView }) => (
    <button 
      onClick={() => { setView(target); setIsMenuOpen(false); }}
      className={`flex items-center gap-3 w-full p-4 rounded-xl transition ${view === target ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'}`}
    >
      <Icon className="w-6 h-6" />
      <span className="font-semibold text-lg">{label}</span>
    </button>
  );

  const handleAdminClick = () => {
    if (currentUser) {
      setView('admin');
    } else {
      setView('admin-auth');
    }
  };

  if (view === 'admin-auth') {
    return <AdminAuth onLoginSuccess={handleLogin} onBack={() => setView('home')} />;
  }

  if (view === 'admin' && currentUser) {
    return (
      <AdminDashboard 
        onUpdateStream={setStreamUrl} 
        currentStreamUrl={streamUrl} 
        onExit={() => setView('home')}
        onLogout={handleLogout}
        news={newsList}
        setNews={setNewsList}
        programs={scheduleList}
        setPrograms={setScheduleList}
        adminUser={currentUser}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-zinc-950 border-r border-zinc-900 p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12 cursor-pointer" onClick={() => setView('home')}>
          <img 
            src="https://api.screenshotone.com/take?url=https%3A%2F%2Fstorage.googleapis.com%2Fstatic.aistudio.google.com%2Fcontent%2Ffile-0-1741275373852&access_key=dummy" 
            alt="TxopelaTv Logo" 
            className="w-14 h-14 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold tracking-tight">TxopelaTv</h1>
            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">O SEU MUNDO EM MOVIMENTO</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={Tv} label="TV Ao Vivo" target="home" />
          <NavItem icon={Newspaper} label="Notícias" target="news" />
          <NavItem icon={Calendar} label="Programação" target="schedule" />
          <NavItem icon={Heart} label="Favoritos" target="favorites" />
        </nav>

        <div className="mt-8 pt-8 border-t border-zinc-900">
          <div className="bg-zinc-900/50 p-4 rounded-xl mb-6">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-red-600" /> Siga-nos
            </h3>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, url: 'https://web.facebook.com/Machonane' },
                { Icon: Youtube, url: 'https://www.youtube.com/@TxopelaTv' },
                { Icon: MessageCircle, url: '#' },
                { Icon: Music2, url: '#' }
              ].map(({ Icon, url }, i) => (
                <a 
                  key={i} 
                  href={url} 
                  target={url !== '#' ? "_blank" : undefined}
                  rel={url !== '#' ? "noopener noreferrer" : undefined}
                  className="p-2 bg-zinc-800 rounded-lg hover:bg-red-600 transition group"
                >
                  <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleAdminClick}
            className="w-full flex items-center gap-2 p-3 text-sm text-zinc-500 hover:text-white transition group"
          >
            <Lock className="w-4 h-4 group-hover:text-red-600" /> 
            {currentUser ? `Admin: ${currentUser.username}` : 'Área Administrativa'}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-zinc-950 p-4 border-b border-zinc-900 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2" onClick={() => setView('home')}>
          <img 
            src="https://api.screenshotone.com/take?url=https%3A%2F%2Fstorage.googleapis.com%2Fstatic.aistudio.google.com%2Fcontent%2Ffile-0-1741275373852&access_key=dummy" 
            alt="Logo" 
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold">TxopelaTv</span>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 md:hidden flex flex-col p-6 animate-in fade-in slide-in-from-top duration-300">
           <div className="mt-12 space-y-4">
              <NavItem icon={Tv} label="TV Ao Vivo" target="home" />
              <NavItem icon={Newspaper} label="Notícias" target="news" />
              <NavItem icon={Calendar} label="Programação" target="schedule" />
              <NavItem icon={Heart} label="Favoritos" target="favorites" />
              <div className="h-[1px] bg-zinc-800 my-4"></div>
              <button 
                onClick={handleAdminClick}
                className="w-full flex items-center gap-3 p-4 text-zinc-400"
              >
                <Lock className="w-6 h-6" /> {currentUser ? 'Ir para Admin' : 'Entrar como Admin'}
              </button>
           </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {/* Header Search / User (Desktop) */}
          <div className="hidden md:flex justify-between items-center mb-8">
            <div className="relative w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Pesquisar notícias ou programas..." 
                className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition relative">
                <Bell className="w-6 h-6 text-zinc-400" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-zinc-950"></span>
              </button>
              <button className="flex items-center gap-3 bg-zinc-900 p-2 pr-5 rounded-xl hover:bg-zinc-800 transition">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-rose-700 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-zinc-300">Minha Conta</span>
              </button>
            </div>
          </div>

          {/* View Content */}
          {view === 'home' && (
            <div className="space-y-10">
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-red-600 rounded-full"></span>
                    Assista Agora
                  </h2>
                  <div className="flex items-center gap-2 text-red-500 font-bold text-sm bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                    2.4k online
                  </div>
                </div>
                <VideoPlayer src={streamUrl} />
              </section>

              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Últimas Notícias</h2>
                  <button onClick={() => setView('news')} className="text-red-500 font-bold text-sm hover:underline">Ver todas</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newsList.slice(0, 3).map(news => (
                    <div 
                      key={news.id} 
                      className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-red-600/50 transition-all group cursor-pointer"
                      onClick={() => { setSelectedNews(news); setView('news-detail'); }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-xs font-bold rounded-full">{news.category}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-xs text-zinc-500 mb-2 font-medium">{new Date(news.date).toLocaleDateString('pt-BR')}</p>
                        <h3 className="text-lg font-bold mb-3 leading-snug group-hover:text-red-500 transition-colors line-clamp-2">{news.title}</h3>
                        <p className="text-zinc-400 text-sm line-clamp-2">{news.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {view === 'news' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold">Portal de Notícias</h2>
                <div className="relative w-full sm:w-64">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                   <input 
                    type="text" 
                    placeholder="Filtrar por texto..." 
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-red-600"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                   />
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-full font-semibold whitespace-nowrap transition ${selectedCategory === cat ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {filteredNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredNews.map(news => (
                    <div 
                      key={news.id} 
                      className="flex flex-col sm:flex-row bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-red-600/50 transition-all group cursor-pointer"
                      onClick={() => { setSelectedNews(news); setView('news-detail'); }}
                    >
                      <div className="w-full sm:w-48 h-48 flex-shrink-0">
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">{news.category}</span>
                            <span className="text-xs text-zinc-500">{new Date(news.date).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <h3 className="text-xl font-bold group-hover:text-red-600 transition-colors mb-2 line-clamp-2">{news.title}</h3>
                          <p className="text-sm text-zinc-400 line-clamp-2">{news.content}</p>
                        </div>
                        <button className="mt-4 text-xs font-bold flex items-center gap-2 group-hover:gap-3 transition-all text-zinc-300 group-hover:text-white">
                          LER MAIS <ArrowRight className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800">
                  <p className="text-zinc-500 font-medium text-lg">Nenhuma notícia encontrada nesta categoria ou pesquisa.</p>
                  <button 
                    onClick={() => { setSelectedCategory('Todas'); setSearchQuery(''); }}
                    className="mt-4 text-red-500 font-bold hover:underline"
                  >
                    Limpar filtros
                  </button>
                </div>
              )}
            </div>
          )}

          {view === 'news-detail' && selectedNews && (
             <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
                <button onClick={() => setView('news')} className="flex items-center gap-2 text-zinc-400 hover:text-white transition group">
                  <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span> Voltar para Notícias
                </button>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="px-3 py-1 bg-red-600/20 text-red-500 text-xs font-bold rounded-full border border-red-500/30">{selectedNews.category}</span>
                    <span className="text-zinc-500 text-xs font-medium self-center">{new Date(selectedNews.date).toLocaleDateString('pt-BR', { dateStyle: 'full' })}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black leading-tight">{selectedNews.title}</h1>
                  <div className="flex gap-4">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition">
                      <Facebook className="w-4 h-4" /> Partilhar
                    </a>
                    <button 
                      onClick={() => handleShareWhatsApp(selectedNews)}
                      className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition"
                    >
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </button>
                  </div>
                </div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[300px] md:h-[500px]">
                   <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-full object-cover" />
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-xl leading-relaxed text-zinc-300">
                    {selectedNews.content}
                  </p>
                </div>
             </div>
          )}

          {view === 'schedule' && (
            <div className="space-y-8">
               <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-bold">Grade de Programação</h2>
                    <p className="text-zinc-500 mt-1">Confira o que preparamos para você hoje.</p>
                  </div>
                  <div className="flex bg-zinc-900 p-1.5 rounded-xl border border-zinc-800">
                    <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold shadow-lg shadow-red-600/20">Hoje</button>
                    <button className="px-6 py-2 text-zinc-400 hover:text-white transition">Amanhã</button>
                  </div>
               </div>

               <div className="space-y-4">
                  {scheduleList.map(program => (
                    <div key={program.id} className="bg-zinc-900/40 border border-zinc-800/40 p-4 rounded-2xl flex items-center gap-6 hover:bg-zinc-800/40 transition group">
                      <div className="text-center min-w-[80px]">
                        <span className="block text-2xl font-black text-white">{program.time}</span>
                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Início</span>
                      </div>
                      <div className="w-32 h-20 rounded-xl overflow-hidden hidden sm:block">
                        <img src={program.image} alt={program.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold group-hover:text-red-500 transition">{program.name}</h3>
                        <p className="text-zinc-500 text-sm line-clamp-1">{program.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => toggleFavorite(program.id)}
                          className={`p-3 rounded-xl transition ${favorites.includes(program.id) ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-500 hover:text-white'}`}
                        >
                          <Heart className={`w-5 h-5 ${favorites.includes(program.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {view === 'favorites' && (
            <div className="space-y-8">
               <h2 className="text-3xl font-bold">Seus Favoritos</h2>
               {favorites.length === 0 ? (
                 <div className="bg-zinc-900/30 border-2 border-dashed border-zinc-800 rounded-3xl p-20 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                      <Heart className="w-10 h-10 text-zinc-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Sua lista está vazia</h3>
                    <p className="text-zinc-500 max-w-sm">Favorite programas e notícias para acessá-los rapidamente por aqui.</p>
                    <button onClick={() => setView('schedule')} className="mt-8 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl font-bold transition">Explorar Programação</button>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {scheduleList.filter(p => favorites.includes(p.id)).map(program => (
                      <div key={program.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                         <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                            <img src={program.image} alt={program.name} className="w-full h-full object-cover" />
                            <button 
                              onClick={() => toggleFavorite(program.id)}
                              className="absolute top-3 right-3 p-2 bg-red-600 rounded-lg shadow-lg"
                            >
                              <Heart className="w-4 h-4 fill-current" />
                            </button>
                         </div>
                         <h4 className="font-bold text-lg mb-1">{program.name}</h4>
                         <p className="text-zinc-500 text-sm mb-4">{program.time}</p>
                         <button className="w-full bg-zinc-800 hover:bg-zinc-700 py-2.5 rounded-lg text-sm font-bold transition">Ver Detalhes</button>
                      </div>
                   ))}
                 </div>
               )}
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button - Mobile Admin Shortcut */}
      <button 
        onClick={handleAdminClick}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-red-600 rounded-full shadow-2xl flex items-center justify-center z-50 animate-bounce"
      >
        <Lock className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default App;
