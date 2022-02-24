<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">後台管理</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to='/dashboard/products'>產品管理</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to='/dashboard/orders'>訂單管理</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to='/dashboard/coupons'>優惠券管理</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent='logout'>登出</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to='/'>前台</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      this.axios.post(api).then((res) => {
        if (res.data.success) {
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>
