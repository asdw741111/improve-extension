/**
 * 入口文件，该文件会直接执行，将需要执行的逻辑放到这里调用。避免直接在本文件写业务逻辑。
 * 池宗洋
 * @date 2021/8/12
 */
import extension from "./lib/extension"

let init = false

const page = {
  data (){
    return {

    }
  },
  init (){
    extension.init()
  },
  methods: {},
  events: {},
}

if (!init) {
  page.init()
  init = true
}
