import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    // console.log('mousedown', event.target.getAttribute('data-resize'))
    if (event.target.dataset.resize) {
      console.log('Start resizing', event.target.dataset.resize)
    }
  }


  // onClick() {
  //   console.log('click')
  // }
  //
  //
  // onMousemove() {
  //   console.log('mousemove')
  // }
  //
  // onMouseup() {
  //   console.log('mouseup')
  // }
}
