<template>
<div>
    <Header></Header>

                  <el-table
                  :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  v-loading="loading"
                  style="width: 100%">
                  <el-table-column
                    label="id"
                    prop="id">
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
                    <el-table-column
                    prop="risk"
                    label="risk"
                    >
                    </el-table-column>
                </el-table>
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize" 
                layout="prev, pager, next, jumper"
                :total="tableData.length">
                </el-pagination>
</div>

</template>

<script>
    
     import Header from '../../components/Header'
     export default {
        name: 'prediction',
        components: {Header},
        data(){
            return{
            tableData: [],
            loading: true,
            currentPage: 1,
            pageSize: 16
            
            
               
            }
        },
        created(){
            this.tableDatas()
            // this.predics()
        },
        methods:{
            tableDatas(){
                const _this = this
                _this.$axios.get('/Data').then(res =>{
                    console.log(res)
                    _this.tableData = res.data.data
                    this.loading = false
                });
            },
            handleSizeChange(val) {
        console.log(`Each page has ${val} pieces of data`);
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        console.log(`Current page: ${val}`);
        this.currentPage = val;
      }
    

            // predics(){
            //     const _this = this
            //     _this.$axios.get('/Prediction').then(res =>{
            //         console.log(res)
            //         _this.predic = res.data.data
            //     })
            // }
        }
     }

</script>


<style>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  </style>