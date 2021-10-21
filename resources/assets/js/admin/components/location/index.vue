<template>
    <div class="form-row">   

        <div class="col-12 mb-3"> 
            <label class="o-s-l">{{ $t("country") }}</label> 
            <multiselect :allow-empty="false" deselect-label="" select-label="" v-model="country_id" :options="countries" :preserve-search="true" label="name" @search-change="searchCountry" :loading="country_is_loading" track-by="name" :preselect-first="false">
                <template slot="tag" slot-scope="props">
                    <span>{{ props.option.name }}</span>
                    <span @click="props.remove(props.option)">x</span> 
                </template>
            </multiselect>  
        </div><!--  /.col-12 --> 

        <div class="col-12 outline-group mb-3">
            <input placeholder=" " type="text" class="form-control outline" :id="'address-'+id" v-model="address" v-on:keyup="addressChange()">
            <label :for="'address-'+id">{{ $t("location") }}</label>
            <div class="address-suggestion mt-2">    
                <ul class="list-group">
                    <li class="list-group-item cursor-pointer" v-for="address, index in address_suggestion" @click="selectAddress(address )"> 
                        <span v-for="value in address.name">{{value}}</span>
                    </li> 
                </ul>
            </div><!--  /.address-suggestion -->

            <p class="text-info address-warning" v-if="address_warning.length && warning">
                Please Select <span v-for="address in address_warning">{{address.name}}</span>
            </p>
            <p v-else></p>
            <div class="form-row">
                <template v-for="address in address_warning">
                    <div class="col-12 mb-3"> 
                        <label class="o-s-l">{{address.name}}</label> 
                        <multiselect deselect-label="" :custom-label="addressLabel" select-label="" v-model="address.stage" :options="address.location" :loading="address.is_loading" :preserve-search="true" label="name" track-by="name" :preselect-first="false" @input="locationChanged(address.stageConst, address.stage )">
                            <template slot="tag" slot-scope="props">
                                <span>{{ props.option.name }}</span>
                                <span @click="props.remove(props.option)">x</span> 
                            </template>
                        </multiselect>  
                    </div><!--  /.col-12 --> 
                </template>
            </div><!--  /.form-row -->
        </div><!--  /.col-12 mb-3 -->   
    </div><!--  /.form-row --> 
</template>

<script>   
export default { 
    props: {
        location_id: {
            type: Number,
            default: null
        },
        warning: {
            type: Boolean,
            default: true
        }
    }, 
    data() {
        return {   
            id: null, 
            get_address: null,   
            address: null,   
            address_id: null,   
            country_id: { id: 19, name: 'Bangladesh' },
            country_is_loading: false,
            countries: [],
            country_stages: [],
            address_suggestion: [], 
            address_warning: [],  
        }
    },
    watch: { },
    created() {
        this.getLocation();  
    }, 
    mounted () {
        this.id = this._uid
    },
    mounted() {   
        this.$root.popupModal(); 
    },
    updated() {   
        this.$root.dropdownModal(); 
    },
    methods: {    
        getParentAddress( object) {   
            if (object.name) {
                this.get_address.name.push(object.name);
            } else {
               this.get_address.name.push(object.native_name); 
            } 

            /* Last value is coutnry id override */
            this.get_address.country_id = object; 

            if ( object.parent != null ) { 
                this.getParentAddress( object.parent);
            }  
        },
        addressLabel({ name = '', native_name = '' }) { 
            if ( name ) {
                return name; 
            } else {
                return native_name; 
            }
        },
        getAddress() {
            var app = this; 
            if ( app.location_id ) {
                axios.get('/api/v1/geo/locations?location_id='+ app.location_id  )
                    .then( resp => { 
                        if ( resp.data ) {
                            var address = resp.data;
                            
                            app.get_address = [];

                            app.get_address = { location: null, country_id: null, name: [] };
                            app.get_address.country_id = address;
                            app.get_address.location = { id: address.id, stage_id: address.stage_id };

                            if ( address.name ) {
                                app.get_address.name.push( address.name );
                            } else {
                                app.get_address.name.push( address.native_name );
                            } 

                            if ( address.parent != null ) {
                                app.getParentAddress( address.parent)
                            }  

                            app.address = app.get_address.name.join(', '); 
                            app.address_id = app.get_address.location.id;  

                            var stage_id = app.get_address.location.stage_id;
                            
                            app.country_id = app.get_address.country_id;   

                            axios.get('/api/v1/geo/locations?country=stage&country_id='+ app.get_address.country_id.id + '&parent_id='+ app.get_address.location.id + '&stage_id='+ stage_id )
                                .then( resp => {
                                    var country_stages = resp.data.country_stages; 
                                    if ( country_stages.length ) {
                                        app.address_warning = [];
                                        for ( let key in country_stages ) {  

                                            if ( country_stages[key].stage > stage_id ) {
                                                app.address_warning.push( { id: country_stages[key].id, name: country_stages[key].name, stage: country_stages[key].stage, stageConst: country_stages[key].stage, location: resp.data.suggestion_location, is_loading: false } );  
                                            } else {
                                                app.address_warning.push( { id: country_stages[key].id, name: country_stages[key].name, stage: country_stages[key].stage, stageConst: country_stages[key].stage, location: [], is_loading: false } );  
                                            }
                                        }
                                    }
                                    
                                }) 
                        } 
                    })
            }
             
        },
        getLocation() { 
            var app = this; 
            
            setTimeout( function() { 
                app.getAddress(); 
            }, 1000);  
        }, 
        get_location_id() { 
            var app = this;
          
            var loc_id = null;
 
            if ( app.address_warning.length ) {
                var main_address = app.address_warning.slice(0); 
                var address = main_address.reverse(); 
                for ( let key in address ) { 
                    if ( typeof( address[key].stage ) === 'object' ) { 
                        loc_id = address[key].stage.id;
                        break;
                    }
                } 

                if ( !loc_id ) {
                    loc_id = app.address_id;
                
                }
            } else {
                loc_id = app.address_id;
            } 
            
            //this.$emit('selected-location', loc_id);
            this.$emit('input', loc_id)
             
        }, 
        searchCountry( query ) {  
            var app = this;
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => { 
                if ( query.length < 4 ) return;
                app.country_is_loading = true;
                axios.get('/api/v1/geo/locations?address=' + query + '&country=only' )
                    .then( resp => {   
                        app.countries = resp.data;   
                        app.country_is_loading = false;                       
                    })
                    .catch( resp => {
                        this.$store.commit('errorMessages', resp); 
                    }); 
            }, 600); 
        }, 
        selectAddress( address ) {  
            var app = this; 
            app.address = address.name.join(', ');
            app.address_suggestion = [];

            app.address_warning = [];
            for ( let key in app.country_stages ) { 
                if ( address.location.stage_id < app.country_stages[key].stage ) { 
                    app.address_warning.push( { id: app.country_stages[key].id, name: app.country_stages[key].name, stage: app.country_stages[key].stage, stageConst: app.country_stages[key].stage, location: [], is_loading: false } );  
                } 
            }

            var country_id = app.country_id.id;
            var parent_id = address.location.id;

            app.address_id = parent_id;  

            this.get_location_id();

            axios.get('/api/v1/geo/locations?country_id='+ country_id + '&parent_id='+parent_id)
                .then( resp => {
                    var child_stage_id = address.location.stage_id + 1;
                    for ( let key in app.address_warning ) { 
                        if ( app.address_warning[key].stage == child_stage_id ) {
                            app.address_warning[key].location = resp.data;
                            break;
                        }
                    }

                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                }); 
        },
        parentAddress( object, key) {   
            if ( object.name ) {
                this.address_suggestion[key].name.push(object.name);
            } else {
                this.address_suggestion[key].name.push(object.native_name);
            } 

            if ( object.parent != null ) { 
                this.parentAddress( object.parent, key);
            }  
        },
        locationChanged( stage, value) {
            var app = this; 
            var country_id = app.country_id.id;
            var parent_id = value.id; 
            var child_stage_id = stage + 1; 

            for ( let key in app.address_warning ) { 
                if ( app.address_warning[key].stage == child_stage_id ) {
                    app.address_warning[key].is_loading = true;
                    break;
                }
            }
            
            this.get_location_id();

            axios.get('/api/v1/geo/locations?country_id='+ country_id + '&parent_id='+parent_id)
                .then( resp => {
                    for ( let key in app.address_warning ) { 
                        if ( app.address_warning[key].stage == child_stage_id ) {
                            app.address_warning[key].location = resp.data;
                            app.address_warning[key].is_loading = false;
                            break;
                        }
                    } 
                })
                .catch( resp => {
                    app.$store.commit('errorMessages', resp); 
                }); 
        },
        addressChange() {
            var app = this;
            var address = app.address;

            /* Suggest contact number */
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }

            this.timer = setTimeout(() => { 
                if ( address.length < 4 ) { 
                    app.address_suggestion = [];
                    return;
                }
                var country_id = app.country_id.id;

                axios.get('/api/v1/geo/locations?address=' + address + '&country_id=' + country_id )
                    .then( resp => {   
                        var location = resp.data.suggestion_location;
                        app.country_stages = resp.data.country_stages;
                        app.address_suggestion = [];
                        app.address_warning = [];

                        for (let key in location) {  
                            app.address_suggestion[key] = { location: null, name: [] };
                            app.address_suggestion[key].location = { id: location[key].id, stage_id: location[key].stage_id };

                            if ( location[key].name ) {
                                app.address_suggestion[key].name.push( location[key].name );
                            } else {
                                app.address_suggestion[key].name.push( location[key].native_name );
                            }                              

                            if ( location[key].parent != null ) {
                                app.parentAddress( location[key].parent, key)
                            } 
                        }                         
                    })
                    .catch( resp => {
                        this.$store.commit('errorMessages', resp); 
                    }); 
            }, 600);  
        } 
    }, //methods
    i18n: { 
        messages: {
            en: { 
                country: 'Country', 
                location: 'Location',
            },
            bn: { 
                country: 'দেশ',
                location: 'স্থান',
            },  
        }
    },
} //export default
</script>

<style lang="scss" scoped> 
    .address-suggestion ul li span:not(:first-child):before, .address-warning span:not(:first-child):before {
        padding-right: 5px !important;
        content: ", ";
    }
    .address-suggestion ul li span:last-child:after, .address-warning span:last-child:after { 
        content: ".";
    }
</style>