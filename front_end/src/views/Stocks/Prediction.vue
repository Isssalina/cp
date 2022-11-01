<template>
<div class="preContainer">
	<el-table
	:data="tableData"
	v-loading="loading"
	:height="clientHeight"
	style="width: 100%">
	<el-table-column
	label="id"
	prop="id">
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
	>
	</el-table-column>
	<el-table-column
	prop="risk"
	label="risk"
  show-overflow-tooltip
	>
  <template slot="header">
            risk
            <el-tooltip class="item" effect="dark" content="Since the actual risk value is too small, this risk value is the value after expanding by 10,000 times." placement="bottom">-->
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>

	</el-table-column>
	<el-table-column
	prop="growth_rate"
	label="growth rate"
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
            pageSize: 16,
            total:0,
			clientHeight:document.documentElement.clientHeight-100,
            }
        },
         mounted() {
            this.tableDatas(1);
			const that = this
			window.onresize = () => {
			  return (() => {
				that.clientHeight = document.documentElement.clientHeight-100 // 高
			  })()
			}
      },
        created(){
            this.tableDatas()
            // this.predics()
        },
        methods:{
            tableDatas(currentPage){
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
        this.tableDatas(val)
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
  .preContainer{
	  width: 80%;
	  margin: auto;
  }
  </style>