import { atom } from 'jotai'
import carouselData from "@/data/scenes/testCarouselData";
const video=carouselData.videos
export const activeButtonStateAtom=atom(true)
export const transitionRunningAtom=atom(false)
export const sceneAtom=atom('intro')
export const FadeAtom=atom(false)
export const readyToFadeAtom=atom(false)
export const currentMenuAtom=atom('')
export const currentVideoAtom=atom(null)
export const currentSubVideoAtom=atom(null)
export const handleBackAtom=atom(false)
export const thumbAtom=atom(false)
export const interiorSignalAtom=atom('')
export const vdoAtom=atom(video[0])
export const viewsAtom=atom(false)
export const showWalkAtom=atom(true)
export const currentVideoLoadedAtom=atom(false)
export const showAAtom=atom(true)