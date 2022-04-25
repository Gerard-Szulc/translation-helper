<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import {ref, watch} from "vue";
import TranslationListElement from "./components/translation-list-element.vue";
import {useTranslationsStore} from "./composables/useTranslationsStore";
const { modalVisible } = useTranslationModal()
import TranslationModal from "./components/translation-modal.vue";
import {useTranslationModal} from "./composables/useTranslationModal";
const date = ref(new Date())
const fileInput = ref()
const fileHandles = ref()
const mainLanguage = ref('pl')
const { translationTree, languages, setTree } = useTranslationsStore()
const handleInputFile = async () => {
  const [fileHandle] = await window.showOpenFilePicker();

  if (fileHandle.kind === 'file') {
    console.log(fileHandle)
    // run file code
    const file = await fileHandle.getFile();
    const content = JSON.parse(await file.text());
    setTree(content, mainLanguage.value)
  }
}
const handleLoadLanguage = (language: string) => {
  mainLanguage.value = language
  handleInputFile()
}
const handleExport = async () => {
  await Promise.all(languages.value.map(async (lang) => {
    const file = new File([JSON.stringify(translationTree.value[lang])], `${lang}.json`, {type: 'application/json'})

    // create a new handle
    const newHandle = await window.showSaveFilePicker({suggestedName: `${lang}.json`});

    // create a FileSystemWritableFileStream to write to
    const writableStream = await newHandle.createWritable();

    // write our file
    await writableStream.write(file);

    // close the file and write the contents to disk.
    return await writableStream.close();
  }))
}

</script>

<template>
  <div>
    <button v-for="lang in languages" @click="handleLoadLanguage(lang)">{{ lang }}</button>
    <button @click="handleExport">Download</button>
<!--    <select name="language" id="language" v-model="mainLanguage">-->
<!--      <option v-for="lang in languages" :value="lang">{{ lang }}</option>-->
<!--    </select>-->
<!--    <button @click="handleInputFile">Load translation</button>-->

    <div v-if="translationTree[mainLanguage]">
      <translation-list-element :model-value='translationTree[mainLanguage]' :translationKey="''" :translationPath="''"/>

<!--      <ul>-->
<!--        <template v-for="(value, translationKey) in translationTree[mainLanguage]">-->
<!--          <translation-list-element :model-value='value' :translationKey="translationKey" :translationPath="translationKey"/>-->
<!--        </template>-->
<!--      </ul>-->
    </div>

  </div>
  <teleport to="body" v-if="modalVisible">
    <translation-modal
        v-if="modalVisible"
    ></translation-modal>
  </teleport>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
