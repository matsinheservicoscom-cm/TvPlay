
export interface NewsItem {
  id: string;
  title: string;
  content: string;
  image: string;
  category: 'Política' | 'Desporto' | 'Sociedade' | 'Cultura' | 'Última Hora';
  date: string;
}

export interface Program {
  id: string;
  name: string;
  time: string;
  description: string;
  image: string;
  day: 'Hoje' | 'Amanhã';
}

export interface Stats {
  date: string;
  viewers: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: 'admin';
}

export type AppView = 'home' | 'news' | 'schedule' | 'favorites' | 'admin' | 'admin-auth' | 'news-detail';
