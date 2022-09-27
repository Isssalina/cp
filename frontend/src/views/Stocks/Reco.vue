<template>
<div>
    <Header></Header>
    <div class="top-card">
    <el-row :gutter="20" class="el-row">
  <el-col :span="8">
    <el-card shadow="never">
     Here are 20 stocks we recommend
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card shadow="hover">
      You can also choose stocks according to your needs.
    </el-card>
  </el-col>
  <el-col :span="8" v-show="showname">
    <el-card shadow="hover">
   Go to the Add Selected Stocks page to select your stock.&nbsp
    <el-button type="primary" icon="el-icon-edit" circle @click="goAddstocks"></el-button>
      </el-card>
  </el-col>
  <el-col :span="8" v-show="!showname">
    <el-card shadow="hover">
    Please register or log in to select your stocks!
    &nbsp<el-button type="primary" icon="el-icon-s-custom" circle @click="goLogin"></el-button>
    </el-card>
  </el-col>
</el-row>
</div>
     <el-table
                  :data="tableData"
                  v-loading="loading"
                  style="width: 100%">
                  <el-table-column
                    label="id"
                    prop="id"
                    width="250">
                  </el-table-column>
                  <el-table-column
                    prop="era"
                    label="era"
                    width="200">
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
                    width="200"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="risk"
                    label="risk"
                    width="250"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="growth_rate"
                    label="growth rate"
                    >
                    </el-table-column>
                </el-table>
               


                 
</div>

</template>

<script>
    import Header from '../../components/Header'
    import { Loading } from 'element-ui';
    export default{
        name: 'Reco',
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
            showname: false,
            user: {
            username: '',
            userId:''
        },

          
        }
      },
      mounted() {
        
            this.tablePage();
            this.sData(1);
        
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

        goLogin(){
            this.$router.push('/Login');
        },
        goAddstocks(){
            this.$router.push('/select');
        },
        tablePage(){
            const _this = this
            _this.$axios({
                method:'get',
                url:'/SelfRecoms',
                
            }).then(res =>{
                console.log(res)
                _this.tableData = res.data.data
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
        this.tablePage();
        
         if(this.$store.getters.getUser.username){
            this.user.username = this.$store.getters.getUser.username
            this.user.avatar = this.$store.getters.getUser.avatar
            this.showname = true
            console.log(this.showname)
        }
        
      }

    }
    
</script>
<style>
    .homeWrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    
    }
 .el-header, .el-footer {
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
  
.el-row {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap
  }

  

   .el-main {
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
     .el-card {
    min-width: 100%;
    height: 100%;
    margin-right: 20px;
    transition: all .5s;
    text-align: center;
    margin:auto;

  }
  .top-card {
     margin-top:20px
  }
</style>