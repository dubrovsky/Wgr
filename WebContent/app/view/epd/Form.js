Ext.define('TK.view.epd.Form', {
    extend: 'TK.view.DocsForm',
    alias: 'widget.epd',
    layout:'anchor',
    bodyStyle:'padding:5px 5px 0',
    fieldDefaults: {labelWidth: 150},
    defaults:{anchor: '90%'},
    buildItems:function(config) {
        config.items = [
            {xtype:'hidden', name:'smgs.hid', itemId:'smgs.hid'},
            {xtype:'hidden', name:'task', itemId:'task'},
            {xtype:'hidden', name:'status', itemId:'status'},
            {xtype:'hidden', name:'smgs.type', itemId:'smgs.type', value:'0'},
            {xtype:'hidden', name:'smgs.route.hid', itemId:'smgs.route.hid'},
            {xtype:'hidden', name:'smgs.packDoc.hid', itemId:'smgs.packDoc.hid'},
            {xtype:'hidden', name:'smgs.tbcStatus', itemId:'smgs.tbcStatus'},
            {xtype:'hidden', name:'smgs.docType1', itemId:'smgs.docType1', value:0},
            /*{xtype:'hidden', name:'smgs.status', itemId:'smgs.status'},
            {xtype:'hidden', name:'search.docType', itemId:'search.docType', value:'epd'},*/

            {xtype:'trigger', fieldLabel:this.labelSenderName,name:"smgs.g1r", itemId:'smgs.g1r',triggerCls:'dir', maxLength:512},
            {xtype:'textarea',  fieldLabel:this.labelSenderAdress,name: 'smgs.g19r', itemId:'smgs.g19r', maxLength:250},
            {xtype:'trigger', fieldLabel:this.labelReceiverName,name:"smgs.g4r", itemId:'smgs.g4r',triggerCls:'dir', maxLength:512},
            {xtype:'textarea',  fieldLabel:this.labelReceiverAdress,name: 'smgs.g49r', itemId:'smgs.g49r', maxLength:250},
            {xtype:'trigger', fieldLabel:this.labelStnSenderName, name:"smgs.g162r", itemId:"smgs.g162r", maxLength:80, triggerCls:'dir'},
            {xtype:'textfield', fieldLabel:this.labelStnSenderCode, name: 'smgs.g692', itemId:'smgs.g692', maxLength:6,anchor: '50%'},

            {xtype:'hidden', name:'smgs.cimSmgsCarLists[0].hid', itemId:'smgs.cimSmgsCarLists[0].hid'},
            {xtype:'hidden', name:'smgs.cimSmgsCarLists[0].sort', itemId:'smgs.cimSmgsCarLists[0].sort', value:0 },
            {xtype:'hidden', name:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].hid', itemId:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].hid'},
            {xtype:'hidden', name:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].sort', itemId:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].sort', value:0},
            {xtype:'textfield', fieldLabel:this.labelContNum, name:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].utiN',itemId:"smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].utiN", maxLength:16, anchor: '50%'},
            {xtype:'combo', fieldLabel:this.labelSize, name:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].vid', itemId:"smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].vid", maxLength:80, anchor: '25%',
                            store: ['20 Футов','40 Футов','45 Футов'], typeAhead: true, forceSelection: true, triggerAction: 'all', selectOnFocus:true}

        ];
    },
    buildDockedItems:function(config) {
        config.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: ['->']
        }];
        if(tkUser.hasPriv('CIM_SAVE')){
            config.dockedItems[0].items.push(
                '-',{
                    text: 'Сохранить',
                    iconCls: 'save',
                    action:'save'
                },'-',{
                    text: 'Сохр-ть и Выйти',
                    iconCls: 'save_close',
                    action:'save_close'
                }
            );
        }
        config.dockedItems[0].items.push('-', {
            text: 'Закрыть',
            iconCls: 'close1',
            action:'close'
        });
    },
    copyValues2MainFldsVag: function(){
        var vag = this.dataObj.cimSmgsCarLists[0],
            prefix = 'smgs.cimSmgsCarLists[0].',
            val;
        for(var prp in vag){// fields
            if(this.getComponent(prefix + prp) && (val = vag[prp])){
                this.getComponent(prefix + prp).setValue(val);
            }
        }
    },
    copyValues2MainFldsKon: function(){
        var kon = this.dataObj.cimSmgsCarLists[0] ? this.dataObj.cimSmgsCarLists[0].cimSmgsKonLists[0] : {},
            prefix = 'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].',
            val;
        for(var prp in kon){// fields
            if(this.getComponent(prefix + prp) && (val = kon[prp])){
                this.getComponent(prefix + prp).setValue(val);
            }
        }
    },
    initServiceFields: function(data){
        this.getForm().setValues(data);
    },
    initBuffers: function(){
    },
    initCollections: function(){
        this.copyValues2MainFldsVag();
        this.copyValues2MainFldsKon();
    },
    initDisplayedFields:function(){}
});