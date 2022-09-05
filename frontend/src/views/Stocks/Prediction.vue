<template>
<div>
    <Header></Header>

    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="id"
      prop="id">
    </el-table-column>
    <el-table-column
      label="prediction"
      prop="prediction">
    </el-table-column>
  </el-table>
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
            
            
               
            }
        },
        created(){
            this.tableDatas()
            // this.predics()
        },
        methods:{
            tableDatas(){
                const _this = this
                _this.$axios.get('/Prediction').then(res =>{
                    console.log(res)
                    _this.tableData = res.data.data
                });
            },

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