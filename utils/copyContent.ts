const copyContent = (inputId: string) => {
  ;(document.getElementById(inputId) as HTMLInputElement).select()
}

export default copyContent
