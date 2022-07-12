export default {
  read: (key) => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(key)

      if (data) {
        return JSON.parse(data)
      } else {
        return undefined
      }
    }
  },
  write: (key, data) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data))
    }
  }
}
