Ext.define('TK.view.ky2.yard.YardCtGrWin', {
    extend: 'Ext.window.Window',
    alias:'widget.ky2yardctgrwin',
    requires: [
        'TK.view.ky2.YardCtGrTreeForm'
    ],


    autoShow: true,
    y: 0,
    modal: true,
    layout: 'fit',
    width: 600,
    height: 680,
    closable: false,

    initComponent: function () {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },

    buildConfig: function (config) {
        this.buildItems(config);
        // this.buildBottomToolbar(config);
    },


    buildItems: function(config) {
        var owner = this;
        config.items = [{
              xtype: 'ky2yardctgrtreeform'
            // buildItems: function(config) {
            //     config.items = [
            //         {
            //             xtype: 'numberfield',
            //             name : 'x',
            //             fieldLabel: /*owner.labelX*/'Позиция',
            //             minValue: 0,
            //             allowDecimals: false,
            //             afterLabelTextTpl: this.required,
            //             allowBlank: false
            //         },
            //         {
            //             xtype: 'numberfield',
            //             name : 'y',
            //             fieldLabel: /*owner.labelY*/'Ряд',
            //             minValue: 0,
            //             allowDecimals: false,
            //             afterLabelTextTpl: this.required,
            //             allowBlank: false
            //         },
            //         {
            //             xtype: 'numberfield',
            //             name : 'z',
            //             fieldLabel: /*owner.labelZ*/'Ярус',
            //             minValue: 0,
            //             allowDecimals: false,
            //             afterLabelTextTpl: this.required,
            //             allowBlank: false
            //         }
            //         ,
            //         {
            //             xtype: 'fieldcontainer',
            //             anchor: '100%',
            //             layout: {
            //                 type: 'hbox',
            //                 defaultMargins: {top: 0, right: 10, bottom: 0, left: 0}
            //             },
            //             fieldLabel: owner.labelSector,
            //             afterLabelTextTpl: this.required,
            //             items: [
            //                 {
            //                     xtype: 'combo',
            //                     itemId:'kontsectors',
            //                     store: 'ky2.YardSectors',
            //                     displayField: 'name',
            //                     valueField:'hid',
            //                     typeAhead: false,
            //                     forceSelection: true,
            //                     hideLabel: true,
            //                     // hideTrigger:true,
            //                     // minChars:2,
            //                     allowBlank: false,
            //                     name: 'sector.hid',
            //
            //                     listConfig: {
            //                         loadingText: owner.msgSearch,
            //                         emptyText: owner.msgNothingFound
            //                     }
            //                 }/*,
            //                 {
            //                     xtype: 'button',
            //                     action:'nsiYardSector',
            //                     text: '...'
            //                 }*/
            //             ]
            //         }
            //
            //         ,
            //         {
            //             xtype: 'textarea',
            //             name : 'notes',
            //             fieldLabel: owner.labelNotes
            //         }
            //     ]
            // },
            // buildBottomToolbar: function(config){
            //     config.buttons = this.buildButtons();
            // }
        }];
    },
    buildBottomToolbar: function (config) {
        config.buttons = [{
            text: this.btnClose,
            scope: this,
            iconCls:'exit',
            handler: function (btn) {
                btn.up('window').close();
            }
        }];
    }

});
