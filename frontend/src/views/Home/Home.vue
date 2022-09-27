<template>
    <div class="homeWrap">

        <Header></Header>
        <el-container>
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
                <el-button type="primary" icon="el-icon-check" circle @click="sData" v-loading.fullscreen.lock="fullscreenLoading"></el-button>
            </div>
            <div>

                 <el-table
                v-loading="loading"
                :data="tableData"
                @cell-click="handleClick"
                border
                style="width: 100%">
                <el-table-column
                label="Chart"
                width="60%"
                type="expand"
                
                >
                    <template slot-scope="props">
                        <div id="main"></div>
                    </template>
                </el-table-column>
                <el-table-column
                fixed
                prop="id"
                label="id"
                width="150">
                </el-table-column>
                <el-table-column
                
                prop="era"
                label="era"
                width="100">
                </el-table-column>
                <el-table-column
                prop="feature_Intelligence1"
                label="Unit net worth"
                width="200">
                </el-table-column>
                <el-table-column
                prop="feature_Intelligence2"
                label="Cumulative net worth"
                width="200">
                </el-table-column>
                <el-table-column
                prop="feature_Intelligence3"
                label="latest scale"
                width="200">
                </el-table-column>
                <el-table-column
                prop="target"
                label="target"
                >
                </el-table-column>
                
            </el-table>

                
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize" 
                layout="prev, pager, next, jumper"
                :total="total">
                </el-pagination>
                </div>
                </div>
            </el-main>
        </el-container>

 </div>  
</template>

<script>
    import Header from '../../components/Header'
    import { Loading } from 'element-ui';
    import echarts from 'echarts'
    export default{
        name: 'Home',
        components: {Header},


        data() {
        return {
            tableData: [],
            value1: '',
            charts:'',
            opinionData: [],
            fullscreenLoading: false,
            loading: true,
            currentPage: 1,
            pageSize: 10,
            total:0,
            user: {
            username: '',
            userId:''
        },

          
        }
      },
      mounted() {
        
            this.tablePage(1);
        
      },
      methods: {
        handleSizeChange(val) {
                console.log(`Each page has ${val} pieces of data`);
                this.currentPage = 1;
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                console.log(`Current page: ${val}`);
                this.currentPage = val;
                this.tablePage(val)
            },
        tablePage(currentPage){
            const _this = this
            _this.$axios({
                method:'get',
                url:'/Data',
                params:{
                    pageNum: this.currentPage,
                    pageSize: this.pageSize
                }
            }).then(res =>{
                console.log(res)
                _this.tableData = res.data.data.list
                _this.currentPage = res.data.data.pageNum
                _this.total = res.data.data.total
                this.loading = false
            })
        },
        sData(currentPage){
            this.loading = true;
             setTimeout(() => {
          this.loading = false;
        }, 1000);
            const _this = this
            _this.$axios({
                method:'get',
                url:'/Data',
                params:{
                    pageNum: this.currentPage,
                    pageSize: this.pageSize
                }
            }).then(res =>{
                console.log(res)
                _this.tableData = res.data.data.list
                _this.currentPage = res.data.data.pageNum
                _this.total = res.data.data.total
                
            })
            
        },
        handleClick(row, column, cell, event){
            console.log(row.target);
            this.opinionData = row.target
            console.log(opinionData)
        },
        drawLine(id){
            console.log(row);

        },
       
    
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