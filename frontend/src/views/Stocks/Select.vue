<template>
    <div>
    <Header></Header>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                    prop="id"
                    label="id"
                    width="250">
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
            label="Option">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">Add</el-button>
                <el-button @click="predic(scope.row)" type="text" size="small" >View prediction</el-button>
            </template>
            </el-table-column>
        </el-table>
        </div>
</template>

<script>
    import Header from '../../components/Header'
    import Qs from 'qs'
    export default {
        name: 'select',
        components: {Header},


        data() {
        return {
            tableData: [],
            username:'',
            stockId:'',
            prediction:''


        }
        },
        methods: {
        tablePage(){
            const _this = this
            _this.$axios.get('/Data').then(res =>{
                console.log(res)
                _this.tableData = res.data.data
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
            

        }
      },

        created(){
        
        if(this.$store.getters.getUser.username){
            this.username = this.$store.getters.getUser.username
            this.avatar = this.$store.getters.getUser.avatar
        };
        this.tablePage()
      }
    }
</script>