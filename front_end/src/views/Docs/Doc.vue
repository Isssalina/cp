<template>
    <div>
        <el-container>
            <el-aside width="200px">Document</el-aside>
            <el-main>
            <el-collapse v-model="activeName" @change="handleChange">
                <el-collapse-item title="Important Notice" name="1">
                    <div>Disclaimer: Nothing in this website should be considered as financial advice.</div>
                    <div>Staking with NMR is meant to be an indicator of your confidence in your machine learning model.</div>
                    <div>Participants may lose NMR staked in tournaments. Do your own research before obtaining NMR.</div>
                </el-collapse-item>
                <el-collapse-item title="Function Introduction" name="2">
                    <div>The functions of the account information management module mainly include user registration, user login, modification of personal information, etc.</div>
                    <div>The self-selection management module is mainly to manage the user's self-selection information.</div>
                    <div>Personalized stock recommendations. Recommend stocks based on the user's preference for risk and growth rate options.</div>
                    <div>The system recommends stocks. According to the calculation results of the stocks, the advantageous stocks are recommended from the system.</div>
                </el-collapse-item>
                <el-collapse-item title="Data Sources" name="3">
                    <div>Our datasets are all from Numerai official website.</div>
                    <div>The free dataset is the centerpiece of the Numerai Tournament. It is constructed from thoroughly cleansed, regularized, and disguised financial data of the highest caliber.</div>
                    <el-link type="primary">https://numer.ai/tournament</el-link>
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