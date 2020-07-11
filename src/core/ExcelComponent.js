import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

    this.prepare()
  }

  // Настроюєм компонент до init
  prepare() {
  }

  // Повертає шаблон компонента
  toHTML() {
    return '';
  }

  // Повідомляємо слухачів про подію event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Підписуємось на подію event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // Ініціюємо компонет
  // Додаємо DOM слухачів
  init() {
    this.initDOMListeners()
  }

  // Видаляємо компонент
  // Чистимо слухачів
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
