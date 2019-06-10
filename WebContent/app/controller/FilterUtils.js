Ext.define('TK.controller.FilterUtils', {
    extend:'Ext.app.Controller',

    refs:[{
        ref:'center',
        selector:'viewport > tabpanel'
    }],
    applyFilter: function(form, store){
        if (form.isValid()) {
            var values = form.getValues(),
                filters = [];

            store.currentPage = 1;
            store.clearFilter(true);
            Ext.Object.each(values,function(key, value, myself) {
                if(value){
                    filters.push({id:key,  property: key, value: value});
                }
            });

            if(filters.length > 0){
                store.filter(filters);
            } else {
                store.load(); // clear all filters
            }
        }
    },
    initFilter: function(form, store){
        if(store.filters && store.filters.getCount() > 0) {
            store.filters.each(function(filter){
                form.findField(filter.property).setValue(filter.value);
            });
        }
    }
});