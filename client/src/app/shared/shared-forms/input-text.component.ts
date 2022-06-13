import { Component, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Notifier } from '@app/core'
import { GlobalIconName } from '../shared-icons'

@Component({
  selector: 'my-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: [ './input-text.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() inputId = Math.random().toString(11).slice(2, 8) // id cannot be left empty or undefined
  @Input() value = ''
  @Input() autocomplete = 'off'
  @Input() placeholder = ''
  @Input() tabindex = 0
  @Input() withToggle = true
  @Input() withCopy = false
  @Input() readonly = false
  @Input() show = false

  constructor (private notifier: Notifier) { }

  get inputType () {
    return this.show
      ? 'text'
      : 'password'
  }

  get toggleTitle () {
    return this.show
      ? $localize`Hide`
      : $localize`Show`
  }

  toggle () {
    this.show = !this.show
  }

  activateCopiedMessage () {
    this.notifier.success($localize`Copied`)
  }

  getEyeIcon (): GlobalIconName {
    if (this.show) return 'sensitive'

    return 'unsensitive'
  }

  propagateChange = (_: any) => { /* empty */ }

  writeValue (value: string) {
    this.value = value
  }

  registerOnChange (fn: (_: any) => void) {
    this.propagateChange = fn
  }

  registerOnTouched () {
    // Unused
  }

  update () {
    this.propagateChange(this.value)
  }
}
