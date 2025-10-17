import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Comment } from './types';

interface CommunityTabProps {
  comments: Comment[];
  newComment: string;
  setNewComment: (comment: string) => void;
  handleAddComment: (e: React.FormEvent) => void;
}

export default function CommunityTab({ comments, newComment, setNewComment, handleAddComment }: CommunityTabProps) {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="minecraft-card bg-card/80 backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-6 pixel-text text-primary flex items-center gap-3">
          <Icon name="Users" className="w-8 h-8" /> СООБЩЕСТВО
        </h2>

        <div className="mb-8 p-6 bg-muted/50 border-2 border-border">
          <h3 className="font-bold text-xl mb-4 text-accent flex items-center gap-2">
            <Icon name="MessageSquarePlus" className="w-6 h-6" /> Добавить сообщение
          </h3>
          <form onSubmit={handleAddComment} className="space-y-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Написать сообщение..."
              className="bg-input/80 border-2 border-border min-h-[100px] focus:border-primary transition-colors"
              required
            />
            <Button type="submit" className="minecraft-btn bg-primary hover:bg-primary/90">
              <Icon name="Send" className="mr-2 h-5 w-5" />
              Отправить
            </Button>
          </form>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-xl mb-4 text-accent flex items-center gap-2">
            <Icon name="MessagesSquare" className="w-6 h-6" /> Последние сообщения
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-muted/50 p-5 border-2 border-border animate-slide-in hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-primary flex items-center gap-2">
                  <Icon name="User" className="w-5 h-5" />
                  {comment.username}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Icon name="Clock" className="w-4 h-4" />
                  {comment.timestamp}
                </span>
              </div>
              <p className="text-card-foreground pl-7">{comment.text}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
