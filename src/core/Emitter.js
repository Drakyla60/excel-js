export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // Повідомляємо слухача якщо він є
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }

    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // Підписуємося на повідомлення
  // Додаємо нового слухача
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

// const emitter = new Emitter()
// const sub = emitter.subscribe('roma', data => console.log('Sub:', data))
// emitter.emit('roma', 4543)
// setTimeout(() => {
//   emitter.emit('roma', 44444444)
// }, 2000)
// setTimeout(() => {
//   sub()
// }, 3000)
// setTimeout(() => {
//   emitter.emit('roma', 44444444)
// }, 4000)
// console.log(11111)
