import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function SupportTab() {
  return (
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
  );
}
