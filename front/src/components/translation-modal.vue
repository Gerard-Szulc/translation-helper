<template >
  <div class="modal" @keydown.esc="handleCloseModal" @blur="handleCloseModal">
    <h3>{{title}}</h3>
    <template v-for="language in languages" :key="`input-${language}.${path}`">
      <p>{{ language }}</p>
      <textarea
             :value="getValueByPath(`${language}${SEPARATOR}${path}`, translationTree)"
             @input="(e) => handleChangeTranslation(e, language)"/>
    </template>
    <button class="btn btn-primary" style="position: absolute; bottom: 0; right: 0;" @click="handleCloseModal">Close</button>
  </div>
</template>

<script setup lang="ts">
import {SEPARATOR, useTranslationsStore} from "../composables/useTranslationsStore";
import {useTranslationModal} from "../composables/useTranslationModal";
const { getValueByPath, translationTree, languages } = useTranslationsStore()
const { path, handleChangeTranslation, hideModal, title } = useTranslationModal()



const handleCloseModal = (e) => {
  console.log(e)
  hideModal()
}
</script>

<style scoped>
  .modal {
    padding: 20px;
    position: fixed;
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