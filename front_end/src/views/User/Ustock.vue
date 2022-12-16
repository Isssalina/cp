<template>
<div class="preContainer">
    <el-table :key = "forceReload"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="StockId"
      prop="stockId">
    </el-table-column>
    <el-table-column
            label="Option">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="primary" size="small">View detial</el-button>
                <el-button @click="deleteStock(scope.row)" type="success" size="small">Delete</el-button>
            </template>
            </el-table-column>
  </el-table>
</div>

</template>

<script>
    
     import Header from '../../components/Header'
     export default {
        name: 'Ustock',
        components: {Header},
        data(){
            return{
            username:'',
            tableData: [],
            id:'',
            prediction:'',
            forceReload:0
               
            }
        },
        created(){
           
            if(this.$store.getters.getUser.username){
            this.username = this.$store.getters.getUser.username
            this.avatar = this.$store.getters.getUser.avatar  
            this.tableDatas();
        }

            // this.predics()
        },
        methods:{
            tableDatas(){
                const _this = this
                _this.$axios.get('/SelectStock',{
                    params:{
                         username:this.username
                    }
                }).then(res =>{
                    console.log(res)
                    _this.tableData = res.data.data
                });
            },
            deleteStock(row) {
                this.$confirm('Are you sure you want to delete this stock', 'Double Confirm', {
                confirmButtonText: 'Submit',
                cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
                console.log(row);
                this.id = row.id
                this.username = row.username
                console.log(this.id)
                console.log(this.username)
                const _this = this
                 _this.$axios({
                    method:'get',
                    url:'/DeleteStock',
                    params:{
                        username: this.username,
                        id: this.id
                    }
                }).then(res =>{
                    console.log(res)
                    this.$message({
                    type: 'success',
                    message: 'successfully deleted!'
                    });
                    this.forceReload += 1;
                    
                })
                 setTimeout(() => {
                 window.location.reload()}, 800);
                    
        
            
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel the operation'
          });          
        });




                // console.log(row);
                // this.id = row.id
                // this.username = row.username
                // console.log(this.id)
                // console.log(this.username)
                // const _this = this
                // _this.$axios({
                //     method:'get',
                //     url:'/DeleteStock',
                //     params:{
                //         username: this.username,
                //         id: this.id
                //     }
                // }).then(res =>{
                //     console.log(res)
                    
                // })

                // rows.splice(index, 1);
            },

            handleClick(row){
            const h = this.$createElement;
            const _this = this
            console.log(row);
            this.stockId = row.stockId
            _this.$axios({
                method:'get',
                url:'/ViewStockDetail',
                params:{
                    stockId:this.stockId
                }
            }).then(res =>{
                console.log(res)
                _this.prediction = res.data.data.prediction
                _this.target = res.data.data.target
                _this.feature_Intelligence1 = res.data.data.feature_Intelligence1
                _this.feature_Intelligence2 = res.data.data.feature_Intelligence2
                _this.feature_Intelligence3 = res.data.data.feature_Intelligence3
                _this.risk = res.data.data.risk
                _this.growth_rate = res.data.data.growth_rate
                this.$msgbox({
                title: 'Stock Detail',
                message: `Id:&nbsp;&nbsp;${row.stockId}<br/>
                Unit Net Worth:&nbsp;&nbsp;${_this.feature_Intelligence1}<br/>
                Cumulative Net Worth:&nbsp;&nbsp;${_this.feature_Intelligence2}<br/>
                Latest Scale:&nbsp;&nbsp;${_this.feature_Intelligence3}<br/>
                Target:&nbsp;&nbsp;${_this.target}<br/>
                Risk:&nbsp;&nbsp;${_this.risk}<br/>
                Growth Rate:&nbsp;&nbsp;${_this.growth_rate}<br/>`,
                // h('p', null, [
                //   h('span', null, 'prediction:'),
                //   h('i', { style: 'color: teal' }, _this.prediction),
                // ]),
                dangerouslyUseHTMLString: true,
                showCancelButton: false,
                confirmButtonText: 'OK',
                callback: action => {
          }
              });
                
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
  .preContainer{
  	  width: 80%;
  	  margin: auto;
  }
  </style>