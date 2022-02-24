<template>
  <Navbar></Navbar>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import ToastMessages from '@/components/ToastMessages.vue'
import emitter from '@/methods/emitter'
export default {
  components: {
    Navbar,
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    if (!token) {
      this.$router.push('/login')
      return
    }
    this.$http.defaults.headers.common.Authorization = `${token}`
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.axios.post(api, this.user).then((res) => {
      if (!res.data.success) {
        this.$router.push('/login')
      }
    })
  }
}
</script>
