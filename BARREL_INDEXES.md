# Barrel Index Implementation

This document describes the barrel index pattern implemented in the Endurance project to improve import organization and maintainability.

## What are Barrel Indexes?

Barrel indexes are TypeScript files (usually named `index.ts`) that re-export multiple modules from a directory, allowing for cleaner and more organized imports.

## Implemented Structure

### Domain Layer Barrels

#### `/src/domain/entities/index.ts`

```typescript
export * from "./Password";
export * from "./Note";
```

#### `/src/domain/repositories/index.ts`

```typescript
export * from "./PasswordRepository";
export * from "./NoteRepository";
```

#### `/src/domain/usecases/index.ts`

```typescript
export * from "./PasswordUseCases";
export * from "./NoteUseCases";
```

#### `/src/domain/index.ts`

```typescript
export * from "./entities";
export * from "./repositories";
export * from "./usecases";
```

### Infrastructure Layer Barrels

#### `/src/infrastructure/repositories/index.ts`

```typescript
export * from "./LocalStoragePasswordRepository";
export * from "./LocalStorageNoteRepository";
```

#### `/src/infrastructure/services/index.ts`

```typescript
export * from "./ServiceContainer";
```

#### `/src/infrastructure/index.ts`

```typescript
export * from "./repositories";
export * from "./services";
```

### Presentation Layer Barrels

#### `/src/presentation/composables/index.ts`

```typescript
export * from "./useDarkMode";
export * from "./usePasswords";
export * from "./useNotes";
```

#### `/src/presentation/index.ts`

```typescript
export * from "./composables";
```

### Root Barrel

#### `/src/index.ts`

```typescript
// Domain layer exports
export * from "./domain";

// Infrastructure layer exports
export * from "./infrastructure";

// Presentation layer exports
export * from "./presentation";

// Router exports
export { default as router } from "./router";
```

## Benefits

### Before Barrel Indexes

```typescript
// Multiple specific imports
import { PasswordUseCases } from "../../domain/usecases/PasswordUseCases";
import { NoteUseCases } from "../../domain/usecases/NoteUseCases";
import { LocalStoragePasswordRepository } from "../repositories/LocalStoragePasswordRepository";
import { LocalStorageNoteRepository } from "../repositories/LocalStorageNoteRepository";
```

### After Barrel Indexes

```typescript
// Clean, organized imports
import { PasswordUseCases, NoteUseCases } from "../../domain/usecases";
import {
  LocalStoragePasswordRepository,
  LocalStorageNoteRepository,
} from "../repositories";
```

## Import Examples

### Using Domain Entities

```typescript
import type { Password, PasswordStrength, Note } from "../../domain/entities";
```

### Using Use Cases

```typescript
import { PasswordUseCases, NoteUseCases } from "../../domain/usecases";
```

### Using Infrastructure Services

```typescript
import { serviceContainer } from "../../infrastructure/services";
```

### Using Presentation Composables

```typescript
import {
  usePasswords,
  useNotes,
  useDarkMode,
} from "./presentation/composables";
```

## Updated Files

The following files have been updated to use barrel imports:

1. **ServiceContainer.ts** - Uses barrel imports for use cases and repositories
2. **usePasswords.ts** - Uses barrel imports for entities and services
3. **useNotes.ts** - Uses barrel imports for entities and services
4. **PasswordUseCases.ts** - Uses barrel imports for entities and repositories
5. **NoteUseCases.ts** - Uses barrel imports for entities and repositories
6. **LocalStoragePasswordRepository.ts** - Uses barrel imports for entities and repositories
7. **LocalStorageNoteRepository.ts** - Uses barrel imports for entities and repositories
8. **App.vue** - Uses barrel imports for composables

## Vue Files Exclusion

As requested, Vue.js component files (.vue) are not included in barrel indexes since:

1. Vue components are typically imported individually for optimal tree-shaking
2. Component imports are usually explicit for better developer experience
3. Vue's SFC (Single File Component) architecture works best with direct imports

## Best Practices

1. **Keep barrels simple** - Only re-export, don't add logic
2. **Avoid circular dependencies** - Ensure clean dependency flow
3. **Update barrels when adding new modules** - Keep exports current
4. **Use TypeScript** - Leverage type checking for barrel exports
5. **Test imports** - Verify all barrel exports work correctly

## Development Benefits

- **Cleaner imports**: Shorter, more readable import statements
- **Better organization**: Logical grouping of related modules
- **Easier refactoring**: Change internal structure without updating imports
- **Reduced cognitive load**: Less path resolution for developers
- **Better IDE support**: Improved autocomplete and navigation
