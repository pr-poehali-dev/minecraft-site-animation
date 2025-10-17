import { Button } from '@/components/ui/button';
import { Tab, User } from './types';

interface NavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  user: User | null;
  onlineCount: number;
  handleLogout: () => void;
}

export default function Navigation({ activeTab, setActiveTab, user, onlineCount, handleLogout }: NavigationProps) {
  return (
    <nav className="bg-card/90 backdrop-blur-md border-b-4 border-border p-4 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-4xl pixel-text text-primary flex items-center gap-2 drop-shadow-lg">
              <span className="animate-pulse">⛏️</span> MINECRAFT PORTAL
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm text-muted-foreground pixel-text">
                Онлайн: {onlineCount} чел.
              </span>
            </div>
          </div>
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-xs md:text-sm pixel-text text-primary drop-shadow-md">
                {user.isAdmin ? '👑' : '👤'} {user.username}
              </span>
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
            { id: 'community' as Tab, label: '👥 Сообщество' },
            ...(user && !user.isAdmin ? [{ id: 'friends' as Tab, label: '👫 Друзья' }] : []),
            ...(user?.isAdmin ? [{ id: 'admin' as Tab, label: '👑 Админ-панель' }] : [])
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
  );
}