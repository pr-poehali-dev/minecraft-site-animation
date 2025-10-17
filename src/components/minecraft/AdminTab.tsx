import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { OnlineUser, Comment, SiteSettings, User } from './types';

interface AdminTabProps {
  onlineCount: number;
  comments: Comment[];
  onlineUsers: OnlineUser[];
  bannedUsers: string[];
  mutedUsers: string[];
  allUsers: User[];
  siteSettings: SiteSettings;
  handleKickUser: (userId: string) => void;
  handleBanUser: (username: string) => void;
  handleUnbanUser: (username: string) => void;
  handleMuteUser: (username: string) => void;
  handleUnmuteUser: (username: string) => void;
  handleDeleteComment: (commentId: number) => void;
  handleDeleteUser: (username: string) => void;
  handleUpdateSettings: (settings: SiteSettings) => void;
  handleAddNews: (title: string, text: string) => void;
}

export default function AdminTab({
  onlineCount,
  comments,
  onlineUsers,
  bannedUsers,
  mutedUsers,
  allUsers,
  siteSettings,
  handleKickUser,
  handleBanUser,
  handleUnbanUser,
  handleMuteUser,
  handleUnmuteUser,
  handleDeleteComment,
  handleDeleteUser,
  handleUpdateSettings,
  handleAddNews
}: AdminTabProps) {
  const [activeAdminTab, setActiveAdminTab] = useState<'users' | 'messages' | 'settings' | 'news'>('users');
  const [settings, setSettings] = useState(siteSettings);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsText, setNewsText] = useState('');

  const handleSaveSettings = () => {
    handleUpdateSettings(settings);
  };

  const handleSubmitNews = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddNews(newsTitle, newsText);
    setNewsTitle('');
    setNewsText('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="minecraft-card bg-gradient-to-br from-accent/20 to-card/80 backdrop-blur-sm border-4 border-accent">
        <h2 className="text-3xl font-bold mb-6 pixel-text text-accent flex items-center gap-3">
          <Icon name="Crown" className="w-10 h-10" /> АДМИН-ПАНЕЛЬ
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-primary/20 p-4 border-2 border-primary">
            <h3 className="font-bold text-xl mb-1 text-primary flex items-center gap-2">
              <Icon name="Users" className="w-6 h-6" />
              {onlineCount}
            </h3>
            <p className="text-xs text-card-foreground">Онлайн</p>
          </div>
          <div className="bg-secondary/20 p-4 border-2 border-secondary">
            <h3 className="font-bold text-xl mb-1 text-secondary flex items-center gap-2">
              <Icon name="MessageSquare" className="w-6 h-6" />
              {comments.length}
            </h3>
            <p className="text-xs text-card-foreground">Сообщений</p>
          </div>
          <div className="bg-accent/20 p-4 border-2 border-accent">
            <h3 className="font-bold text-xl mb-1 text-accent flex items-center gap-2">
              <Icon name="UserCog" className="w-6 h-6" />
              {allUsers.length}
            </h3>
            <p className="text-xs text-card-foreground">Пользователей</p>
          </div>
          <div className="bg-destructive/20 p-4 border-2 border-destructive">
            <h3 className="font-bold text-xl mb-1 text-destructive flex items-center gap-2">
              <Icon name="Ban" className="w-6 h-6" />
              {bannedUsers.length}
            </h3>
            <p className="text-xs text-card-foreground">Забанено</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          <Button
            onClick={() => setActiveAdminTab('users')}
            className={`minecraft-btn text-sm ${activeAdminTab === 'users' ? 'bg-primary' : 'bg-secondary'}`}
          >
            <Icon name="Users" className="w-4 h-4 mr-1" />
            Пользователи
          </Button>
          <Button
            onClick={() => setActiveAdminTab('messages')}
            className={`minecraft-btn text-sm ${activeAdminTab === 'messages' ? 'bg-primary' : 'bg-secondary'}`}
          >
            <Icon name="MessageSquare" className="w-4 h-4 mr-1" />
            Сообщения
          </Button>
          <Button
            onClick={() => setActiveAdminTab('settings')}
            className={`minecraft-btn text-sm ${activeAdminTab === 'settings' ? 'bg-primary' : 'bg-secondary'}`}
          >
            <Icon name="Settings" className="w-4 h-4 mr-1" />
            Настройки
          </Button>
          <Button
            onClick={() => setActiveAdminTab('news')}
            className={`minecraft-btn text-sm ${activeAdminTab === 'news' ? 'bg-primary' : 'bg-secondary'}`}
          >
            <Icon name="Newspaper" className="w-4 h-4 mr-1" />
            Новости
          </Button>
        </div>

        {activeAdminTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-muted/50 p-6 border-2 border-border">
              <h3 className="font-bold text-xl mb-4 text-primary flex items-center gap-2">
                <Icon name="Users" className="w-6 h-6" /> Пользователи онлайн
              </h3>
              <div className="space-y-3">
                {onlineUsers.map((onlineUser) => {
                  const isBanned = bannedUsers.includes(onlineUser.username);
                  const isMuted = mutedUsers.includes(onlineUser.username);
                  return (
                  <div key={onlineUser.id} className="bg-card/50 p-4 border-2 border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-bold text-card-foreground">
                          {onlineUser.isAdmin && '👑 '}
                          {isBanned && '🚫 '}
                          {isMuted && '🔇 '}
                          {onlineUser.username}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ID: {onlineUser.id.slice(0, 8)}
                        </span>
                      </div>
                    </div>
                    {!onlineUser.isAdmin && (
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          onClick={() => handleKickUser(onlineUser.id)}
                          className="minecraft-btn !py-1 !px-3 text-xs bg-destructive"
                        >
                          <Icon name="UserX" className="w-4 h-4 mr-1" />
                          Кик
                        </Button>
                        {!isBanned ? (
                          <Button
                            onClick={() => handleBanUser(onlineUser.username)}
                            className="minecraft-btn !py-1 !px-3 text-xs bg-destructive"
                          >
                            <Icon name="Ban" className="w-4 h-4 mr-1" />
                            Бан
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleUnbanUser(onlineUser.username)}
                            className="minecraft-btn !py-1 !px-3 text-xs bg-primary"
                          >
                            <Icon name="Check" className="w-4 h-4 mr-1" />
                            Разбан
                          </Button>
                        )}
                        {!isMuted ? (
                          <Button
                            onClick={() => handleMuteUser(onlineUser.username)}
                            className="minecraft-btn !py-1 !px-3 text-xs bg-secondary"
                          >
                            <Icon name="VolumeX" className="w-4 h-4 mr-1" />
                            Мут
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleUnmuteUser(onlineUser.username)}
                            className="minecraft-btn !py-1 !px-3 text-xs bg-primary"
                          >
                            <Icon name="Volume2" className="w-4 h-4 mr-1" />
                            Размут
                          </Button>
                        )}
                        <Button
                          onClick={() => handleDeleteUser(onlineUser.username)}
                          className="minecraft-btn !py-1 !px-3 text-xs bg-destructive"
                        >
                          <Icon name="Trash2" className="w-4 h-4 mr-1" />
                          Удалить
                        </Button>
                      </div>
                    )}
                  </div>
                )})}
              </div>
            </div>

            <div className="bg-muted/50 p-6 border-2 border-border">
              <h3 className="font-bold text-xl mb-4 text-primary flex items-center gap-2">
                <Icon name="Users" className="w-6 h-6" /> Все пользователи ({allUsers.length})
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {allUsers.map(user => (
                  <div key={user.username} className="bg-card/50 p-3 border-2 border-border flex items-center justify-between">
                    <div>
                      <span className="font-bold">{user.isAdmin ? '👑 ' : ''}{user.username}</span>
                      <span className="text-xs text-muted-foreground ml-3">{user.email}</span>
                      {bannedUsers.includes(user.username) && <span className="text-xs text-destructive ml-2">🚫 Забанен</span>}
                      {mutedUsers.includes(user.username) && <span className="text-xs text-secondary ml-2">🔇 Замучен</span>}
                    </div>
                    {!user.isAdmin && (
                      <Button
                        onClick={() => handleDeleteUser(user.username)}
                        className="minecraft-btn !py-1 !px-3 text-xs bg-destructive"
                      >
                        <Icon name="Trash2" className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeAdminTab === 'messages' && (
          <div className="bg-muted/50 p-6 border-2 border-border">
            <h3 className="font-bold text-xl mb-4 text-primary flex items-center gap-2">
              <Icon name="MessageSquare" className="w-6 h-6" /> Управление сообщениями
            </h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-card/50 p-4 border-2 border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-bold text-primary">{comment.username}</span>
                      <span className="text-xs text-muted-foreground ml-3">{comment.timestamp}</span>
                    </div>
                    <Button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="minecraft-btn !py-1 !px-3 text-xs bg-destructive"
                    >
                      <Icon name="Trash2" className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-card-foreground">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeAdminTab === 'settings' && (
          <div className="bg-muted/50 p-6 border-2 border-border">
            <h3 className="font-bold text-xl mb-4 text-primary flex items-center gap-2">
              <Icon name="Settings" className="w-6 h-6" /> Настройки сайта
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-bold">Название сайта</label>
                <Input
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="bg-input border-2 border-border"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">Приветственное сообщение</label>
                <Textarea
                  value={settings.welcomeMessage}
                  onChange={(e) => setSettings({ ...settings, welcomeMessage: e.target.value })}
                  className="bg-input border-2 border-border"
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span className="font-bold">Режим обслуживания</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowRegistration}
                    onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span className="font-bold">Разрешить регистрацию</span>
                </label>
              </div>
              <Button onClick={handleSaveSettings} className="minecraft-btn bg-primary">
                <Icon name="Save" className="w-4 h-4 mr-2" />
                Сохранить настройки
              </Button>
            </div>
          </div>
        )}

        {activeAdminTab === 'news' && (
          <div className="bg-muted/50 p-6 border-2 border-border">
            <h3 className="font-bold text-xl mb-4 text-primary flex items-center gap-2">
              <Icon name="Newspaper" className="w-6 h-6" /> Добавить новость
            </h3>
            <form onSubmit={handleSubmitNews} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-bold">Заголовок новости</label>
                <Input
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  placeholder="Новое обновление!"
                  className="bg-input border-2 border-border"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">Текст новости</label>
                <Textarea
                  value={newsText}
                  onChange={(e) => setNewsText(e.target.value)}
                  placeholder="Описание новости..."
                  className="bg-input border-2 border-border"
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="minecraft-btn bg-primary">
                <Icon name="Plus" className="w-4 h-4 mr-2" />
                Добавить новость
              </Button>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
}
