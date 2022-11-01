<template>
    <div class="">
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
					  align="center"
                      format="yyyy week WW"
				      placeholder="Please select the week">
				    </el-date-picker>&nbsp;
                <el-button type="primary" icon="el-icon-check" circle @click="sData" v-loading.fullscreen.lock="fullscreenLoading"></el-button>
            </div>
            <div>

                 <el-table
                v-loading="loading"
                :data="tableData"
                @cell-click="handleClick"
                border
				@expand-change="expandChange"
                style="width: 100%">
               <el-table-column type="expand" label="echarts" width="80">
				  <template slot-scope="props">
					  <div style="height: 200px;width:1000px;">
						<div style="height: 200px;width:420px" :ref="'echarts'+props.row.id"></div>
					  </div>
				  </template>
               </el-table-column>
                <el-table-column
                prop="id"
                label="id">
                </el-table-column>
                <el-table-column
                
                prop="era"
                label="era">
                </el-table-column>
                <el-table-column
                prop="feature_Intelligence1"
                label="Unit net worth">
                </el-table-column>
                <el-table-column
                prop="feature_Intelligence2"
                label="Cumulative net worth">
                </el-table-column>
                <el-table-column
                prop="feature_Intelligence3"
                label="latest scale">
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
    import { Loading } from 'element-ui';
    import * as echarts from 'echarts'
    export default{
        name: 'Home',
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
				userId:'',
			}
        }
      },
      mounted() {
        this.tablePage(1);
      },
      methods: {
		expandChange(row,expandRows){
			console.log(row)
			var that = this;
			
			that.$axios({
			    method:'get',
			    url:'/Targets',
			    params:{
			        stockId: row.id
			    }
			}).then(res =>{
			    console.log(res)
				console.log(res.data.data)
				var echardata = res.data.data;
				var targetArr = [];
				var timeArr = [];
				for(let i in echardata) {
				  targetArr.push (echardata[i].target )  //
				  timeArr.push(echardata[i].date)
				}
				that.getEcharts(targetArr,timeArr,row);
			});
		},
		getEcharts(targetArr,timeArr,row){
			console.log(timeArr)
				let myChart = echarts.init(this.$refs['echarts' + row.id]);
				myChart.setOption({
				tooltip: { // 设置tip提示
					trigger: 'axis'
				},
				legend: { // 设置区分（哪条线属于什么）
				},
				xAxis: { // 设置x轴
					type: 'category',
					boundaryGap: false, // 坐标轴两边不留白
					data: timeArr,
					name: 'Date', // X轴 name
					nameTextStyle: { // 坐标轴名称的文字样式
						fontSize: 12,
						padding: [0, 0, 0, -10]
					}
				},
				yAxis: {
					name: 'Target',
					nameTextStyle: {
						fontSize: 12,
						padding: [0, 0, 10, 0]
					},
					type: 'value'
				},
				series: [{ name: 'Target', data: targetArr, type: 'line' }]
			});
				// window.addEventListener("resize", () => {
				// 	myChart.resize();
				// });
		},
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
        //this.tablePage()
      }

    }
    
</script>
<style>
    .homeWrap {
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
		overflow: unset !important;
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