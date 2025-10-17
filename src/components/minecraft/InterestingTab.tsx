import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function InterestingTab() {
  return (
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
  );
}
