import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { User, PrivateMessage, FriendRequest } from './types';

interface FriendsTabProps {
  user: User;
  allUsers: User[];
  friendRequests: FriendRequest[];
  privateMessages: PrivateMessage[];
  onSendFriendRequest: (username: string) => void;
  onAcceptFriendRequest: (requestId: number) => void;
  onRejectFriendRequest: (requestId: number) => void;
  onSendMessage: (to: string, text: string) => void;
  onRemoveFriend: (username: string) => void;
}

export default function FriendsTab({
  user,
  allUsers,
  friendRequests,
  privateMessages,
  onSendFriendRequest,
  onAcceptFriendRequest,
  onRejectFriendRequest,
  onSendMessage,
  onRemoveFriend
}: FriendsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  const friends = user.friends || [];
  const incomingRequests = friendRequests.filter(r => r.to === user.username);
  const outgoingRequests = friendRequests.filter(r => r.from === user.username);

  const searchResults = allUsers.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
    u.username !== user.username &&
    !friends.includes(u.username) &&
    !outgoingRequests.some(r => r.to === u.username)
  );

  const friendMessages = selectedFriend 
    ? privateMessages.filter(m => 
        (m.from === user.username && m.to === selectedFriend) ||
        (m.from === selectedFriend && m.to === user.username)
      ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFriend && messageText.trim()) {
      onSendMessage(selectedFriend, messageText);
      setMessageText('');
    }
  };

  const unreadCount = (friendName: string) => {
    return privateMessages.filter(m => m.from === friendName && m.to === user.username && !m.read).length;
  };

  return (
    <div className="animate-fade-in">
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="minecraft-card bg-card/80 backdrop-blur-sm lg:col-span-1">
          <h2 className="text-2xl font-bold mb-6 pixel-text text-primary flex items-center gap-2">
            <Icon name="Users" className="w-7 h-7" /> Друзья
          </h2>

          {incomingRequests.length > 0 && (
            <div className="mb-6 p-4 bg-accent/20 border-2 border-accent">
              <h3 className="font-bold mb-3 text-accent flex items-center gap-2">
                <Icon name="UserPlus" className="w-5 h-5" />
                Заявки ({incomingRequests.length})
              </h3>
              <div className="space-y-2">
                {incomingRequests.map(req => (
                  <div key={req.id} className="bg-card p-3 border-2 border-border flex items-center justify-between">
                    <span className="text-sm font-bold">{req.from}</span>
                    <div className="flex gap-1">
                      <Button
                        onClick={() => onAcceptFriendRequest(req.id)}
                        className="minecraft-btn !py-1 !px-2 text-xs bg-primary"
                      >
                        <Icon name="Check" className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => onRejectFriendRequest(req.id)}
                        className="minecraft-btn !py-1 !px-2 text-xs bg-destructive"
                      >
                        <Icon name="X" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <Input
              type="text"
              placeholder="Поиск по никнейму..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-input/80 border-2 border-border mb-3"
            />
            {searchQuery && searchResults.length > 0 && (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {searchResults.slice(0, 5).map(foundUser => (
                  <div key={foundUser.username} className="bg-muted p-3 border-2 border-border flex items-center justify-between">
                    <span className="text-sm font-bold">{foundUser.username}</span>
                    <Button
                      onClick={() => {
                        onSendFriendRequest(foundUser.username);
                        setSearchQuery('');
                      }}
                      className="minecraft-btn !py-1 !px-3 text-xs bg-primary"
                    >
                      <Icon name="UserPlus" className="w-4 h-4 mr-1" />
                      Добавить
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm text-muted-foreground mb-2">
              МОИ ДРУЗЬЯ ({friends.length})
            </h3>
            {friends.length === 0 ? (
              <p className="text-sm text-muted-foreground">У вас пока нет друзей</p>
            ) : (
              friends.map(friendName => {
                const unread = unreadCount(friendName);
                return (
                  <div
                    key={friendName}
                    onClick={() => setSelectedFriend(friendName)}
                    className={`p-3 border-2 cursor-pointer transition-all ${
                      selectedFriend === friendName
                        ? 'bg-primary/20 border-primary'
                        : 'bg-muted/50 border-border hover:border-primary'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="User" className="w-4 h-4" />
                        <span className="font-bold text-sm">{friendName}</span>
                        {unread > 0 && (
                          <span className="bg-destructive text-white text-xs px-2 py-0.5 rounded-full">
                            {unread}
                          </span>
                        )}
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFriend(friendName);
                          if (selectedFriend === friendName) setSelectedFriend(null);
                        }}
                        className="minecraft-btn !py-0.5 !px-2 text-xs bg-destructive"
                      >
                        <Icon name="Trash2" className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        <Card className="minecraft-card bg-card/80 backdrop-blur-sm lg:col-span-2">
          {selectedFriend ? (
            <>
              <h2 className="text-2xl font-bold mb-6 pixel-text text-primary flex items-center gap-2">
                <Icon name="MessageCircle" className="w-7 h-7" />
                Чат с {selectedFriend}
              </h2>

              <div className="mb-4 h-96 overflow-y-auto bg-muted/30 p-4 border-2 border-border space-y-3">
                {friendMessages.length === 0 ? (
                  <p className="text-center text-muted-foreground">Нет сообщений</p>
                ) : (
                  friendMessages.map(msg => (
                    <div
                      key={msg.id}
                      className={`p-3 border-2 max-w-[80%] ${
                        msg.from === user.username
                          ? 'ml-auto bg-primary/20 border-primary'
                          : 'mr-auto bg-secondary/20 border-secondary'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-xs">{msg.from}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleSendMessage} className="space-y-3">
                <Textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Написать сообщение..."
                  className="bg-input/80 border-2 border-border focus:border-primary"
                  rows={3}
                  required
                />
                <Button type="submit" className="minecraft-btn bg-primary hover:bg-primary/90">
                  <Icon name="Send" className="mr-2 h-5 w-5" />
                  Отправить
                </Button>
              </form>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Icon name="MessageCircleOff" className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground pixel-text">
                  Выберите друга для чата
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
