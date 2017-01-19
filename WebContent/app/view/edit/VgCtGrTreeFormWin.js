Ext.define('TK.view.edit.VgCtGrTreeFormWin', {
    extend: 'TK.view.edit.TreeFormWin',
    alias: 'widget.vgCtGrTreeFormWin',
    // title: this.titleVagContGruz,

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
        return 'VgCtGrTreeNodes';
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
        }];
    }
});
