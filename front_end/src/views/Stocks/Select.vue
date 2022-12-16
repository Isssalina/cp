<template>
    <div class="preContainer">
    <div class="top-card">
    <el-row :gutter="20" class="el-row">
    <el-col :span="12" :offset="6">
    <el-card shadow="never">
     You can choose your stocks by choosing risk and growth rate.&nbsp
    <el-button type="primary" icon="el-icon-edit" circle @click="dialogVisible = true"></el-button>
    <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form ref="form" :model="Range">
    <el-form-item label="Risk Scope">
    <el-select v-model="Range.riskRange"
        placeholder="Please select the scope of risk"
        @change="userSelect($event)">

        <el-option
                    v-for="item in list"
                    :key="item.id"
                    :label="item.range"
                    :value="item"
        />

    </el-select>
  </el-form-item>
        <el-form-item label="Growth-rate">
            <el-select v-model="Range.grRange"
                placeholder="Please select the range of growth-rate"
                @change="userSelect($event)">
                <el-option label="0% ~ 0%" value="0"></el-option>

            </el-select>
        </el-form-item>
  </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitRange">Submit</el-button>
    </span>
    </el-dialog>
    </el-card>
      </el-col>
    </el-row>


    </div>
        <el-table
            :data="tableData"
            v-loading="loading"
            border
            style="width: 100%">
            <el-table-column
                    prop="id"
                    label="Id"
                    width="220">
                    </el-table-column>
                    <el-table-column
                    prop="era"
                    label="Era"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="feature_Intelligence1"
                    label="Unit Net Worth"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="feature_Intelligence2"
                    label="Cumulative Net Worth"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="feature_Intelligence3"
                    label="Latest Scale"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    width="150"
                    prop="target"
                    label="Target"
                    >
                    </el-table-column>
                    <el-table-column
					width="170"
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
                    width="170"
                    prop="growth_rate"
                    label="Growth Rate"
                    >
                    <template slot="header">
            Growth Rate
            <el-tooltip class="item" effect="dark" content="The growth rate is 0 because the Numerai dataset has not changed since July." placement="bottom">-->
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>
                    </el-table-column>
            <el-table-column
            fixed="right"
            label="Option"
            width="230">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="primary" size="small">Add</el-button>
                <el-button @click="predic(scope.row)" type="success" size="small" >View Prediction</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div v-show="!getSubmit">
         <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize" 
                layout="prev, pager, next, jumper"
                :total="total">
                </el-pagination>
        </div>
        <div v-show="getSubmit">
         <el-pagination 
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page.sync="currentPage2"
                :page-size="pageSize2" 
                layout="prev, pager, next, jumper"
                :total="total2">
                </el-pagination>
        </div>
        </div>
</template>

<script>
    import Header from '../../components/Header'
    import Qs from 'qs'
    export default {
        name: 'Select',
        components: {Header},


        data() {
        return {
            getSubmit: false,
            tableData: [],
            username:'',
            stockId:'',
            prediction:'',
            currentPage: 1,
            pageSize: 12,
            total:0,
            currentPage2: 1,
            pageSize2: 12,
            total2:0,
			clientHeight:document.documentElement.clientHeight-230,
            Range:{
              
                riskRange:{
                  min:'',
                  max:'',
                  range:''
                }
            },
            grRange:'',
            risk:{
                min:0,
                max:1
            },
            dialogVisible: false,
            list: [
                {
                    id: 1,
                    min: 0,
                    max: 1,
                    range: "0 ~ 1",

                },
                {
                    id: 2,
                    min: 1,
                    max: 10,
                    range: "1 ~ 10",

                },
                {
                    id: 3,
                    min: 10,
                    max: 31,
                    range: "10 ~ 31",

                },
                {
                    id: 4,
                    min: 403,
                    max: 960,
                    range: "403 ~ 960",

                },
                {
                    id: 5,
                    min: 2049,
                    max: 2995,
                    range: "2049 ~ 2995",

                },


            ]



        }
        },
        mounted() {
   
        this.tablePage(1);
        this.submitRange(1);   
			const that = this
			window.onresize = () => {
			  return (() => {
				that.clientHeight = document.documentElement.clientHeight-230 // 高
			  })()
			}
        
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
                this.tablePage(val);
            },
            handleSizeChange2(val) {
                console.log(`Each page has ${val} pieces of data`);
                this.currentPage2 = 1;
                this.pageSize2 = val;
            },
            handleCurrentChange2(val) {
                console.log(`Current page: ${val}`);
                this.currentPage2 = val;
                this.submitRange(val)
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
                this.getSubmit = false
            })
        },
        handleClick(row) {
            console.log(row);
            this.stockId = row.id
            const _this = this
           
            
            _this.$axios({
                method: 'post',
                url:'/AddStock',
                params:{
                    username:this.username,
                    stockId:this.stockId
                }
            }).then(res =>{
                console.log(res)
                _this.$notify.info({
                title: 'Message',
                message: 'Added successfully'
        });
                
            })
        },

        predic(row){
            const _this = this
            console.log(row);
            this.stockId = row.id
            _this.$axios({
                method:'get',
                url:'/ViewStockDetail',
                params:{
                    stockId:this.stockId
                }
            }).then(res =>{
                console.log(res)
                _this.prediction = res.data.data.prediction
                this.$alert(_this.prediction, 'Prediction', {
                confirmButtonText: 'OK',
                callback: action => {
                this.$message({
                type: 'info',
                message: `action: ${ action }`
            });
          }
        });
            })
            

        },
        userSelect(event){
            this.Range.riskRange.min = event.min;
            this.Range.riskRange.max = event.max;
            this.Range.riskRange = event.range;
            this.risk.min = event.min;
            this.risk.max = event.max;
            console.log(this.risk.min)
            const _this = this
            _this.$axios({
                method:'get',
                url:'/RiskRange',
                params:{
                  min:this.risk.min,
                  max:this.risk.max
                }
            }).then(res =>{
                console.log(res)
            
            })
         },

         submitRange(currentPage2){
             const _this = this
             console.log(this.risk.min)
            _this.$axios({
                method:'get',
                url:'/Recommendation',
                params:{
                  min:this.risk.min,
                  max:this.risk.max,
                  pageNum: this.currentPage2,
                  pageSize: this.pageSize2
                }
            }).then(res =>{
                console.log(res)
                _this.tableData = res.data.data.list
                _this.currentPage2 = res.data.data.pageNum
                _this.total2 = res.data.data.total
                this.loading = false,
                this.dialogVisible = false
                this.getSubmit = true
            })
         },
         

        handleClose(done) {
        this.$confirm('Confirm to close?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
      },

        created(){
        
        if(this.$store.getters.getUser.username){
            this.username = this.$store.getters.getUser.username
            this.avatar = this.$store.getters.getUser.avatar
        };
        this.tablePage(1)
      }
    }
</script>
<style>
    .top-card {
         margin-top: 20px;
    }
	.preContainer{
	  width: 80%;
	  margin: auto;
	}
</style>