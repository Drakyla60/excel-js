export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isSell(event) {
  return event.target.dataset.type === 'cell'
}
