<template>
    <div>
        <Header></Header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="Important Notice" name="1">
                    <div>Disclaimer: Nothing in this website should be considered as financial advice.</div>
                    <div>Staking with NMR is meant to be an indicator of your confidence in your machine learning model.</div>
                    <div>Participants may lose NMR staked in tournaments. Do your own research before obtaining NMR.</div>
                </el-collapse-item>
                <el-collapse-item title="Function introduction" name="2">
                    <div></div>
                    <div></div>
                </el-collapse-item>
                <el-collapse-item title="Data Sources" name="3">
                    <div></div>
                    <div></div>
                    <div></div>
                </el-collapse-item>
            </el-collapse>
            </el-main>
        </el-container>
        
    </div>
</template>

<script>
    import Header from '../../components/Header'
    export default {
        name: 'docs',
        components: {Header},


        data() {
        return {
            activeName: '1'


        }
        },
    methods: {
        
    },

    created(){
        
    }
}
</script>