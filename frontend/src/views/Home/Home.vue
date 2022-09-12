<template>
    <div class="homeWrap">

        <Header></Header>
        <el-container>
            <el-aside width="25%">
               <el-container>
                <el-main>
                    <div class="block">
                    <el-timeline>
                        <el-timeline-item timestamp="2022/8/7" placement="top">
                        <el-card>
                            <h8>Update</h8>
                            <p>xxx 2022/8/7 20:86</p>
                        </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2022/8/8" placement="top">
                        <el-card>
                            <h8>Update</h8>
                            <p>xxx 2022/8/3 20:86</p>
                        </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2022/8/8" placement="top">
                        <el-card>
                            <h8>Update</h8>
                            <p>xxx 2022/8/2 20:86</p>
                        </el-card>
                        </el-timeline-item>
                    </el-timeline>
                    </div>
                </el-main>
                </el-container>
            </el-aside>
            <el-main>
                <div class="block">
                    <el-carousel class="t-pics" trigger="click" height="200px">
                    <el-carousel-item v-for="item in 3" :key="item">
                        <h3 class="small">{{ item }}</h3>
                    </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="t-tab">
                <div class="block">
                <span class="demonstration">Historical Data</span>&nbsp;
                <el-date-picker
                v-model="value1"
                type="week"
                format="yyyy Week WW "
                placeholder="select week">
                </el-date-picker>&nbsp;
                <el-button type="primary" icon="el-icon-check" circle @click="sData"></el-button>
            </div>

                <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                    
                    <el-table-column
                    prop="id"
                    label="id"
                    width="250">
                    </el-table-column>
                    <el-table-column
                    prop="era"
                    label="era"
                    width="130">
                    </el-table-column>
                    <el-table-column
                    prop="feature_Intelligence1"
                    label="Unit net worth"
                    width="130">
                    </el-table-column>
                    <el-table-column
                    prop="feature_Intelligence2"
                    label="Cumulative net worth"
                    width="130">
                    </el-table-column>
                    <el-table-column
                    prop="feature_Intelligence3"
                    label="latest scale"
                    width="130">
                    </el-table-column>
                    <el-table-column
                    prop="target"
                    label="target"
                    >
                    </el-table-column>

                </el-table>
                <el-pagination
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
                </div>
            </el-main>
        </el-container>

 </div>  
</template>

<script>
    import Header from '../../components/Header'
    export default{
        name: 'Home',
        components: {Header},


        data() {
        return {
            tableData: [],
            value1: '',
          
        }
      },
      methods: {
        tablePage(){
            const _this = this
            _this.$axios.get("/Data").then(res =>{
                console.log(res)
                _this.tableData = res.data.data
            })
        },
        sData(){
            const _this = this
            _this.$axios.get("/Data").then(res =>{
                console.log(res)
                _this.tableData = res.data.data
            })
        }
      },
      created(){
        this.tablePage()
      }

    }
    
</script>
<style>
    .homeWrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    }
   .el-header, .el-footer {

    color: #333;
    text-align: center;
  }
  
  .el-aside {

    color: #333;
    text-align: center;
  }
  .block{
    width: 70%;
    margin:auto;

  }
  .t-tab{
    width: 80%;
    margin:auto;

  }
  

   .el-main {
        line-height: 160px;
        weight:100%;
        height: 100%;
        text-align: center;
    }
    .el-carousel__item h3 {
        color: #875669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
  
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>