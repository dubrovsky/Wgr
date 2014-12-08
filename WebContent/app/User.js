Ext.define('TK.User', {
    alias: 'widget.userprofile',
    constructor: function(conf/*,un, group, privs, docs*/) {
        this.un = conf.un;
        this.group = conf.group;
        if (conf.privs) {
            this.privs = conf.privs;
        }
        if (conf.docs) {
            this.docs = new Ext.util.MixedCollection(false, function(doc){
               return doc.name; // keys for collection
            });
            this.docs.addAll(conf.docs);
        }
        return this;
    },
    hasPriv: function(priv) {
        if (priv) {
            for (var i = 0; i < this.privs.length; i++) {
                if (this.privs[i] == priv) {
                    return true;
                }
            }
            return false;
        }
        else {
            return false;
        }
    },
    docsInPack: function(name, docsInRoute){
        var doc = this.docs.getByKey(name),
            result = new Ext.util.MixedCollection(false, function(doc){
                return doc.name;
            }),
            el;
        docsInRoute.each(function(item,index,len){
            el = this.docs.getByKey(item);
            if(el['groupAlias'] == doc['groupAlias']){
                result.add(el);
               /* if(el.range == 'list'){
                    var child = Ext.clone(el);
                    child.name = el.alias;
                    result.add(child);
                }*/
            }
        },this);

        return result;/*this.docs.filterBy(function(item, key){
            if(item.groupAlias == doc.groupAlias && docsInRoute.getByKey(key)){
                return true;
            } else {
                return false;
            }

        });*/
    }
});