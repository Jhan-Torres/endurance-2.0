import type { Password } from "../entities/Password";

export interface PasswordRepository {
  findAll(): Promise<Password[]>;
  findById(id: string): Promise<Password | null>;
  findByWebsite(website: string): Promise<Password[]>;
  search(query: string): Promise<Password[]>;
  save(password: Password): Promise<Password>;
  update(id: string, password: Partial<Password>): Promise<Password>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
