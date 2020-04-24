<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created () {
      let ip = returnCitySN['cip']
      this.$cookies.set('ip_address', ip)
      console.info('当前客户端外网IP：' + ip)
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000000;
    background-color: #FFFFFF;
  }

  * {
    margin: 0px;
    padding: 0px;
  }

  /* 谷歌 */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }

  /* 火狐 */
  input {
    -moz-appearance: textfield;
  }

  .el-form-item__label {
    width: 80px;
  }

  .el-table__header tr, .el-table__header th {
    background-color: #fafafa;
  }

  .demo-image__preview .el-image-viewer__close > i {
    color: #FFFFFF;
  }

  .el-dialog > .el-dialog__body {
    padding: 0px 20px 20px 20px;
  }
</style>
