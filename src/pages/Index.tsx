import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

type Tab = 'home' | 'interesting' | 'auth' | 'support' | 'community';

interface User {
  username: string;
  email: string;
}

interface Comment {
  id: number;
  username: string;
  text: string;
  timestamp: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const { toast } = useToast();

  const [authForm, setAuthForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [comments, setComments] = useState<Comment[]>([
    { id: 1, username: 'Steve', text: 'Добро пожаловать в наше сообщество!', timestamp: new Date().toLocaleString() },
    { id: 2, username: 'Alex', text: 'Крафтим вместе! 🔨', timestamp: new Date().toLocaleString() }
  ]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('minecraftUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsRegistered(true);
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      const savedUser = localStorage.getItem('minecraftUser');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        if (userData.username === authForm.username) {
          setUser(userData);
          setIsRegistered(true);
          toast({ title: '✅ Вход выполнен!', description: `Добро пожаловать обратно, ${authForm.username}!` });
          setTimeout(() => {
            window.open('https://tlauncher.org', '_blank');
          }, 1500);
        } else {
          toast({ title: '❌ Ошибка', description: 'Неверные данные для входа', variant: 'destructive' });
        }
      }
    } else {
      if (authForm.username && authForm.email && authForm.password) {
        const newUser = { username: authForm.username, email: authForm.email };
        localStorage.setItem('minecraftUser', JSON.stringify(newUser));
        setUser(newUser);
        setIsRegistered(true);
        toast({ title: '✅ Регистрация успешна!', description: 'Перенаправляем вас на TLauncher...' });
        
        setTimeout(() => {
          window.open('https://tlauncher.org', '_blank');
        }, 2000);
      } else {
        toast({ title: '❌ Ошибка', description: 'Заполните все поля', variant: 'destructive' });
      }
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: '⚠️ Требуется вход', description: 'Войдите, чтобы оставлять комментарии' });
      setActiveTab('auth');
      return;
    }
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        username: user.username,
        text: newComment,
        timestamp: new Date().toLocaleString()
      };
      setComments([comment, ...comments]);
      setNewComment('');
      toast({ title: '✅ Комментарий добавлен!' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('minecraftUser');
    setUser(null);
    setIsRegistered(false);
    toast({ title: '👋 Выход выполнен' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      <div className="min-h-screen bg-black/20 backdrop-blur-[1px]">
        <nav className="bg-card/90 backdrop-blur-md border-b-4 border-border p-4 sticky top-0 z-50">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl md:text-4xl pixel-text text-primary flex items-center gap-2 drop-shadow-lg">
                <span className="animate-pulse">⛏️</span> MINECRAFT PORTAL
              </h1>
              {user && (
                <div className="flex items-center gap-3">
                  <span className="text-xs md:text-sm pixel-text text-primary drop-shadow-md">👤 {user.username}</span>
                  <button onClick={handleLogout} className="text-xs minecraft-btn !py-2 !px-4 bg-destructive">
                    Выход
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 md:gap-4">
              {[
                { id: 'home' as Tab, label: '🏠 Главная' },
                { id: 'interesting' as Tab, label: '⭐ Интересное' },
                { id: 'auth' as Tab, label: '🔐 Вход/Регистрация' },
                { id: 'support' as Tab, label: '💬 Поддержка' },
                { id: 'community' as Tab, label: '👥 Сообщество' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`minecraft-btn text-xs md:text-sm transition-all duration-200 ${
                    activeTab === tab.id ? 'bg-primary scale-105' : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main className="container mx-auto p-4 md:p-8">
          {activeTab === 'home' && (
            <div className="space-y-8 animate-fade-in">
              <Card className="minecraft-card bg-card/80 backdrop-blur-sm">
                <div className="relative overflow-hidden min-h-[400px] flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10"></div>
                  
                  <div className="relative z-10 text-center space-y-8 p-8">
                    <h2 className="text-3xl md:text-5xl pixel-text text-primary drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                      ДОБРО ПОЖАЛОВАТЬ!
                    </h2>
                    
                    {!isRegistered && (
                      <div className="relative">
                        <div className="absolute left-1/2 -translate-x-1/2 -ml-16 -top-24 text-7xl animate-float" style={{ transform: 'translateX(-50%) translateX(-4rem) rotate(135deg)' }}>
                          👉
                        </div>
                        <div className="animate-pulse-glow">
                          <Button 
                            onClick={() => setActiveTab('auth')}
                            className="minecraft-btn text-lg md:text-2xl !py-6 !px-12 bg-primary hover:bg-primary/90"
                          >
                            🎮 РЕГИСТРАЦИЯ
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {isRegistered && (
                      <div className="space-y-4 animate-fade-in">
                        <p className="text-primary pixel-text text-xl drop-shadow-md">
                          ✅ Вы зарегистрированы как {user?.username}!
                        </p>
                        <Button 
                          onClick={() => window.open('https://tlauncher.org', '_blank')}
                          className="minecraft-btn text-lg md:text-2xl !py-6 !px-12 bg-accent hover:bg-accent/90"
                        >
                          🚀 ПЕРЕЙТИ К TLAUNCHER
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="minecraft-card bg-card/80 backdrop-blur-sm hover:scale-105 transition-transform">
                  <h3 className="text-xl md:text-2xl pixel-text text-accent mb-4 flex items-center gap-2">
                    <Icon name="Sparkles" className="w-6 h-6" /> О ПОРТАЛЕ
                  </h3>
                  <div className="space-y-3 text-sm md:text-base text-card-foreground">
                    <p className="flex items-center gap-2"><Icon name="Gamepad2" className="w-5 h-5 text-primary" /> Официальный портал Minecraft</p>
                    <p className="flex items-center gap-2"><Icon name="Zap" className="w-5 h-5 text-accent" /> Быстрый доступ через TLauncher</p>
                    <p className="flex items-center gap-2"><Icon name="Users" className="w-5 h-5 text-secondary" /> Активное сообщество игроков</p>
                    <p className="flex items-center gap-2"><Icon name="MessageCircle" className="w-5 h-5 text-primary" /> Поддержка 24/7</p>
                  </div>
                </Card>

                <Card className="minecraft-card bg-card/80 backdrop-blur-sm hover:scale-105 transition-transform">
                  <h3 className="text-xl md:text-2xl pixel-text text-accent mb-4 flex items-center gap-2">
                    <Icon name="Trophy" className="w-6 h-6" /> ОСОБЕННОСТИ
                  </h3>
                  <div className="space-y-3 text-sm md:text-base text-card-foreground">
                    <p className="flex items-center gap-2"><Icon name="Sword" className="w-5 h-5 text-destructive" /> Эпичные PvP битвы</p>
                    <p className="flex items-center gap-2"><Icon name="Hammer" className="w-5 h-5 text-primary" /> Креативное строительство</p>
                    <p className="flex items-center gap-2"><Icon name="Flame" className="w-5 h-5 text-accent" /> Режим выживания</p>
                    <p className="flex items-center gap-2"><Icon name="Star" className="w-5 h-5 text-secondary" /> Уникальные моды</p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'interesting' && (
            <div className="space-y-6 animate-fade-in">
              <Card className="minecraft-card bg-card/80 backdrop-blur-sm">
                <h2 className="text-2xl md:text-3xl pixel-text text-primary mb-6 flex items-center gap-3">
                  <Icon name="Sparkles" className="w-8 h-8" /> ИНТЕРЕСНОЕ
                </h2>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-accent/20 to-transparent p-6 border-l-4 border-accent hover:translate-x-2 transition-transform">
                    <h3 className="font-bold text-xl mb-2 flex items-center gap-2 text-accent">
                      <Icon name="Trophy" className="w-6 h-6" /> Новый рекорд!
                    </h3>
                    <p className="text-card-foreground">
                      Игрок DragonSlayer установил рекорд скорости прохождения End - 8 минут 32 секунды!
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-primary/20 to-transparent p-6 border-l-4 border-primary hover:translate-x-2 transition-transform">
                    <h3 className="font-bold text-xl mb-2 flex items-center gap-2 text-primary">
                      <Icon name="Rocket" className="w-6 h-6" /> Обновление сервера
                    </h3>
                    <p className="text-card-foreground">
                      Добавлены новые биомы, мобы и уникальные предметы. Исследуйте мир заново!
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-secondary/20 to-transparent p-6 border-l-4 border-secondary hover:translate-x-2 transition-transform">
                    <h3 className="font-bold text-xl mb-2 flex items-center gap-2 text-secondary">
                      <Icon name="Award" className="w-6 h-6" /> Еженедельный конкурс
                    </h3>
                    <p className="text-card-foreground">
                      Постройте лучший дом и получите алмазную броню! Прием заявок до воскресенья.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'auth' && (
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="minecraft-card bg-card/80 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-6 pixel-text text-primary flex items-center gap-2">
                    <Icon name="LogIn" className="w-7 h-7" /> Вход
                  </h2>
                  <form onSubmit={handleAuth} className="space-y-5">
                    <div>
                      <label className="block mb-2 text-sm font-bold text-card-foreground">Никнейм</label>
                      <Input
                        type="text"
                        value={authForm.username}
                        onChange={(e) => {
                          setAuthForm({ ...authForm, username: e.target.value });
                          setIsLogin(true);
                        }}
                        placeholder="Steve123"
                        className="bg-input/80 border-2 border-border focus:border-primary transition-colors"
                        required
                      />
                    </div>
                    <Button type="submit" className="minecraft-btn w-full bg-primary hover:bg-primary/90">
                      <Icon name="LogIn" className="mr-2 h-5 w-5" />
                      Войти
                    </Button>
                  </form>
                </Card>

                <Card className="minecraft-card bg-card/80 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-6 pixel-text text-primary flex items-center gap-2">
                    <Icon name="UserPlus" className="w-7 h-7" /> Регистрация
                  </h2>
                  <form onSubmit={handleAuth} className="space-y-5">
                    <div>
                      <label className="block mb-2 text-sm font-bold text-card-foreground">Никнейм</label>
                      <Input
                        type="text"
                        value={authForm.username}
                        onChange={(e) => {
                          setAuthForm({ ...authForm, username: e.target.value });
                          setIsLogin(false);
                        }}
                        placeholder="Steve123"
                        className="bg-input/80 border-2 border-border focus:border-primary transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-bold text-card-foreground">Email</label>
                      <Input
                        type="email"
                        value={authForm.email}
                        onChange={(e) => {
                          setAuthForm({ ...authForm, email: e.target.value });
                          setIsLogin(false);
                        }}
                        placeholder="steve@minecraft.com"
                        className="bg-input/80 border-2 border-border focus:border-primary transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-bold text-card-foreground">Пароль</label>
                      <Input
                        type="password"
                        value={authForm.password}
                        onChange={(e) => {
                          setAuthForm({ ...authForm, password: e.target.value });
                          setIsLogin(false);
                        }}
                        placeholder="••••••••"
                        className="bg-input/80 border-2 border-border focus:border-primary transition-colors"
                        required
                      />
                    </div>
                    <Button type="submit" className="minecraft-btn w-full bg-accent hover:bg-accent/90">
                      <Icon name="UserPlus" className="mr-2 h-5 w-5" />
                      Зарегистрироваться
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <Card className="minecraft-card text-center bg-card/80 backdrop-blur-sm">
                <Icon name="Headphones" className="w-20 h-20 mx-auto mb-6 text-primary animate-float" />
                <h2 className="text-3xl md:text-4xl font-bold mb-6 pixel-text text-primary">
                  ПОДДЕРЖКА
                </h2>
                <p className="text-xl md:text-2xl mb-8 text-card-foreground pixel-text">
                  Вопросы/Помощь писать сюда:
                </p>
                <a
                  href="https://t.me/Fireddrak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="minecraft-btn text-lg md:text-xl py-6 px-10 bg-secondary hover:bg-secondary/90 hover:scale-105 transition-transform">
                    <Icon name="Send" className="mr-3 h-6 w-6" />
                    Написать в Telegram
                  </Button>
                </a>
                <p className="mt-6 text-base md:text-lg text-muted-foreground pixel-text">
                  @Fireddrak
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Отвечаем быстро! ⚡
                </p>
              </Card>
            </div>
          )}

          {activeTab === 'community' && (
            <div className="max-w-4xl mx-auto animate-fade-in">
              <Card className="minecraft-card bg-card/80 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-6 pixel-text text-primary flex items-center gap-3">
                  <Icon name="Users" className="w-8 h-8" /> СООБЩЕСТВО
                </h2>

                <div className="mb-8 p-6 bg-muted/50 border-2 border-border">
                  <h3 className="font-bold text-xl mb-4 text-accent flex items-center gap-2">
                    <Icon name="MessageSquarePlus" className="w-6 h-6" /> Добавить сообщение
                  </h3>
                  <form onSubmit={handleAddComment} className="space-y-4">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Написать сообщение..."
                      className="bg-input/80 border-2 border-border min-h-[100px] focus:border-primary transition-colors"
                      required
                    />
                    <Button type="submit" className="minecraft-btn bg-primary hover:bg-primary/90">
                      <Icon name="Send" className="mr-2 h-5 w-5" />
                      Отправить
                    </Button>
                  </form>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-xl mb-4 text-accent flex items-center gap-2">
                    <Icon name="MessagesSquare" className="w-6 h-6" /> Последние сообщения
                  </h3>
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-muted/50 p-5 border-2 border-border animate-slide-in hover:border-primary transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-primary flex items-center gap-2">
                          <Icon name="User" className="w-5 h-5" />
                          {comment.username}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Icon name="Clock" className="w-4 h-4" />
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-card-foreground pl-7">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;