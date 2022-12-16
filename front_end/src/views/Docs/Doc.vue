<template>
    <div>
        <el-container>
            <el-aside width="200px">
            <div class="docs-font">Document</div>
            </el-aside>
            <el-main>
            <el-collapse v-model="activeName" @change="handleChange">
                <el-collapse-item title="Important Notice" name="1">
                <div class = "docs-font">
                    <div>Disclaimer: Nothing in this website should be considered as financial advice.</div>
                    <div>Staking with NMR is meant to be an indicator of your confidence in your machine learning model.</div>
                    <div>Participants may lose NMR staked in tournaments. Do your own research before obtaining NMR.</div>
                </div>    
                </el-collapse-item>
                <el-collapse-item title="Function Introduction" name="2">
                <div class = "docs-font">
                    <div>The basic function of the system is divided into the following groups: account information management, manage personal profile stocks, stock prediction, and stock recommendation.</div>
                    <div>The functions of the account information management module mainly include user registration, user login, modification of personal information, etc.</div>
                    <div>The self-selection management module mainly manages the user's self-selection information. Users can add stocks as self-selected stocks according to the stock ID, and can also delete the added stocks.</div>
                    <div>The stock recommendation function is to recommend stocks according to users' preferences on risk and growth rate selection.</div>
                    <div>The function of recommending advantageous stocks is to give the top 20 stocks with the lowest risk value and the highest growth rate according to the ratio of risk and growth rate.</div>
                 </div>    
                </el-collapse-item>
                <el-collapse-item title="Data Sources" name="3">
                <div class = "docs-font">
                    <div>Our datasets are all from Numerai official website.</div>
                    <div>The free dataset is the centerpiece of the Numerai Tournament. It is constructed from thoroughly cleansed, regularized, and disguised financial data of the highest caliber.</div>
                    <el-link type="primary">https://numer.ai/tournament</el-link>
                 </div>    
                </el-collapse-item>
            </el-collapse>

            </el-main>
        </el-container>
        
    </div>
</template>

<script>
    import Header from '../../components/Header'
    export default {
        name: 'Docs',
        components: {Header},


        data() {
        return {
             activeName: ['1','2','3']


        }
        },
    methods: {
        handleChange(val) {
        console.log(val);
      }
    },

    created(){
        
    }
}
</script>
<style>
.docs-font{
    font-size: 16px;
}
</style>