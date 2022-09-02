export default {
  read: (key: string) => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(key)

      if (data) {
        return JSON.parse(data)
      } else {
        return undefined
      }
    }
  },
  write: (key: string, data: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data))
    }
  }
}
