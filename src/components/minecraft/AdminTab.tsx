import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { OnlineUser, Comment } from './types';

interface AdminTabProps {
  onlineCount: number;
  comments: Comment[];
  onlineUsers: OnlineUser[];
  bannedUsers: string[];
  mutedUsers: string[];
  handleKickUser: (userId: string) => void;
  handleBanUser: (username: string) => void;
  handleUnbanUser: (username: string) => void;
  handleMuteUser: (username: string) => void;
  handleUnmuteUser: (username: string) => void;
  handleDeleteComment: (commentId: number) => void;
}

export default function AdminTab({
  onlineCount,
  comments,
  onlineUsers,
  bannedUsers,
  mutedUsers,
  handleKickUser,
  handleBanUser,
  handleUnbanUser,
  handleMuteUser,
  handleUnmuteUser,
  handleDeleteComment
}: AdminTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="minecraft-card bg-gradient-to-br from-accent/20 to-card/80 backdrop-blur-sm border-4 border-accent">
        <h2 className="text-3xl font-bold mb-6 pixel-text text-accent flex items-center gap-3">
          <Icon name="Crown" className="w-10 h-10" /> АДМИН-ПАНЕЛЬ
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-primary/20 p-6 border-2 border-primary">
            <h3 className="font-bold text-2xl mb-2 text-primary flex items-center gap-2">
              <Icon name="Users" className="w-7 h-7" />
              {onlineCount}
            </h3>
            <p className="text-sm text-card-foreground">Пользователей онлайн</p>
          </div>
          <div className="bg-secondary/20 p-6 border-2 border-secondary">
            <h3 className="font-bold text-2xl mb-2 text-secondary flex items-center gap-2">
              <Icon name="MessageSquare" className="w-7 h-7" />
              {comments.length}
            </h3>
            <p className="text-sm text-card-foreground">Всего сообщений</p>
          </div>
        </div>

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
                    </div>
                  )}
                </div>
              )})}
            </div>
          </div>

          <div className="bg-muted/50 p-6 border-2 border-border">
            <h3 className="font-bold text-xl mb-4 text-primary flex items-center gap-2">
              <Icon name="MessageSquare" className="w-6 h-6" /> Управление сообщениями
            </h3>
            <div className="space-y-3">
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
        </div>
      </Card>
    </div>
  );
}
