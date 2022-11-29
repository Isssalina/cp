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
            border
			:height="clientHeight"
            style="width: 100%">
            <el-table-column
                    prop="id"
                    label="id"
                    width="250">
                    </el-table-column>
                    <el-table-column
                    prop="era"
                    label="era"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="feature_Intelligence1"
                    label="Unit net worth"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="feature_Intelligence2"
                    label="Cumulative net worth"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="feature_Intelligence3"
                    label="latest scale"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    width="150"
                    prop="target"
                    label="target"
                    >
                    </el-table-column>
                    <el-table-column
					width="150"
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
                    width="150"
                    prop="growth_rate"
                    label="growth rate"
                    >
                    </el-table-column>
            <el-table-column
            label="Option">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="primary" size="small">Add</el-button>
                <el-button @click="predic(scope.row)" type="success" size="small" >View prediction</el-button>
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
    import Qs from 'qs'
    export default {
        name: 'Select',
        components: {Header},


        data() {
        return {
            tableData: [],
            username:'',
            stockId:'',
            prediction:'',
            currentPage: 1,
            pageSize: 12,
            total:0,
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
        this.submitRange(1);
            this.tablePage(1);
            
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

         submitRange(currentPage){
             const _this = this
             console.log(this.risk.min)
            _this.$axios({
                method:'get',
                url:'/Recommendation',
                params:{
                  min:this.risk.min,
                  max:this.risk.max,
                  pageNum: this.currentPage,
                  pageSize: this.pageSize
                }
            }).then(res =>{
                console.log(res)
                _this.tableData = res.data.data.list
                _this.currentPage = res.data.data.pageNum
                _this.total = res.data.data.total
                this.loading = false,
                this.dialogVisible = false
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