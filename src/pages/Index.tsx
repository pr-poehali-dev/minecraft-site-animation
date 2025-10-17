import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/minecraft/Navigation';
import HomeTab from '@/components/minecraft/HomeTab';
import InterestingTab from '@/components/minecraft/InterestingTab';
import AuthTab from '@/components/minecraft/AuthTab';
import SupportTab from '@/components/minecraft/SupportTab';
import CommunityTab from '@/components/minecraft/CommunityTab';
import AdminTab from '@/components/minecraft/AdminTab';
import FriendsTab from '@/components/minecraft/FriendsTab';
import Footer from '@/components/minecraft/Footer';
import { Tab, User, Comment, OnlineUser, PrivateMessage, FriendRequest, SiteSettings, ADMIN_USERNAME, ADMIN_PASSWORD } from '@/components/minecraft/types';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const { toast } = useToast();
  const [onlineCount, setOnlineCount] = useState(1);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [bannedUsers, setBannedUsers] = useState<string[]>([]);
  const [mutedUsers, setMutedUsers] = useState<string[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [privateMessages, setPrivateMessages] = useState<PrivateMessage[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: 'MINECRAFT PORTAL',
    welcomeMessage: 'ДОБРО ПОЖАЛОВАТЬ!',
    maintenanceMode: false,
    allowRegistration: true
  });

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
    const banned = JSON.parse(localStorage.getItem('bannedUsers') || '[]');
    const muted = JSON.parse(localStorage.getItem('mutedUsers') || '[]');
    const users = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const messages = JSON.parse(localStorage.getItem('privateMessages') || '[]');
    const requests = JSON.parse(localStorage.getItem('friendRequests') || '[]');
    const settings = JSON.parse(localStorage.getItem('siteSettings') || 'null');
    
    setBannedUsers(banned);
    setMutedUsers(muted);
    setAllUsers(users);
    setPrivateMessages(messages);
    setFriendRequests(requests);
    if (settings) setSiteSettings(settings);

    if (savedUser) {
      const userData = JSON.parse(savedUser);
      if (banned.includes(userData.username) && !userData.isAdmin) {
        toast({ title: '🚫 Вы забанены!', description: 'Доступ к сайту запрещён', variant: 'destructive' });
        localStorage.removeItem('minecraftUser');
        return;
      }
      setUser(userData);
      setIsRegistered(true);
    }

    const sessionId = localStorage.getItem('sessionId') || Math.random().toString(36);
    localStorage.setItem('sessionId', sessionId);

    const updateOnlineStatus = () => {
      const users = JSON.parse(localStorage.getItem('onlineUsers') || '[]');
      const now = Date.now();
      
      const activeUsers = users.filter((u: OnlineUser) => now - u.lastSeen < 60000);
      
      const currentUserIndex = activeUsers.findIndex((u: OnlineUser) => u.id === sessionId);
      if (currentUserIndex >= 0) {
        activeUsers[currentUserIndex].lastSeen = now;
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          activeUsers[currentUserIndex].username = userData.username;
          activeUsers[currentUserIndex].isAdmin = userData.isAdmin || false;
        }
      } else {
        activeUsers.push({
          id: sessionId,
          username: savedUser ? JSON.parse(savedUser).username : 'Гость',
          lastSeen: now,
          isAdmin: savedUser ? JSON.parse(savedUser).isAdmin || false : false
        });
      }
      
      localStorage.setItem('onlineUsers', JSON.stringify(activeUsers));
      setOnlineUsers(activeUsers);
      setOnlineCount(activeUsers.length);
    };

    updateOnlineStatus();
    const interval = setInterval(updateOnlineStatus, 5000);

    return () => clearInterval(interval);
  }, [user]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!siteSettings.allowRegistration && !isLogin) {
      toast({ title: '❌ Регистрация закрыта', description: 'Администратор закрыл регистрацию', variant: 'destructive' });
      return;
    }

    if (siteSettings.maintenanceMode) {
      toast({ title: '⚠️ Технические работы', description: 'Сайт на обслуживании', variant: 'destructive' });
      return;
    }
    
    if (authForm.username === ADMIN_USERNAME && authForm.password === ADMIN_PASSWORD) {
      const adminUser = { username: ADMIN_USERNAME, email: 'admin@minecraft.com', isAdmin: true, friends: [] };
      localStorage.setItem('minecraftUser', JSON.stringify(adminUser));
      setUser(adminUser);
      setIsRegistered(true);
      setActiveTab('admin');
      toast({ title: '🔐 Админ вход выполнен!', description: 'Добро пожаловать в панель управления' });
      return;
    }
    
    if (isLogin) {
      const foundUser = allUsers.find(u => u.username === authForm.username);
      if (foundUser) {
        setUser(foundUser);
        setIsRegistered(true);
        localStorage.setItem('minecraftUser', JSON.stringify(foundUser));
        toast({ title: '✅ Вход выполнен!', description: `Добро пожаловать обратно, ${authForm.username}!` });
        setTimeout(() => {
          window.open('https://tlauncher.org', '_blank');
        }, 1500);
      } else {
        toast({ title: '❌ Ошибка', description: 'Пользователь не найден', variant: 'destructive' });
      }
    } else {
      if (authForm.username && authForm.email && authForm.password) {
        const newUser = { username: authForm.username, email: authForm.email, friends: [] };
        const updatedUsers = [...allUsers, newUser];
        setAllUsers(updatedUsers);
        localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
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
    if (mutedUsers.includes(user.username)) {
      toast({ title: '🔇 Вы в муте!', description: 'Вы не можете отправлять сообщения', variant: 'destructive' });
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
    setActiveTab('home');
    toast({ title: '👋 Выход выполнен' });
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(c => c.id !== commentId));
    toast({ title: '🗑️ Комментарий удалён' });
  };

  const handleKickUser = (userId: string) => {
    const users = JSON.parse(localStorage.getItem('onlineUsers') || '[]');
    const updatedUsers = users.filter((u: OnlineUser) => u.id !== userId);
    localStorage.setItem('onlineUsers', JSON.stringify(updatedUsers));
    setOnlineUsers(updatedUsers);
    toast({ title: '⚠️ Пользователь отключен' });
  };

  const handleBanUser = (username: string) => {
    const banned = [...bannedUsers, username];
    setBannedUsers(banned);
    localStorage.setItem('bannedUsers', JSON.stringify(banned));
    toast({ title: '🚫 Пользователь забанен!', description: username });
  };

  const handleUnbanUser = (username: string) => {
    const banned = bannedUsers.filter(u => u !== username);
    setBannedUsers(banned);
    localStorage.setItem('bannedUsers', JSON.stringify(banned));
    toast({ title: '✅ Бан снят!', description: username });
  };

  const handleMuteUser = (username: string) => {
    const muted = [...mutedUsers, username];
    setMutedUsers(muted);
    localStorage.setItem('mutedUsers', JSON.stringify(muted));
    toast({ title: '🔇 Пользователь замучен!', description: username });
  };

  const handleUnmuteUser = (username: string) => {
    const muted = mutedUsers.filter(u => u !== username);
    setMutedUsers(muted);
    localStorage.setItem('mutedUsers', JSON.stringify(muted));
    toast({ title: '🔊 Мут снят!', description: username });
  };

  const handleDeleteUser = (username: string) => {
    const updated = allUsers.filter(u => u.username !== username);
    setAllUsers(updated);
    localStorage.setItem('allUsers', JSON.stringify(updated));
    toast({ title: '🗑️ Пользователь удалён!', description: username });
  };

  const handleSendFriendRequest = (toUsername: string) => {
    if (!user) return;
    const newRequest: FriendRequest = {
      id: friendRequests.length + 1,
      from: user.username,
      to: toUsername,
      timestamp: new Date().toLocaleString()
    };
    const updated = [...friendRequests, newRequest];
    setFriendRequests(updated);
    localStorage.setItem('friendRequests', JSON.stringify(updated));
    toast({ title: '📤 Заявка отправлена!', description: toUsername });
  };

  const handleAcceptFriendRequest = (requestId: number) => {
    if (!user) return;
    const request = friendRequests.find(r => r.id === requestId);
    if (!request) return;

    const updatedUser = { ...user, friends: [...(user.friends || []), request.from] };
    const senderUser = allUsers.find(u => u.username === request.from);
    if (senderUser) {
      senderUser.friends = [...(senderUser.friends || []), user.username];
      const updatedUsers = allUsers.map(u => u.username === senderUser.username ? senderUser : u);
      updatedUsers.forEach(u => {
        if (u.username === user.username) Object.assign(u, updatedUser);
      });
      setAllUsers(updatedUsers);
      localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
    }

    setUser(updatedUser);
    localStorage.setItem('minecraftUser', JSON.stringify(updatedUser));
    
    const updated = friendRequests.filter(r => r.id !== requestId);
    setFriendRequests(updated);
    localStorage.setItem('friendRequests', JSON.stringify(updated));
    toast({ title: '✅ Друг добавлен!', description: request.from });
  };

  const handleRejectFriendRequest = (requestId: number) => {
    const updated = friendRequests.filter(r => r.id !== requestId);
    setFriendRequests(updated);
    localStorage.setItem('friendRequests', JSON.stringify(updated));
    toast({ title: '❌ Заявка отклонена' });
  };

  const handleSendMessage = (to: string, text: string) => {
    if (!user) return;
    const newMessage: PrivateMessage = {
      id: privateMessages.length + 1,
      from: user.username,
      to,
      text,
      timestamp: new Date().toLocaleString(),
      read: false
    };
    const updated = [...privateMessages, newMessage];
    setPrivateMessages(updated);
    localStorage.setItem('privateMessages', JSON.stringify(updated));
    toast({ title: '✅ Сообщение отправлено!' });
  };

  const handleRemoveFriend = (friendName: string) => {
    if (!user) return;
    const updatedUser = { ...user, friends: (user.friends || []).filter(f => f !== friendName) };
    setUser(updatedUser);
    localStorage.setItem('minecraftUser', JSON.stringify(updatedUser));
    
    const updatedUsers = allUsers.map(u => 
      u.username === user.username 
        ? updatedUser 
        : u.username === friendName 
          ? { ...u, friends: (u.friends || []).filter(f => f !== user.username) }
          : u
    );
    setAllUsers(updatedUsers);
    localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
    toast({ title: '🗑️ Друг удалён', description: friendName });
  };

  const handleUpdateSettings = (settings: SiteSettings) => {
    setSiteSettings(settings);
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    toast({ title: '✅ Настройки сохранены!' });
  };

  const handleAddNews = (title: string, text: string) => {
    toast({ title: '✅ Новость добавлена!', description: 'Новость опубликована на главной' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      <div className="min-h-screen bg-black/20 backdrop-blur-[1px]">
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          onlineCount={onlineCount}
          handleLogout={handleLogout}
        />

        <main className="container mx-auto p-4 md:p-8">
          {activeTab === 'home' && (
            <HomeTab
              isRegistered={isRegistered}
              user={user}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'interesting' && <InterestingTab />}

          {activeTab === 'auth' && (
            <AuthTab
              authForm={authForm}
              setAuthForm={setAuthForm}
              setIsLogin={setIsLogin}
              handleAuth={handleAuth}
            />
          )}

          {activeTab === 'support' && <SupportTab />}

          {activeTab === 'community' && (
            <CommunityTab
              comments={comments}
              newComment={newComment}
              setNewComment={setNewComment}
              handleAddComment={handleAddComment}
            />
          )}

          {activeTab === 'friends' && user && !user.isAdmin && (
            <FriendsTab
              user={user}
              allUsers={allUsers}
              friendRequests={friendRequests}
              privateMessages={privateMessages}
              onSendFriendRequest={handleSendFriendRequest}
              onAcceptFriendRequest={handleAcceptFriendRequest}
              onRejectFriendRequest={handleRejectFriendRequest}
              onSendMessage={handleSendMessage}
              onRemoveFriend={handleRemoveFriend}
            />
          )}

          {activeTab === 'admin' && user?.isAdmin && (
            <AdminTab
              onlineCount={onlineCount}
              comments={comments}
              onlineUsers={onlineUsers}
              bannedUsers={bannedUsers}
              mutedUsers={mutedUsers}
              allUsers={allUsers}
              siteSettings={siteSettings}
              handleKickUser={handleKickUser}
              handleBanUser={handleBanUser}
              handleUnbanUser={handleUnbanUser}
              handleMuteUser={handleMuteUser}
              handleUnmuteUser={handleUnmuteUser}
              handleDeleteComment={handleDeleteComment}
              handleDeleteUser={handleDeleteUser}
              handleUpdateSettings={handleUpdateSettings}
              handleAddNews={handleAddNews}
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
