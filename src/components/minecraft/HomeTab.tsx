import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { User, Tab } from './types';

interface HomeTabProps {
  isRegistered: boolean;
  user: User | null;
  setActiveTab: (tab: Tab) => void;
}

export default function HomeTab({ isRegistered, user, setActiveTab }: HomeTabProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="minecraft-card bg-card/80 backdrop-blur-sm">
        <div className="relative overflow-hidden min-h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10"></div>
          
          <div className="relative z-10 text-center space-y-8 p-8">
            <h2 className="text-3xl md:text-5xl pixel-text text-primary drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              ДОБРО ПОЖАЛОВАТЬ!
            </h2>
            
            {!isRegistered && (
              <div className="animate-pulse-glow">
                <Button 
                  onClick={() => setActiveTab('auth')}
                  className="minecraft-btn text-lg md:text-2xl !py-6 !px-12 bg-primary hover:bg-primary/90"
                >
                  🎮 РЕГИСТРАЦИЯ
                </Button>
              </div>
            )}
            
            {isRegistered && !user?.isAdmin && (
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

            {user?.isAdmin && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-accent pixel-text text-xl drop-shadow-md">
                  👑 Добро пожаловать, Администратор!
                </p>
                <Button 
                  onClick={() => setActiveTab('admin')}
                  className="minecraft-btn text-lg md:text-2xl !py-6 !px-12 bg-accent hover:bg-accent/90"
                >
                  ⚙️ ОТКРЫТЬ ПАНЕЛЬ УПРАВЛЕНИЯ
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
  );
}
