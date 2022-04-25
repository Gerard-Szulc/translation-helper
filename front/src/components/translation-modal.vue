<template >
  <div class="modal" @keydown.esc="handleCloseModal" @blur="handleCloseModal">
    <template v-for="language in languages" :key="`input-${language}.${path}`">
      <span>{{ language }}</span>
      <input type="text"
             :value="getValueByPath(`${language}${SEPARATOR}${path}`, translationTree)"
             @input="(e) => handleChangeTranslation(e, language)">
    </template>

  </div>
  <button class="btn btn-primary" @click="handleCloseModal">Close</button>
</template>

<script setup lang="ts">
import {SEPARATOR, useTranslationsStore} from "../composables/useTranslationsStore";
import {useTranslationModal} from "../composables/useTranslationModal";
const emit = defineEmits(['update:close'])
const { getValueByPath, translationTree, languages } = useTranslationsStore()
const { path, handleChangeTranslation } = useTranslationModal()



const handleCloseModal = () => {
  emit('update:close')
}
</script>

<style scoped>
  .modal {
    position: absolute;
    height: 50%;
    width: 50%;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
    top: 25%;
    left: 25%;
    z-index: 100;
  }
</style>