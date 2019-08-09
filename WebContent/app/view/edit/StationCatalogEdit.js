/**
 * Created by Odmin on 10.06.2019.
 */
Ext.define('TK.view.edit.StationCatalogEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.stationedit',
    xtype:'stationedit',

    requires: [],

    title: this.title,
    height: 280,
    width: 500,
    modal: true,
    itemId:'stationeditid',
    layout: 'fit',
    initComponent: function() {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },

    buildConfig: function(config) {
        this.buildItems(config);
        this.buildDockedItems(config);
    },

    buildDockedItems:function (config) {
        config.dockedItems = [
            {
                dock: 'bottom',
                xtype: 'toolbar',
                items: ['->',
                    '-',
                    {text: this.btnSave,formBind: true, scope: this, action: 'save'},
                    '-',
                    {text:this.btnCancel ,action: 'close',scope: this}
                    ]
            }
        ]
    },

    buildItems: function(config) {
        var me = this;
        config.items = [
            {
                xtype:'form',
                border:false,
                itemId: 'stationForm',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                bodyPadding: 5,
                fieldDefaults: {labelWidth: 130},
                defaults: {anchor: '100%'},

                defaultType: 'textfield',
                items: [
                    {xtype: 'hidden', name: 'stUn', itemId:'stUn'},
                    {fieldLabel:this.lblStaRu,xtype: 'textfield', name: 'staName', itemId:'staName', maxLength:100},
                    {fieldLabel:this.lblStaCn,xtype: 'textfield', name: 'staNameCh', itemId:'staNameCh', maxLength:100},
                    {fieldLabel:this.lblStaEn,xtype: 'textfield', name: 'staNameEn', itemId:'staNameEn', maxLength:100},
                    {fieldLabel:this.lblStaNo,xtype: 'textfield', name: 'staNo', itemId:'staNo', maxLength:6},
                    {fieldLabel:this.lblMnamerus,xtype: 'textfield', name: 'mnamerus', itemId:'mnamerus', maxLength:100,readOnly : true},
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: this.labelCountry,
                        layout: 'hbox',
                        itemId: 'adm',
                        items: [
                            {fieldLabel:this.lblManagno,xtype: 'textfield', name: 'managno', itemId:'managno',flex: 10,readOnly : true},
                            {xtype: 'button', text: '...', action: 'adm', maxLength:32, margins: '0 0 0 5',flex: 1}
                        ]
                    },
                    {fieldLabel:this.lblCtryNam,xtype: 'textfield', name: 'countryname', itemId:'countryname', maxLength:10,readOnly : true},
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: this.labelCountry,
                        layout: 'hbox',
                        itemId: 'road',
                        items: [
                            {fieldLabel:'!Имя дороги',xtype: 'hidden', name: 'roadname', itemId:'roadname',flex: 10,readOnly : true},
                            {xtype: 'hidden', text: '...', action: 'road', maxLength:32, margins: '0 0 0 5',flex: 1},
                            {xtype: 'hidden', name: "roadun", itemId:'roadun'}
                        ]
                    },
                    {xtype: 'hidden', name: "managun", itemId:'managun'}
                ]
            }

        ]
    }
});
