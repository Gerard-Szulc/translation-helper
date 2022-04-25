import {readonly, ref} from "vue";
import {SEPARATOR, useTranslationsStore} from "./useTranslationsStore";
const { setValueByPath, translationTree } = useTranslationsStore()

const path = ref('')
const modalVisible = ref(false)
const title = ref('')

const setModalTranslationPath = (newPath) => {
  path.value = newPath
}
const handleChangeTranslation = ({ target: { value }}: any, lang: string) => {
    setValueByPath(`${lang}${SEPARATOR}${path}`, value, translationTree.value)
}
const showModal = () => {
    modalVisible.value = true
}
const hideModal = () => {
    path.value = ''
    modalVisible.value = false
}
const setTitle = (newTitle) => {
    title.value = newTitle
}
export const useTranslationModal = () => {
    return {
        setTitle,
        showModal,
        hideModal,
        modalVisible: readonly(modalVisible),
        path: readonly(path),
        title: readonly(title),
        handleChangeTranslation,
        setModalTranslationPath
    }
}