<template>           
<div class="preContainer">
 <div class="t-tab">
  <div class="block">
  <br/>
  <span class="demonstration">Select the three Features you want to view</span>&nbsp;
  <el-input-number size="mini" v-model="num1" controls-position="right" @change="handleNum" :min="1" :max="310"></el-input-number>&nbsp;
  <el-input-number size="mini" v-model="num2" controls-position="right" @change="handleNum" :min="1" :max="310"></el-input-number>&nbsp;
  <el-input-number size="mini" v-model="num3" controls-position="right" @change="handleNum" :min="1" :max="310"></el-input-number>&nbsp;
  <el-button type="primary" icon="el-icon-check" circle @click="sFeature" v-loading.fullscreen.lock="fullscreenLoading"></el-button>
  </div>
  </div> <br/>
	<el-table
	:data="tableData"
	v-loading="loading"
	:height="clientHeight"
	style="width: 100%">
	<el-table-column
	label="Id"
	prop="id">
	</el-table-column>
	<el-table-column
	prop="era"
	label="Era"
	width="200">
	</el-table-column>
	<el-table-column
	prop="feature_Intelligence1"
	label="Unit Net Worth"
	width="200">
	</el-table-column>
	<el-table-column
	prop="feature_Intelligence2"
	label="Cumulative Net Worth"
	width="200">
	</el-table-column>
	<el-table-column
	prop="feature_Intelligence3"
	label="Latest Scale"
	width="200">
	</el-table-column>
	<el-table-column
	prop="target"
	label="Target"
	>
	</el-table-column>
	<el-table-column
	prop="risk"
	label="Risk"
  show-overflow-tooltip
	>
  <template slot="header">
            Risk
            <el-tooltip class="item" effect="dark" content="The displayed risk value is the actual risk value *10,000" placement="bottom">-->
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>

	</el-table-column>
	<el-table-column
	prop="growth_rate"
	label="Growth rate"
	>
  <template slot="header">
            Growth rate
            <el-tooltip class="item" effect="dark" content="The growth rate is 0 because the Numerai dataset has not changed since July." placement="bottom">-->
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>
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
        name: 'Prediction',
        components: {Header},
        data(){
            return{
            tableData: [],
            loading: true,
            currentPage: 1,
            pageSize: 17,
            total:0,
            num1:1,
            num2:1,
            num3:1,
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
      },
    

            // predics(){
            //     const _this = this
            //     _this.$axios.get('/Prediction').then(res =>{
            //         console.log(res)
            //         _this.predic = res.data.data
            //     })
            // }
       sFeature(currentPage){

            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                }, 2000);
                const _this = this
            _this.$axios({
                method:'get',
                url:'/Features',
                params:{
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    targetNum1:this.num1,
                    targetNum2:this.num2,
                    targetNum3:this.num3
                }
            }).then(res =>{
                console.log(res)
                _this.tableData = res.data.data.list
                _this.currentPage = res.data.data.pageNum
                _this.total = res.data.data.total
                
            })

        },
          handleNum(value) {
        console.log(value);
      },

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
   .t-tab{
    width: 80%;
    margin:auto;

  }
   .block{
    width: 70%;
    margin:auto;

  }
  </style>