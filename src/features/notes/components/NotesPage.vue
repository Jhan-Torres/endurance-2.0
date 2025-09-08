<template>
  <div class="container mx-auto px-4 py-8">
    <NotesHeader />
    <NotesSearch v-model:search-term="searchTerm" />
    <NotesList
      :notes="filteredNotes"
      :loading="loading"
      :search-term="searchTerm"
      @edit-note="handleEditNote"
      @delete-note="handleDeleteNote"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import NotesHeader from "./NotesHeader.vue";
import NotesSearch from "./NotesSearch.vue";
import NotesList from "./NotesList.vue";
import type { Note } from "../model";

const searchTerm = ref("");
const loading = ref(false);
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
  console.log("Edit note:", note);
  // TODO: Implement edit note
};

const handleDeleteNote = (id: string) => {
  console.log("Delete note:", id);
  // TODO: Implement delete note
};
</script>
