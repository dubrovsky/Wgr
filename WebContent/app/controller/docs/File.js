Ext.define('TK.controller.docs.File', {
    extend: 'Ext.app.Controller',

    requires: [
        'TK.Utils'
    ],

    views: ['file.List','file.Form'],
    stores: ['FileInfs','Files'],
    models: ['FileInf','File'],
    refs: [
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        },
        {
            ref: 'menutree',
            selector: 'viewport > menutree'
        }
    ],
    init: function() {
        this.control({
            'viewport > tabpanel > panel > form button[action="saveFile"]': {
                click: this.onSaveFile
            },
            'viewport > tabpanel > panel > grid button[action="deleteFile"]': {
                click: this.onDeleteFile
            },
            'viewport > tabpanel > panel > grid button[action="restoreFile"]': {
                click: this.onRestoreFile
            },
            'viewport > tabpanel > panel > grid button[action="destroyFile"]': {
                click: this.onDestroyFile
            },
            'viewport > tabpanel > panel > form button[action="save"]': {
                click: this.onSaveFile
            },
            'viewport > tabpanel > panel > grid button[action="view"]': {
                click: this.onView
            },
            'viewport > tabpanel > panel > grid checkbox[action="viewDeletedFiles"]': {
                change: this.onViewDeletedFiles
            }
        });
    },
    initEvents: function(form){
    },
    onSaveFile: function(btn){
        var panel = btn.up('form');  // files
        if(panel.getForm().isValid()){
	    	panel.getForm().submit({
			    waitMsg:this.waitMsg1,
	            url: 'File_' + btn.action + '.do',
                params: {},
	            scope:this,
			    success: function(form, action) {
                    if(!form.findField('file.packDoc.hid').getValue()){
                        this.getController('Docs').setPackHids(action.result.hid['file.packDoc.hid']);
                    }
//                    panel.initServiceFields(action.result.hid);
                    panel.ownerCt.getComponent('file').initServiceFields(action.result.hid);
                    panel.ownerCt.getComponent('fileInf').initServiceFields(action.result.hid);
                    if(btn.action == 'saveFile') {
                        panel.ownerCt.getComponent('filesList').store.load();
                    }
			    },
			    failure: panel.failureAlert
			});
		} else {
    		TK.Utils.failureDataMsg();
    	}
    },
    onView: function(btn){
        var list = btn.up('grid');
    	if(TK.Utils.isRowSelected(list))
       {
            var data = list.selModel.getLastSelected().data;
            window.open('File_view.do?files.hid=' + data.hid,'_self','');
       }
    },
    onDeleteFile: function(btn){
        var list = btn.up('grid'),
	        me = this;
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        var data = list.selModel.getLastSelected().data,
            doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]),
            initObj = function(prefix, data){
                var initObj = {task:'delete'};
                initObj[prefix + '.packDoc.hid'] = data.packId;
                initObj[prefix + '.hid'] = data.hid;
                return initObj;
            };
        Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId === 'yes')
                {
                    Ext.Ajax.request({
                        url: 'File_deleteFile.do',
                        params: initObj('file', data),
                        scope: list,
                        success: function(response, options) {
                            var text = Ext.decode(response.responseText);
                            this.store.load();
                        },
                        failure: function(response){
                            TK.Utils.makeErrMsg(response, me.errorMsg);
                        }
                    });
                }
            }
        });
    },
    onDestroyFile : function(btn){
        var list = btn.up('grid'),
            me = this;
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        var data = list.selModel.getLastSelected().data,
            doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]),
            initObj = function(prefix, data){
                var initObj = {task:'destroy'};
                initObj[prefix + '.packDoc.hid'] = data.packId;
                initObj[prefix + '.hid'] = data.hid;
                return initObj;
            };
        Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId === 'yes')
                {
                    Ext.Ajax.request({
                        url: 'File_destroyFile.do',
                        params: initObj('file', data),
                        scope: list,
                        success: function(response, options) {
                            // var text = Ext.decode(response.responseText);
                            this.getStore().reload();
                        },
                        failure: function(response){
                            TK.Utils.makeErrMsg(response, me.errorMsg);
                        }
                    });
                }
            }
        });
    },
    onRestoreFile: function(btn){
        var list = btn.up('grid'),
            me = this;
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        var data = list.selModel.getLastSelected().data,
            doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]),
            initObj = function(prefix, data){
                var initObj = {task:'restore'};
                initObj[prefix + '.packDoc.hid'] = data.packId;
                initObj[prefix + '.hid'] = data.hid;
                return initObj;
            };
        Ext.Ajax.request({
            url: 'File_restoreFile.do',
            params: initObj('files', data),
            scope: list,
            success: function(response, options) {
                // var text = Ext.decode(response.responseText);
                this.getStore().reload();
            },
            failure: function(response){
                TK.Utils.makeErrMsg(response, me.errorMsg);
            }
        });
    },
    onViewDeletedFiles: function (field, newValue) {
        var grid = field.up('grid'),
            store = grid.getStore();
        store.getProxy().setExtraParam('search.deleted', newValue ? 1 : 0);
        // store.loadPage(1);
        store.loadPage(1, {
            scope: this,
            callback: function(records, operation, success) {
                if(success){
                    grid.fireEvent("prepareGridToRender", grid);
                }
            }
        });
    }
});