import { ref, readonly } from "vue";
export const SEPARATOR = '#separator#'
type TranslationObject = Record<string, string | object>

const languages = ref(['pl', 'en', 'es'])
const translationTree = ref()

translationTree.value = languages.value.reduce((acc, lang) => {
    acc[lang] = {};
    return acc;
}, {} as {[key: string]: TranslationObject})

const setValueByPath = (path: string, value: string | object, current: any) => {
    const [key, ...rest] = path.split(SEPARATOR)
    if (current === undefined) {
        current =  {}
    }
    const newCurrent = current[key]
    if (newCurrent === undefined) {
        current[key] =  {}
    }

    if (rest.length === 0) {
        current[key] = value
    } else {
        setValueByPath(rest.join(SEPARATOR), value, newCurrent)
    }
}
const getValueByPath = (path: string, current: any): string | object => {
    const [key, ...rest] = path.split(SEPARATOR)
    const newCurrent = current[key] || ''

    if (rest.length === 0) {
        return newCurrent
    } else {
        return getValueByPath(rest.join(SEPARATOR), newCurrent)
    }
}
const setTree = (tree: object, lang: string) => {
    translationTree.value[lang] = { ...tree }
}
export const useTranslationsStore = () => {
    return {
        setTree,
        setValueByPath,
        getValueByPath,
        languages: readonly(languages),
        translationTree: readonly(translationTree),
    }
}
