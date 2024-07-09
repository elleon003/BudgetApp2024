<template>
  <div id="app">
    <PlaidLinkButton />
    <PlaidAccounts />
  </div>
</template>

<script>
import PlaidLinkButton from './components/PlaidLinkButton.vue'
import PlaidAccounts from './components/PlaidAccounts.vue'

export default {
  name: 'App',
  components: {
    PlaidLinkButton,
    PlaidAccounts
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
