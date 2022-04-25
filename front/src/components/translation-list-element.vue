<template>
  <li class="edit" v-if="typeof modelValue === 'string'" @click="handleShowModal">
    <span>{{ translationKey }}</span>
    <span
        v-for="language in languages"
        :key="`${language}#separator#${translationKey}`"
    >{{
        getValueByPath(`${language}${SEPARATOR}${translationPath}`, translationTree)
      }}</span>
    <teleport to="body" v-if="modalVisible">

    </teleport>
  </li>
  <ul v-else-if="modelValue" class="group">
    <aside>
      <li v-if="translationKey" class="group-title-container"><h3 class="group-title">{{ translationKey }}</h3></li>
      <li>
        <ul>
          <template v-for="(value, key) in modelValue">
            <!--      <span>{{ key }}</span>-->
            <translation-list-element :translationKey="key" :model-value="value"
                                      :translationPath="`${translationPath}${translationPath ? SEPARATOR : ''}${key}`"/>
          </template>
        </ul>

      </li>
    </aside>
      </ul>

</template>

<script setup lang="ts">
import {defineEmits, ref, toRef, watch} from "vue";
import {SEPARATOR, useTranslationsStore} from "../composables/useTranslationsStore";
import TranslationModal from "./translation-modal.vue";
import {useTranslationModal} from "../composables/useTranslationModal";

const {setValueByPath, getValueByPath, languages, translationTree} = useTranslationsStore()
const { modalVisible, hideModal, showModal, setModalTranslationPath } = useTranslationModal()

const props = defineProps<{
  translationKey: string;
  modelValue: string | object;
  translationPath: string;
}>()

const handleChangeTranslation = ({target: {value}}: any, lang: string) => {
  setValueByPath(`${lang}${SEPARATOR}${props.translationPath}`, value, translationTree.value)
}

const handleShowModal = () => {
  setModalTranslationPath(props.translationPath)
  showModal()
}

</script>
<style scoped>
.group {;
  display: flex;
  flex-direction: row;
}

.group-title-container {
  position: sticky;
  border-bottom: 1px solid #ccc;
}

h3.group-title {
  font: bold 12px Sans-Serif;
  letter-spacing: 2px;
  background: #369;
  color: #fff;
  padding: 5px 10px;
  margin: 0 0 10px 0;
  line-height: 24px;
}

li {
  display: flex;
}

aside {
  display: block;
  position: relative;
  border-left: 34px solid #335c99;
  padding-left: 10px;
  height: 100%;
  max-height: 100%;
  margin: 40px 0;
}

li.edit {
  display: flex;
  align-items: start;
  justify-content: space-evenly;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
}

li span {
  flex: 1;
  border-right: 1px solid #ccc;
}

input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
}
</style>
