<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">口袋怪獸寵物店</a>
      <!--<button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
       <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/dashboard/products">後臺管理</router-link>
        </div>
      </div> -->
      <button type="button" class="btn btn-link position-relative" @click="$router.push('/user/cart')">
        <i class="bi bi-cart-fill text-black" style="font-size:24px;"></i>
        <span class="position-absolute translate-middle badge rounded-pill bg-danger" style="top:10px">{{cartsNum}}</span>
      </button>
    </div>
  </nav>
  <main class="container-fluid mt-3 position-relative">
    <router-view></router-view>
    <ToastMessages></ToastMessages>
  </main>
</template>

<script>
import ToastMessages from '@/components/ToastMessages.vue'
import emitter from '@/methods/emitter'
export default {
  components: {
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  },
  data () {
    return {
      cartsNum: 0
    }
  },
  created () {
    emitter.on('getCartsNum', (num) => {
      this.cartsNum = num
    })
  }
}
</script>

<style lang="scss" scoped>
main{
  min-height: calc(100vh - 72px);
}
</style>
