<template>
    <div class="component"> 
        <div class="component-body bg-white"> 
            <form v-on:submit.prevent="updateForm()">
                <div class="modal-body"> 
            
                    <div class="form-row">  

                        <div class="col-md-12 mb-3">
                            <label for="pl_com">Appearance Setting Field</label>
                            <input type="hidden" class="form-control" id="pl_com" v-model="contact.pl_com">
                        </div><!--  /.col-md-12 mb-3 -->   
                    </div><!--  /.form-row -->  
                    
                </div><!--  /.modal-body -->

                <div v-can="'setting-appreance-edit'" class="modal-footer"> 
                    <button class="btn btn-primary" type="submit">Update</button>
                </div><!--  /.modal-footer -->
            </form>
        </div><!--  /.component-body --> 
    </div><!--  /.component -->

</template>

<script> 
export default { 
    data: function() {
        return {
            contact: {  
                mt_com: null,
                pl_com: null,   
            }, 
        }
    },
    created() { }, 
    mounted() {   
        this.$root.popupModal(); 
    },
    updated() {   
        this.$root.dropdownModal(); 
    },
    methods: { 
        updateForm() { 
            /*axios.patch('/api/v1/mt/contacts', this.contact)
            .then( resp => { 
                this.$store.commit('submitMsg', 'update');   
            })
            .catch( resp => {
                this.$store.commit('errorMessages', resp); 
            });*/
        },  
    } //methods
} //export default
</script>