Ext.define('TK.view.DocsForm', {
    extend:'Ext.form.Panel',
    alias:['widget.docsform'],
    requires: [
        'Ext.form.field.VTypes',
        'Ext.layout.container.Absolute',
        'Ext.toolbar.Fill',
        'TK.Utils'
    ],
    closable:true,
    border:false,
    layout:'absolute',
    defaultType:'textfield',

    config: {
        prefix: 'smgs',
        vagCollectionName: 'cimSmgsCarLists',
        contCollectionName: 'cimSmgsKonLists',
        gryzCollectionName: 'cimSmgsGruzs',
        danGryzCollectionName: 'cimSmgsDanGruzs',
        docs9CollectionName: 'cimSmgsDocses9',
        plombsCollectionName: 'cimSmgsPlombs'
    },

    initComponent:function () {
        this.buildVTypes();
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig:function (config) {
        this.buildItems(config);
        this.buildDockedItems(config);
    },
    buildVTypes:function(){
        Ext.apply(Ext.form.field.VTypes, {
            textNum: function (val, field) {
                return /^\d+(\.\d{1,2})?$/.test(val);
            },
            textNumText: 'Неверный формат числа',
            textNumMask: /[0-9\.]/i
        });
    },
    buildItems:function (config) {
    },
    buildDockedItems:function (config) {
        config.dockedItems = [
            {
                xtype:'toolbar',
                dock:'bottom',
                items:['->']
            }
        ];
        if (tkUser.hasPriv('CIM_SAVE')) {
            config.dockedItems[0].items.push(
                '-', {
                    text:this.btnSave,
                    iconCls:'save',
                    action:'save',
		            itemId:'save'
                }, '-', {
                    text:this.btnSaveExit,
                    iconCls:'save_close',
                    action:'save_close',
                    itemId:'save_close'
                }, '-', {
                    text:this.btnSavePrint,
                    iconCls:'save_print2',
                    action:'save_print2',
                    itemId:'save_print2'
                }, '-', {
                    text:this.btnPrintView,
                    iconCls:'view',
                    action:'printView',
                    itemId:'printView'
                }, '-', {
                    text:'Документ => ЭПД',
                    iconCls:'rewrite',
                    action:'doc2EpdRewrite',
                    itemId:'doc2EpdRewrite'
                }, '-', {
                    text:'ЭПД => Документ',
                    iconCls:'update',
                    action:'epd2DocRewrite',
                    itemId:'epd2DocRewrite'
                }
            );
        }
        config.dockedItems[0].items.push(
            '-', {
                text:this.btnClose,
                iconCls:'close1',
                action:'close'
            }
           /* , '-', {
                text:this.btnSign,
                iconCls:'signature',
                action:'signature'}*/
        );
    },
    addPrefix:function (prefix) {
        var prop, toObj = {};
        for (prop in this.dataObj) {
            toObj[prefix + '.' + prop] = this.dataObj[prop];
        }
        return toObj;
    },
    doStatus:function () {},
    initForm:function (prefix) {
	    this.suspendLayouts();
        this.initBuffers();
        this.getForm().setValues(this.addPrefix(prefix));
        this.initCollections();
        this.initDisplayedFields();
        this.doStatus();
	    this.resumeLayouts(true);
    },
    maskPanel:function (mask) {
        this.items.each(function (item) {
            if (item.isFormField || item.xtype == 'button') {
                (mask) ? item.disable() : item.enable();
            }
        }, this);
        /*this.dockedItems.get(0).items.each(function (item) {
            if (item.action) {
                (mask) ? item.disable() : item.enable();
            }
        });*/
    },
    failureAlert:function (form, action) {
        TK.Utils.makeErrMsg(action.response, 'Внимание! Ошибка обработки данных...');
        return false;
    },
    setRawValues: function(values) {
        var me = this.getForm()/*,
            v, vLen, val, field*/;

        function setVal(fieldId, val) {
            var field = me.findField(fieldId);
            if (field) {
                field.setRawValue(val);
                /*if (me.trackResetOnLoad) {
                    field.resetOriginalValue();
                }*/
            }
        }

        /*if (Ext.isArray(values)) {
            // array of objects
            vLen = values.length;

            for (v = 0; v < vLen; v++) {
                val = values[v];

                setVal(val.id, val.value);
            }
        } else {*/
            // object hash
            Ext.iterate(values, setVal);
//        }
        return this;
    },
    isGridDataValid:function(){
        return true;
    },
    dragTab:function( me, container, dragCmp, startIdx, idx, eOpts)
    {
        container.items.each(function (item, index, length) {
                if(item.getText()!=index+1)
                {
                    item.setText(index+1);
                    item.card.child('#sort').setValue(index);
                }
            });
    }

});