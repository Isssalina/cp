<template>

<div>
    <Header></Header>
    <div class="t-type">
    <el-container>
        <el-aside width="40%"></el-aside>
        <el-main>
        <el-descriptions width="50%"title="UserInfo" direction="vertical" :column="3" border>
            <el-descriptions-item label="Username"></el-descriptions-item>
            <el-descriptions-item label="Firstname"></el-descriptions-item>
            <el-descriptions-item label="Lastname"></el-descriptions-item>
            <el-descriptions-item label="E-mail"></el-descriptions-item>
            <el-descriptions-item label="Password">
            <el-button type="primary">Change Password</el-button>
            </el-descriptions-item>

        </el-descriptions>
        </el-main>
        </el-container>
    </div>
</div>

</template>

<script>
    import Header from '../../components/Header'
    export default{
        name: "Info.vue",
        components: {Header},
        data() {
        return {
          
        }
      }
    }
</script>

<style>

    .el-container {
    text-align: center;
    width: 80%;
  }
  .el-aside {
    text-align: center;
    width: 35%;
  }
  .el-main {

    text-align: center;
    line-height: 60px;
  }
</style>