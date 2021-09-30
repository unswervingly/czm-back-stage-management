<template>
  <div id="nav">
    <h2>{{ $store.state.name }}</h2>

    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <router-view />

    <el-button>哈哈哈</el-button>
    <el-button type="primary">呵呵呵</el-button>
    <el-button type="danger">哈哈哈呵呵呵</el-button>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
