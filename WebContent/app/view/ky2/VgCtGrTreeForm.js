Ext.define('TK.view.ky2.VgCtGrTreeForm', {
    extend: 'TK.view.ky2.TreeForm',
    alias: 'widget.ky2vgctgrtreeform',

    requires: [
        'Ext.form.Panel',
        'Ext.tab.Panel'
    ],

    buildMainPanel: function(){
        return [{
            xtype: 'tabpanel',
            flex: 2,
            defaults: {
                xtype: 'form',
                defaults: {
                    anchor: '100%'
                },
                hidden: true,
                bodyPadding: 5
            },
            tabBar: {
                hidden: true
            },
            items:[{
                hidden: false,
                xtype: 'component'
            }].concat(this.buildTabPanelItems())
        }];
    },

    buildTabPanelItems: function(){
        return [];
    },

    buildTreePanelStore: function () {
        return 'ky2.VgCtGrTreeNodes';
    },

    buildTreeToolbarItems: function () {
        return [{
            text: this.btnVagText,
            action: 'addVag',
            iconCls: 'vag',
            hidden: false
        },{
            text: this.btnContText,
            action: 'addCont',
            iconCls: 'cont3'
        },{
            text: this.btnCargoText,
            action: 'addGryz',
            iconCls: 'gryz'
        },{
            text: this.btnDanCargoText,
            action: 'addDanGryz',
            iconCls: 'danGryz'
        }];
    }
});
