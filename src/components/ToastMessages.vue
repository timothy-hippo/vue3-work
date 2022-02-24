<template>
  <div class="toast-container position-fixed pe-3"  style="z-index: 999;top:60px;right:0">
    <Toast v-for='(item, key) in messages' :key='key' :msg='item'></Toast>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue'
export default {
  components: {
    Toast
  },
  data () {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  mounted () {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
