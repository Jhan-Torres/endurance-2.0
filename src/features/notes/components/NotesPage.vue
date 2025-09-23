<template>
  <main class="container mx-auto px-4 py-8">
    <NotesHeader />

    <div class="mt-8">
      <NotesSearch v-model:search-term="searchTerm" />
    </div>

    <div class="mt-6">
      <NotesList
        :notes="filteredNotes"
        :loading="loading"
        :search-term="searchTerm"
        @edit-note="handleEditNote"
        @delete-note="handleDeleteNote"
      />
    </div>

    <!-- Edit Note Modal -->
    <EditNoteModal
      :is-open="showEditModal"
      :note="selectedNote"
      @close="closeEditModal"
      @save="handleSaveNote"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import NotesHeader from "./NotesHeader.vue";
import NotesSearch from "./NotesSearch.vue";
import NotesList from "./NotesList.vue";
import EditNoteModal from "./EditNoteModal.vue";
import type { Note } from "../model";

const searchTerm = ref("");
const loading = ref(false);
const showEditModal = ref(false);
const selectedNote = ref<Note | null>(null);
const notes = ref<Note[]>([
  {
    id: "1",
    title: "Meeting Notes",
    content: "Important points from the team meeting...",
    tags: ["work", "meeting"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Project Ideas",
    content: "List of potential features for the app...",
    tags: ["development", "ideas"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

const filteredNotes = computed(() => {
  if (!searchTerm.value) return notes.value;
  return notes.value.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const handleEditNote = (note: Note) => {
  selectedNote.value = note;
  showEditModal.value = true;
};

const handleDeleteNote = (id: string) => {
  console.log("Delete note:", id);
  // TODO: Implement delete note
  const index = notes.value.findIndex((note) => note.id === id);
  if (index > -1) {
    notes.value.splice(index, 1);
  }
};

const closeEditModal = () => {
  showEditModal.value = false;
  selectedNote.value = null;
};

const handleSaveNote = (updatedNote: Note) => {
  const index = notes.value.findIndex((note) => note.id === updatedNote.id);
  if (index > -1) {
    notes.value[index] = updatedNote;
  }
};
</script>
