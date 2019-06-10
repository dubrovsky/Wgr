Ext.define('TK.view.ved.Form', {
    extend: 'TK.view.DocsForm',
    alias: 'widget.ved',
    requires: [
        'TK.view.ved.VagsList'
        // 'TK.view.edit.DetailPanel',
        // 'TK.view.edit.DetailTabPanel',
        // 'TK.view.edit.DetailGrid'
    ],

    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    buildItems:function(config) {
        config.items = [
            {xtype:'hidden', name:'ved.hid', itemId:'ved.hid'},
            {xtype:'hidden', name:'task', itemId:'task'},
            {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox'
                    // align: 'center'
                },
                defaults: {labelClsExtra: 'bold font14'},
                items: [
                    {xtype: 'textfield', fieldLabel: this.fldLblNum, name: 'ved.num', labelWidth: 150, maxLength: 20, width: 280, margin: '0 20 0 0'},
                    {xtype: 'datefield', fieldLabel: this.fldLblDate, name: 'ved.crdate', altFormats: 'd.m.Y', labelWidth: 50, width: 200, margin: '0 5 0 0'},
                    {xtype: 'textfield', fieldLabel: this.fldLblTrain, name: 'ved.train', labelWidth: 60, width: 180, maxLength: 10, margin: '0 20 0 0'},
                    {xtype: 'textfield', fieldLabel: this.fldLblTrainName, name: 'ved.trainname', labelWidth: 100, width: 330, maxLength: 20, margin: '0 10 0 0'}
                ]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaults: {labelClsExtra: 'bold font14'},
                items: [
                    {
                        xtype: 'textfield', fieldLabel: this.fldLblCarrOutName, labelWidth: 150, width: 210, name: 'ved.carroutc', itemId: 'ved.carroutc', maxLength: 10, margin: '0 5 0 0', readOnly: 'true'
                    },
                    {
                        xtype: 'trigger', triggerCls: 'dir', width: 285, name: 'ved.carroutn', itemId: 'ved.carroutn', maxLength: 100, margin: '0 5 0 0'
                    },
                    {
                        xtype: 'textfield', fieldLabel: this.fldLblCarrInName, labelWidth: 180, width: 240, name: 'ved.carrinc', itemId: 'ved.carrinc', maxLength: 10, margin: '0 5 0 0', readOnly: 'true'
                    },
                    {
                        xtype: 'trigger', triggerCls: 'dir', width: 285, name: 'ved.carrinn', itemId: 'ved.carrinn', maxLength: 100, margin: '0 5 0 0'
                    }
                ]
            }, {
                xtype: 'fieldcontainer',
                itemId: 'fieldc1',
                layout: 'hbox',
                defaults: {labelClsExtra: 'bold'},
                items: [
                    {
                        xtype: 'textfield', fieldLabel: this.fldLblRoadOut, labelWidth: 150, width: 500, name: 'ved.railoutn', itemId: 'ved.railoutn', maxLength: 100, margin: '0 5 0 0', readOnly: 'true'
                    },
                    {
                        xtype: 'textfield', fieldLabel: this.fldLblStnOut, labelWidth: 60, width: 180, name: 'ved.stnoutc', itemId: 'ved.stnoutc', maxLength: 100, margin: '0 5 0 0', readOnly: 'true'
                    },
                    {
                        xtype: 'trigger', triggerCls: 'dir', width: 345, name: 'ved.stnoutn', itemId: 'ved.stnoutn', maxLength: 100, margin: '0 5 0 0'
                    }
                ]
            }, {
                xtype: 'hidden', name: 'type', value: 1
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaults: {labelClsExtra: 'bold'},
                items: [
                    {
                        xtype: 'textfield', fieldLabel: this.fldLblRoadIn, labelWidth: 150, width: 500, name: 'ved.railinn', itemId: 'ved.railinn', maxLength: 100, margin: '0 5 0 0', readOnly: 'true'
                    },
                    {
                        xtype: 'textfield', fieldLabel: this.fldLblStnIn, labelWidth: 60, width: 180, name: 'ved.stninc', itemId: 'ved.stninc', maxLength: 100, margin: '0 5 0 0', readOnly: 'true'
                    },
                    {
                        xtype: 'trigger', triggerCls: 'dir', width: 345, name: 'ved.stninn', itemId: 'ved.stninn', maxLength: 100, margin: '0 5 0 0'
                    }
                    // {xtype:'datefield', fieldLabel:'(дата)', name:'dt', labelWidth: 50, width: 140, altFormats:'d.m.y'}
                ]
            }
            , {
                xtype:'ved-vags-list',
                itemId:'vagList4Ved',
                // inPack:true,
    //             buildStore: function(config) {
    // //                config.store = Ext.data.StoreManager.lookup(Ext.id(this.xtype)) ||  Ext.create('TK.store.Files', {storeId: Ext.id(this.xtype)});
    //             },

                buildView: function(config) {
                    config.viewConfig = {
                        stripeRows: true
                    };
                }
            }
        ];
    },

    buildDockedItems:function(config) {
        config.dockedItems = [{
            xtype:'toolbar',
            dock:'bottom',
            items:['->']
        }];
        config.dockedItems[0].items.push(
            {
                text: this.btnSave,
                iconCls: 'save',
                action: 'save',
                itemId:'save'
            }, '-', {
                text:this.btnSaveExit,
                iconCls:'save_close',
                action:'save_close',
                itemId:'save_close'
            }, '-', {
                text: this.btnClose,
                iconCls: 'close1',
                action: 'close'
            }
        );
    },


    // copyValues2MainFldsVag: function(){
    //     var vag = this.dataObj.cimSmgsCarLists[0],
    //         prefix = 'smgs.cimSmgsCarLists[0].',
    //         val;
    //     for(var prp in vag){// fields
    //         if(this.getComponent(prefix + prp) && (val = vag[prp])){
    //             this.getComponent(prefix + prp).setValue(val);
    //         }
    //     }
    // },
    // copyValues2MainFldsKon: function(){
    //     var kon = this.dataObj.cimSmgsCarLists[0] ? this.dataObj.cimSmgsCarLists[0].cimSmgsKonLists[0] : {},
    //         prefix = 'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].',
    //         val;
    //     for(var prp in kon){// fields
    //         if(this.getComponent(prefix + prp) && (val = kon[prp])){
    //             this.getComponent(prefix + prp).setValue(val);
    //         }
    //     }
    //     if(val = kon['pogrKon']){ // init radio inputs
    //         this.getForm().findField(prefix + 'pogrKon').setValue(val);
    //     }
    // },
    // copyValues2MainFldsPlat: function(){
    //     var vag = this.dataObj.cimSmgsPlatels ? this.dataObj.cimSmgsPlatels[0] : {},
    //         prefix = 'smgs.cimSmgsPlatels[0].',
    //         val;
    //     for(var prp in vag){// fields
    //         if(this.getComponent(prefix + prp) && (val = vag[prp])){
    //             this.getComponent(prefix + prp).setValue(val);
    //         }
    //     }
    // },
    initServiceFields: function(data, initGrids){
    	this.getForm().setValues(data);
        // if(initGrids){
        //     this.getComponent('plomb_panel').initServiceFields(data);
        // }
    },
    addPrefix:function (prefix) {
        var prop, toObj = {};
        for (prop in this.dataObj) {
            toObj[prefix + '.' + prop] = this.dataObj[prop];
        }
        return toObj;
    },
    initForm: function(prefix){
	    this.suspendLayouts();
        var ved = Ext.getStore('Ved').first();
        if(ved){
            this.dataObj = ved.data;
            this.getForm().setValues(this.addPrefix(prefix));
        }

        this.initCollections();
	    this.resumeLayouts(true);
    },
    initCollections: function(){
        this.getComponent('vagList4Ved').copyValues2MainFlds();
        this.getComponent('vagList4Ved').store.sort('indexNum', 'ASC');
        // this.getComponent('plomb_panel').copyValues2MainFlds();
        // this.getComponent('g3_panel').copyValues2MainFlds();
//        this.getComponent('plat_panel').copyValues2MainFlds();
    },
    prepareGridData4Save:function(){
        var data = {};
        Ext.apply(data, this.getComponent('vagList4Ved').prepareData());
        // Ext.apply(data, this.getComponent('routes').prepareData());
        return  data;
    }

//     initBuffers: function(){
// //        this.getComponent('gOtpr_panel').initBuf();
// //        this.getComponent('gPoluch_panel').initBuf();
//         this.getComponent('gruz_panel').initBuf();
//         this.getComponent('plomb_panel').initBuf();
//         this.getComponent('g3_panel').initBuf();
// //        this.getComponent('plat_panel').initBuf();
//     },
//     initDisplayedFields:function(){
// //        this.getComponent('gOtpr_panel').setDisplayedField();
// //        this.getComponent('gPoluch_panel').setDisplayedField();
//         this.getComponent('gruz_panel').setDisplayedField();
//         this.getComponent('g3_panel').setDisplayedField();
// //        this.getComponent('plat_panel').setDisplayedField();
//         this.getComponent('smgs.g24N').fireEvent('blur', this.getComponent('smgs.g24N'));
//     },
//     prepareGridData4Save:function(){
//         return this.getComponent('plomb_panel').prepareData();
//     }
});