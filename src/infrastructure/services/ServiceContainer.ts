import { PasswordUseCases, NoteUseCases } from "../../domain/usecases";
import {
  LocalStoragePasswordRepository,
  LocalStorageNoteRepository,
} from "../repositories";

class ServiceContainer {
  private static instance: ServiceContainer;

  private passwordRepository = new LocalStoragePasswordRepository();
  private noteRepository = new LocalStorageNoteRepository();

  private passwordUseCases = new PasswordUseCases(this.passwordRepository);
  private noteUseCases = new NoteUseCases(this.noteRepository);

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  getPasswordUseCases(): PasswordUseCases {
    return this.passwordUseCases;
  }

  getNoteUseCases(): NoteUseCases {
    return this.noteUseCases;
  }
}

export const serviceContainer = ServiceContainer.getInstance();
