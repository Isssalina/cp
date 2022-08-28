<template>
<div>
    <Header></Header>

    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="prediction">
            <span>{{ props.row.predic }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="id"
      prop="id">
    </el-table-column>
    <el-table-column
      label="feature1"
      prop="feature1">
    </el-table-column>
    <el-table-column
      label="feature2"
      prop="feature2">
    </el-table-column>
    <el-table-column
      label="feature3"
      prop="feature3">
    </el-table-column>
    <el-table-column
      label="target"
      prop="target">
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
            tableData: [{
            id: '',
            feature1: '',
            feature2: '',
            feature3: '',
            target: '',
            prediction:''
            }]
               
            }
        },
        created(){
            this.tableDatas(),
            this.predics()
        },
        methods:{
            tableDatas(){
                const _this = this
                _this.$axios.get('/Data').then(res =>{
                    console.log(res)
                    _this.tableData.id = res.data.id
                    _this.tableData.feature1 = res.data.feature_Intelligence1
                    _this.tableData.feature2 = res.data.feature_Intelligence2
                    _this.tableData.feature3 = res.data.feature_Intelligence3
                    _this.tableData.target = res.data.target
                })
            },

            predics(){
                const _this = this
                _this.$axios.get('/Prediction').then(res =>{
                    console.log(res)
                    _this.tableData.prediction = res.data.prediction
                })
            }
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