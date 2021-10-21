import Vue from 'vue'

Vue.directive('can', (el, binding, vnode) => {
    //console.log(vnode.context.user_permissions)
    var permission = document.head.querySelector('meta[name="permission"]').content; 
    var newPer = permission.split(",");
    var bindValue = null;
    var index = -1;
    //v-can="{ name: 'personal', if: false }"

    if ( typeof binding.value == 'string' ) {
        index = newPer.findIndex(t => t == binding.value);
    } else if ( Array.isArray( binding.value ) ) {
        for (let val of binding.value) {  
            if ( newPer.findIndex(t => t == val) != -1 ) { 
                index = 1; break;
            }
        } 
    } else if ( typeof binding.value == 'object' ) {
        index = newPer.findIndex(t => t == binding.value.name);  
        if ( binding.value.if == false) {
            if ( index != -1 ) { 
                index = -1;
            } else {
                index = 1;
            }
        }
    } else { // number and others
        index = newPer.findIndex(t => t == binding.value);
    } 

    if ( index == -1 ) {  
        // replace HTMLElement with comment node
        const comment = document.createComment(' ');
        Object.defineProperty(comment, 'setAttribute', {
          value: () => undefined,
        });
        vnode.elm = comment;
        vnode.text = ' ';
        vnode.isComment = true;
        vnode.context = undefined;
        vnode.tag = undefined;
        vnode.data.directives = undefined;

        if (vnode.componentInstance) {
          vnode.componentInstance.$el = comment;
        }

        if (el.parentNode) {
          el.parentNode.replaceChild(comment, el);
        }
    }
});

