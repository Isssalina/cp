<template>

    <el-container>
    <el-header style="text-align: right; font-size: 12px"><Header></Header></el-header>
    <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
    </el-container>
    </el-container>
   



</template>

<script>
    import Header from '../../components/Header'
    import Nav from '../../components/NavMenu'
    export default{
        name: "Home.vue",
        components: {Header},


        data() {
        return {
          
        }
      }
    }
    
</script>
<style>
   .el-header, .el-footer {

    color: #333;
    text-align: center;
  }
  
  .el-aside {

    color: #333;
    text-align: center;
  }
  
  .el-main {

    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
   .el-main {
        weight:100%;
        height: 100%;
        text-align: center;
    }
     html, body, #app, .el-container {

        /*统一设置高度为100%*/
        height: 100%;
        width:100%
    }
</style>