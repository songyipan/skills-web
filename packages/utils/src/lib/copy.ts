import copy from 'clipboard-copy'


export async function copyText(text: string) {
  try {
    await copy(text)
  } catch (error) {
    console.error('copyText error', error)  
    throw new Error(error instanceof Error ? error.message : String(error))
  }
}