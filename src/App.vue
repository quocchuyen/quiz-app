<template>
  <div id="app">

        <SiderBar />
        <Header />
        <QuestionGroup />

  </div>
</template>

<script>
import Header from "./components/Header"
import SiderBar from "./components/SiderBar"
import QuestionGroup from "./components/QuestionGroup"

export default {
  components: { Header,SiderBar,QuestionGroup },
  name: "App",
};
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
