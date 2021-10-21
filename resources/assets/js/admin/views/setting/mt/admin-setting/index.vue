<template>
    <div class="component"> 
        <div class="component-body"> 

            <div id="accordion">
                <div class="list-group mb-2">
                    <div class="list-group-item cursor-pointer">
                       <div class="panel-heading collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" @click="getTrxData()">
                            Disable Transection
                        </div>
                    </div>

                    <div id="collapseOne" class="collapse bg-white border" aria-labelledby="headingOne" data-parent="#accordion">
                         
                        <form v-on:submit.prevent="updateTrxData()">
                            <div class="modal-body">  
                                <div class="form-row"> 
                                    <div class="col-md-12 mb-3 mr-3"> 
                                        <label for="pin-status">Totally Disable</label> 
                                        <label class="switch">
                                          <input type="checkbox" v-model="trx.trx_disable">
                                          <span class="slider round"></span>
                                        </label> 
                                    </div><!--  /.col-md-12 mb-3 --> 

                                    <div class="col-md-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="trx_disable_msg" v-model="trx.trx_disable_msg">
                                        <label for="trx_disable_msg">Disable MSG</label>
                                    </div><!--  /.col-md-12 mb-3 -->  

                                    <div class="col-md-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="trx_disable_native_msg" v-model="trx.trx_disable_native_msg">
                                        <label for="trx_disable_native_msg">Disable Native MSG</label>
                                    </div><!--  /.col-md-12 mb-3 -->  

                                </div><!--  /.form-row -->  
                            </div><!--  /.modal-body -->

                            <div v-can="'setting-profile-edit'" class="modal-footer"> 
                                <button class="btn btn-primary" type="submit">Update Disable Transection</button>
                            </div><!--  /.modal-footer -->
                        </form>
                    </div><!--  /.collapse -->  
                </div><!--  /.list-group -->  

                <div class="list-group mb-2">
                    <div class="list-group-item cursor-pointer">
                       <div class="panel-heading collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" @click="getComData()">
                            Commission For All
                        </div>
                    </div>

                    <div id="collapseTwo" class="collapse bg-white border" aria-labelledby="headingOne" data-parent="#accordion">
                        <form v-on:submit.prevent="updateComData()">
                            <div class="modal-body"> 
                            
                                <div class="form-row"> 
                            
                                    <div class="col-md-12 mb-3 mt-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="mr_com" v-model="com.mr_com">
                                        <label for="mr_com">Mobile Recharge Commission (%)</label>
                                    </div><!--  /.col-md-12 mb-3 -->  

                                    <div class="col-md-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="mr_pl_com" v-model="com.mr_pl_com">
                                        <label for="mr_pl_com">Mobile Recharge Powerload Commission (%)</label>
                                    </div><!--  /.col-md-12 mb-3 -->  

                                    <div class="col-md-12 mb-3 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="mb_com" v-model="com.mb_com">
                                        <label for="mb_com">Mobile Banking Commission (%)</label>
                                    </div><!--  /.col-md-12 mb-3 -->  

                                    <div class="col-md-12 mb-5 outline-group">
                                        <input placeholder=" " type="text" class="form-control outline" id="ubp_com" v-model="com.ubp_com">
                                        <label for="ubp_com">Utility Bill Pay Commission (%)</label>
                                    </div><!--  /.col-md-12 mb-3 -->
                                </div><!--  /.form-row -->  
                                
                            </div><!--  /.modal-body -->

                            <div v-can="'setting-profile-edit'" class="modal-footer"> 
                                <button class="btn btn-primary" type="submit">Update Commission</button>
                            </div><!--  /.modal-footer -->
                        </form>
                    </div><!--  /.collapse -->  
                </div><!--  /.list-group --> 
            </div><!-- /#accordion  -->    
            
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script>    
export default {
     
    data() {
        return {    
            dateOptions: this.$store.state.dateOptions,  
            trx: {  
                for: 'trx',
                trx_disable: null,
                trx_disable_msg: null,   
                trx_disable_native_msg: null,  
            }, 
            com: {  
                for: 'com',
                mr_com: null,
                mr_pl_com: null,   
                mb_com: null,
                ubp_com: null,   
            },   
        }
    },
    created() { 
    }, 
    mounted() {   
        this.$root.popupModal(); 
        this.accordion(); 
    }, 
    methods: {  
        accordion() {
            var collapse_item = document.querySelectorAll("[data-toggle='collapse']"); 
            // When the user clicks the button, open the modal
            for (var i = 0; i < collapse_item.length; i++) {
                collapse_item[i].onclick = function(e) {
                    e.preventDefault(); 
                    let modal = document.querySelector(this.getAttribute("data-target")); 
                    
                    if (modal.classList.contains('show')) { 
                       modal.classList.remove('show');
                       return;
                    }

                    var accordions = document.querySelectorAll('.collapse.show');
                    for (var i = 0; i < accordions.length; i++) {
                      accordions[i].classList.remove('show'); 
                    }
                    modal.classList.add("show");

                    //collapse_item[i].classList.add('collapsed');
                    //this.classList.remove('collapsed'); 
                 
                }
            }
        },
        getTrxData() { 
            var app = this; 
            
            axios.post('/api/v1/mt/settings', this.trx)
                .then( resp => {   
                    for (let key in resp.data.settings) { 

                        if ( resp.data.settings[key].key == 'trx_disable') {
                            app.trx.trx_disable = parseInt( resp.data.settings[key].value ); 
                        }

                        if ( resp.data.settings[key].key == 'trx_disable_msg') {
                            app.trx.trx_disable_msg = resp.data.settings[key].value; 
                        }

                        if ( resp.data.settings[key].key == 'trx_disable_native_msg') {
                            app.trx.trx_disable_native_msg = resp.data.settings[key].value; 
                        } 
                    } 
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        },
        updateTrxData() { 
            var app = this; 
            axios.post('/api/v1/mt/settings_update', app.trx)
                .then( resp => { 
                    app.$store.commit('submitMsg', 'update');  
                    app.getTrxData(); 
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        }, 
        getComData() { 
            var app = this; 
            
            axios.post('/api/v1/mt/settings', this.com)
                .then( resp => {   
                    for (let key in resp.data.settings) { 

                        if ( resp.data.settings[key].key == 'mr_com') {
                            app.com.mr_com = resp.data.settings[key].value; 
                        }

                        if ( resp.data.settings[key].key == 'mr_pl_com') {
                            app.com.mr_pl_com = resp.data.settings[key].value; 
                        }

                        if ( resp.data.settings[key].key == 'mb_com') {
                            app.com.mb_com = resp.data.settings[key].value; 
                        }

                        if ( resp.data.settings[key].key == 'ubp_com') {
                            app.com.ubp_com = resp.data.settings[key].value; 
                        }
                    } 
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        },
        updateComData() { 
            var app = this; 
            axios.post('/api/v1/mt/settings_update', app.com)
                .then( resp => { 
                    app.$store.commit('submitMsg', 'update');  
                    app.getComData(); 
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                });
        }, 
    }, //methods 
} //export default
</script>

 