<template>
  <div id="app">
	<Header></Header>
    <router-view/>
  </div>
</template>
<script>
	import Header from './components/Header'
	export default{
	    components: {Header},
	}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width:100%;
  margin: 0 auto
  
}
  .el-main {    
    text-align: center;
    line-height: 250px;
  }
  .el-container{
    width:100% !important;
    height:100%;
  }

</style>