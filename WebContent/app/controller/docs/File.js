Ext.define('TK.controller.docs.File', {
    extend: 'Ext.app.Controller',

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
            'viewport > tabpanel > panel > form button[action="save"]': {
                click: this.onSaveFile
            },
            'viewport > tabpanel > panel > grid button[action="view"]': {
                click: this.onView
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
                if(buttonId == 'yes')
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
    }
});