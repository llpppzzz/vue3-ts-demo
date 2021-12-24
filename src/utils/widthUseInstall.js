import { isEmpty, isObject } from './utils'

/**
 * @param {import('Vue').Component} Component
 * @param {function} install
 */
export default function widthUseInstall(Component, install = undefined) {
  /**
   * 扩展组件 use 方法，用于修改默认 props
   * @param {object} props
   */
  Component.use = (props) => {
    if (!isEmpty(props) && isObject(props)) {
      Object.entries(props).forEach(([key, value]) => {
        if (Component.props[key]) {
          Component.props[key].default = value
        }
      })
    }
  }

  /**
   * 扩展组件 install 方法
   * @param {import('vue').App} app
   * @param {object} props
   */
  Component.install = (app, props) => {
    if (install) {
      install(app, props)
    } else {
      Component.use(props)
      app.component(Component.name, Component)
    }
  }
}
