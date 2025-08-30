export interface Note {
  id: string;
  title: string;
  content: string;
  category?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
}

export class NoteEntity implements Note {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public tags: string[] = [],
    public category?: string,
    public isPinned: boolean = false
  ) {}

  update(updates: Partial<Omit<Note, "id" | "createdAt">>): void {
    Object.assign(this, { ...updates, updatedAt: new Date() });
  }

  togglePin(): void {
    this.isPinned = !this.isPinned;
    this.updatedAt = new Date();
  }

  addTag(tag: string): void {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
      this.updatedAt = new Date();
    }
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter((t) => t !== tag);
    this.updatedAt = new Date();
  }
}
