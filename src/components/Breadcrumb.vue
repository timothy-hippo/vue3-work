<template>
  <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
      <li class="breadcrumb-item active" aria-current="page">{{productName}}</li>
    </ol>
  </nav>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['productName']
}
</script>
