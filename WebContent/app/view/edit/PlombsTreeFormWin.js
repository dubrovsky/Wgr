Ext.define('TK.view.edit.PlombsTreeFormWin', {
    extend: 'TK.view.edit.TreeFormWin',
    alias: 'widget.plombsTreeFormWin',

    buildMainPanel: function(){
        return [{
            xtype: 'form',
            flex: 2,
            defaults: {
                anchor: '100%'
            },
            hidden: true,
            bodyPadding: 5,

            items: this.buildFormItems()
        }];
    },

    buildFormItems: function(){
        return [];
    }
});
