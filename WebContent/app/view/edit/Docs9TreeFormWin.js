Ext.define('TK.view.edit.Docs9TreeFormWin', {
    extend: 'TK.view.edit.TreeFormWin',
    alias: 'widget.docs9TreeFormWin',

    requires: [
        'Ext.form.Panel'
    ],

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
    },

    buildTreeToolbarItems: function () {
        return [{
            text: this.btnDocText,
            action: 'add',
            iconCls: 'doc_new'
        }];
    }
});
