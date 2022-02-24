<template>
  <div class="toast" ref="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
      <strong class="me-auto">{{msg.title}}</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div class="toast-body" v-if='msg.content'>{{msg.content}}</div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast'
export default {
  name: 'Toast',
  props: ['msg'],
  mounted () {
    const toastEl = this.$refs.toast
    const toast = new Toast(toastEl, {
      delay: 6000
    })
    toast.show()
  }
}
</script>
