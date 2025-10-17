import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface AuthTabProps {
  authForm: {
    username: string;
    email: string;
    password: string;
  };
  setAuthForm: (form: { username: string; email: string; password: string }) => void;
  setIsLogin: (isLogin: boolean) => void;
  handleAuth: (e: React.FormEvent) => void;
}

export default function AuthTab({ authForm, setAuthForm, setIsLogin, handleAuth }: AuthTabProps) {
  return (
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
            <div>
              <label className="block mb-2 text-sm font-bold text-card-foreground">Пароль</label>
              <Input
                type="password"
                value={authForm.password}
                onChange={(e) => {
                  setAuthForm({ ...authForm, password: e.target.value });
                  setIsLogin(true);
                }}
                placeholder="••••••••"
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
  );
}
