
import { NewsItem, Program, Stats } from './types';

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '5',
    title: 'Ministério da Educação responsabiliza professores por reprovações na 9ª classe',
    content: 'Em entrevista à STV, o porta-voz do Ministério da Educação e Cultura, Silvestre Dava, afirmou que o elevado índice de reprovações nos exames da 9ª classe reflete a falta de preparação dos alunos pelos docentes. "Precisamos de trabalhar mais, não só com os alunos, mas com o sistema no seu todo para resolver as lacunas existentes", destacou Dava.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    category: 'Sociedade',
    date: '2024-05-21'
  },
  {
    id: '1',
    title: 'Novo Investimento em Infraestrutura Nacional',
    content: 'O governo anunciou hoje um pacote de investimentos bilionários para a modernização das estradas e portos do país. O projeto visa reduzir custos logísticos e impulsionar a economia regional.',
    image: 'https://picsum.photos/800/400?random=1',
    category: 'Política',
    date: '2024-05-20'
  },
  {
    id: '2',
    title: 'Txopela FC vence o clássico de domingo',
    content: 'Em uma partida emocionante, o Txopela FC derrotou seu maior rival por 2 a 1, assumindo a liderança isolada do campeonato nacional.',
    image: 'https://picsum.photos/800/400?random=2',
    category: 'Desporto',
    date: '2024-05-19'
  },
  {
    id: '3',
    title: 'Festival de Cultura Urbana atrai milhares',
    content: 'A capital foi palco de uma explosão de cores e sons neste final de semana com o Festival Txopela de Cultura Urbana.',
    image: 'https://picsum.photos/800/400?random=3',
    category: 'Cultura',
    date: '2024-05-18'
  },
  {
    id: '4',
    title: 'Avanços na Saúde Pública local',
    content: 'Novas unidades de pronto atendimento foram inauguradas hoje, prometendo reduzir as filas em até 40% nas zonas periféricas.',
    image: 'https://picsum.photos/800/400?random=4',
    category: 'Sociedade',
    date: '2024-05-17'
  }
];

export const MOCK_SCHEDULE: Program[] = [
  {
    id: '101',
    name: 'Momento de Gratidão - David Forlu',
    time: 'AGORA',
    description: 'Acompanhe a transmissão especial do louvor "Jehovah Eh" gravado ao vivo.',
    image: 'https://images.unsplash.com/photo-1514525253361-bee8a48740d7?auto=format&fit=crop&q=80&w=400',
    day: 'Hoje'
  },
  {
    id: '102',
    name: 'Jornal do Meio Dia',
    time: '12:00',
    description: 'Resumo completo dos acontecimentos da manhã no país e no mundo.',
    image: 'https://picsum.photos/200/120?random=12',
    day: 'Hoje'
  },
  {
    id: '103',
    name: 'Desporto Txopela',
    time: '18:00',
    description: 'Tudo sobre futebol, basquete e as modalidades que movem a nação.',
    image: 'https://picsum.photos/200/120?random=13',
    day: 'Hoje'
  },
  {
    id: '104',
    name: 'Novelas: O Destino',
    time: '20:00',
    description: 'O capítulo de hoje promete revelações bombásticas sobre o segredo da família Mendes.',
    image: 'https://picsum.photos/200/120?random=14',
    day: 'Hoje'
  },
  {
    id: '105',
    name: 'Cine Txopela',
    time: '22:30',
    description: 'Os melhores filmes de ação e suspense na sua tela.',
    image: 'https://picsum.photos/200/120?random=15',
    day: 'Hoje'
  }
];

export const MOCK_STATS: Stats[] = [
  { date: 'Seg', viewers: 1200 },
  { date: 'Ter', viewers: 1900 },
  { date: 'Qua', viewers: 1500 },
  { date: 'Qui', viewers: 2400 },
  { date: 'Sex', viewers: 3100 },
  { date: 'Sáb', viewers: 4500 },
  { date: 'Dom', viewers: 4800 },
];

export const INITIAL_STREAM_URL = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'; 
