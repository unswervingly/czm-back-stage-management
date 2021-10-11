import { App } from 'vue'
import registerElement from './register-element'
import registerProperTies from './register-properties'

export function globalRegister(app: App): void {
  // registerElement(app)
  app.use(registerElement)

  app.use(registerProperTies)
}
