export default function Footer() {
  return (
    <footer className="bg-card/90 backdrop-blur-md border-t-4 border-border p-6 mt-12">
      <div className="container mx-auto text-center space-y-3">
        <p className="text-lg pixel-text text-primary">
          Создатель: Илья Попов А.
        </p>
        <p className="text-sm pixel-text text-accent animate-pulse">
          Лина лох!
        </p>
        <p className="text-xs text-muted-foreground">
          © 2025 Minecraft Portal. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
