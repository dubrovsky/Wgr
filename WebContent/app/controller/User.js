Ext.define('TK.controller.User', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Fit',
        'Ext.window.Window',
        'TK.Utils',
        'TK.view.user.Form',
        'TK.view.user.FormGroups',
        'TK.view.user.ListGroups',
        'TK.view.user.ListPrivs'
    ],

    views:  ['user.List','user.Form','user.ListGroups','user.FormGroups','user.ListPrivs'],
    stores: ['Users','UsersGroups','UsersPrivs'],
    models: ['User','UserGroup','UserPriv'],
    refs: [
        {
            ref: 'userList',
            selector: 'viewport > tabpanel > userlist'
        },
        {
            ref: 'userForm',
            selector: 'window > user'
        },
        {
            ref: 'userListGroups',
            selector: 'userlistgroups'
        },
        {
            ref: 'userFormGroups',
            selector: 'window > usergroups'
        },
        {
            ref: 'userListPrivs',
            selector: 'window > userlistprivs'
        }
    ],
    init: function() {
        this.getUsersGroupsStore().on('load', this.onUserGroupsStoreLoad, this);
        this.getUsersPrivsStore().on('load', this.onUserPrivsStoreLoad, this);

        this.control({
            'viewport > tabpanel > userlist button[action=add]': {
                click: this.onEdit
            },
            'viewport > tabpanel > userlist button[action=edit]': {
                click: this.onEdit
            },
            'viewport > tabpanel > userlist button[action=copy]': {
                click: this.onCopy
            },
            'viewport > tabpanel > userlist': {
                itemdblclick: function(){
                    this.onEdit(Ext.create('Ext.Button', {action:'edit'}));
                }
            },
            'viewport > tabpanel > userlist button[action=refresh]': {
                click: this.onRefresh
            },
            /*'window > userlist button[action=close]': {
                click: this.onClose
            },*/
            'window > user button[action=close]': {
                click: this.onClose
            },
            'window > user button[action=save]': {
                click: this.onSave
            },
            'window > user field[name=usr.ps]': {
                keyup: this.onKeyupPS
            },
            'window > user field[name=usr.su]': {
                change: this.onCheckAdmin
            },
            'window > user button[action=group]': {
                click: this.onGroups
            },
            'window > user button[action=groups]': {
                click: this.onGroups
            },
            'window > user button[action=privs]': {
                click: this.onPrivs
            },
            'window > userlistgroups button[action=close]': {
                click: this.onClose
            },
            'userlistgroups button[action=refresh]': {
                click: this.onRefresh
            },
            'window > userlistgroups button[action=check]': {
                click: this.onCheckGroups
            },
            'userlistgroups button[action=add]': {
                click: this.onEditGroups
            },
            'userlistgroups button[action=edit]': {
                click: this.onEditGroups
            },
            'window > userlistgroups': {
                itemdblclick: function(){
                    this.onEditGroups(Ext.create('Ext.Button', {action:'edit'}));
                }
            },
            'userlistgroups': {
                render: function(list){
                    list.store.load();
                }
            },
            'window > usergroups button[action=close]': {
                click: this.onClose
            },
            'window > usergroups button[action=save]': {
                click: this.onSaveGroups
            },
            'window > userlistprivs button[action=close]': {
                click: this.onClose
            },
            'window > userlistprivs button[action=refresh]': {
                click: this.onRefresh
            },
            'window > userlistprivs button[action=check]': {
                click: this.onCheckPrivs
            }
        });
    },
    passCheck: function (val, field) {
    	var alphanum = /^[a-zA-Z0-9_-]+$/;
        if (field.initPassFld) {
            var pwd = field.ownerCt.getForm().findField(field.initPassFld);
            return (val == pwd.getValue());
        }
        return alphanum.test(val);
    },
    loginCheck: function (val, field) {
        var alphanum = /^[a-zA-Z0-9_-]+$/, panel = field.ownerCt;
        if (panel.mode != 'edit' && val) {
            var arr = this.getUserList().store.collect('usr.un');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].toLowerCase() == val.toLowerCase()) {
                    return false;
                }
            }
        }
        return alphanum.test(val);
    },
    nameGrCheck: function (val, field) {
    	var alphanum = /^[a-zA-Z0-9_]+$/, panel = field.ownerCt;
        if (panel.mode != 'edit' && val) {
            var arr = this.getUserListGroups().store.collect('usrGr.name');
            for (i = 0; i < arr.length; i++) {
                if (arr[i].toLowerCase() == val.toLowerCase()) {
                    return false;
                }
            }
        }
        return alphanum.test(val);
    },
    onCheckAdmin: function(checkbox, checked){
    	var panel = this.getUserForm();
    	if(checked){
    		panel.getComponent('groups').setDisabled(true);
    		panel.getComponent('privs').setDisabled(true);
    	} else {
    		panel.getComponent('groups').setDisabled(false);
    		panel.getComponent('privs').setDisabled(false);
    	}
    },
    onKeyupPS: function (field) {
        var form = this.getUserForm().getForm();
        var fieldCnfm = form.findField('ps_cnfm');
        if (field.getValue()) {
            if (fieldCnfm.disabled) {
                fieldCnfm.setDisabled(false);
                fieldCnfm.validate();
            }
        } else if (!fieldCnfm.disabled) {
            if (!fieldCnfm.validate()) {
                fieldCnfm.clearInvalid();
            }
            fieldCnfm.setDisabled(true);
        }
    },
    onClose: function (btn) {
        btn.up('window').close();
    },
    onRefresh: function (btn) {
        btn.up('grid').store.load();
    },
    onUserFormShow: function(win){
        var panel = this.getUserForm(), form = panel.getForm(), field = form.findField('ps_cnfm');
        field.setDisabled(true);
        if (panel.mode == 'edit') {
            field = form.findField('usr.ps');
            field.allowBlank = true;
            field.labelEl.update(panel.labelPass2);

            field = form.findField('usr.un');
            field.setDisabled(true);
            field.labelEl.update(panel.labelLogin1);

            form.loadRecord(this.getUserList().selModel.getLastSelected());
            field = form.findField('usr.groupsIds');
            if (field.getValue() && field.getValue().indexOf(',') != -1) {
                field.setValue(field.getValue().replace(/,/g, '\n'));
            }
            field = form.findField('usr.privilegsIds');
            if (field.getValue() && field.getValue().indexOf(',') != -1) {
                field.setValue(field.getValue().replace(/,/g, '\n'));
            }
        }
        if (panel.mode == 'copy') {

            form.loadRecord(this.getUserList().selModel.getLastSelected());
            field = form.findField('usr.un').reset();
            field = form.findField('usr.groupsIds');
            if (field.getValue() && field.getValue().indexOf(',') != -1) {
                field.setValue(field.getValue().replace(/,/g, '\n'));
            }
            field = form.findField('usr.privilegsIds');
            if (field.getValue() && field.getValue().indexOf(',') != -1) {
                field.setValue(field.getValue().replace(/,/g, '\n'));
            }
        }
    },
    onEdit: function (btn) {
        if (btn.action == 'edit') {
            if (!TK.Utils.isRowSelected(this.getUserList())) {
                Ext.Msg.alert(this.titleNoUser, this.msgNoUser);
                return;
            }
        }

        Ext.create('Ext.window.Window', {
//            title: 'Редактор',
            width: 430, y: 1,
            modal: true,
            layout: 'fit',
            autoShow: true,
            items: {xtype:'user', mode: btn.action},
            listeners: {show: this.onUserFormShow, scope: this}
        });
    },
    onCopy: function (btn) {
        if (btn.action == 'copy') {
            if (!TK.Utils.isRowSelected(this.getUserList())) {
                Ext.Msg.alert(this.titleNoUser, this.msgNoUser);
                return;
            }
            Ext.create('Ext.window.Window', {
//            title: 'Редактор',
                width: 430, y: 1,
                modal: true,
                layout: 'fit',
                autoShow: true,
                items: {xtype:'user', mode: btn.action},
                listeners: {show: this.onUserFormShow, scope: this}
            });
        }
    },

    onSave: function (btn) {
        var form = this.getUserForm().getForm();
        form.findField('usr.un').setDisabled(false);
        if (form.isValid()) {
            form.submit({
                waitMsg: this.waitMsg1,
                url: 'User_save.do',
                scope: this,
                success: function (form, action) {
                    this.getUsersStore().load();
                    btn.up('window').close();
                },
                failure: function (form, action) {
                    TK.Utils.makeErrMsg(action.response, 'Error...');
                }
            });
        } else {
            TK.Utils.failureDataMsg();
        }
    },
    onGroups: function (btn) {
    	if(btn.action == 'groups' && this.getUserForm().getForm().findField('usr.su').checked){
            return;
        }

        Ext.create('Ext.window.Window', {
//            title: 'Список групп',
            width: 500, height:500, y: 1,
            modal: true,
            layout: 'fit',
            autoShow: true,
            items: {xtype:'userlistgroups', ownerBtn: btn}
           // , listeners: {show: function(win){win.getComponent(0).store.load();}}
        });
    },
    onPrivs: function (btn) {
    	if(this.getUserForm().getForm().findField('usr.su').checked){
            return;
        }

        Ext.create('Ext.window.Window', {
//            title: 'Список привелегий',
            width: 500, y: 1,
            modal: true,
            layout: 'fit',
            autoShow: true,
            items: {xtype:'userlistprivs', ownerBtn: btn},
            listeners: {show: function(win){win.getComponent(0).store.load();}}
        });
    },
    onUserGroupsStoreLoad: function (store, records) {
        if(this.getUserForm()) {
            var form = this.getUserForm().getForm(),
                value,
                grid = this.getUserListGroups();

            if (grid.ownerBtn.action == 'groups') {
                var val = form.findField('usr.group.name').getValue();
                if (val) {
                    store.filterBy(function (record, id) {
                        return record.get('usrGr.name') != val ? true : false;
                    });
                }
                value = form.findField('usr.groupsIds').getValue();
            }
            else {
                value = form.findField('usr.group.name').getValue();
            }

            if (value) {
                var arr = Ext.isIE ? value.split('\r\n') : value.split('\n');

                for (var i = 0; i < arr.length; i++) {
                    var index = store.findExact('usrGr.name', arr[i]);  // replace for fucken IE
                    if (index != -1) {
                        grid.selModel.select(index, true);
                    }
                }
            }
        }
    },
    onUserPrivsStoreLoad: function (store, records) {
        var form = this.getUserForm().getForm(),
            value = form.findField('usr.privilegsIds').getValue(),
            grid = this.getUserListPrivs();
        if (value) {
	        var arr = Ext.isIE ? value.split('\r\n') : value.split('\n');
            for (var i = 0; i < arr.length; i++) {
                var index = store.findExact('usrPriv.name', arr[i]);
                if (index != -1) {
                    grid.selModel.select(index, true);
                }
            }
        }
    },
    onCheckGroups: function(btn) {
        var form = this.getUserForm().getForm(), grid = this.getUserListGroups();
        var field = form.findField(grid.ownerBtn.action == 'groups' ? 'usr.groupsIds' : 'usr.group.name');
        var datas = '';
        Ext.each(grid.selModel.getSelection(), function (record, index) {
            datas += record.data["usrGr.name"] + '\n';
        });
        field.setValue(datas.slice(0, -1));
        if(field.name == 'usr.group.name' && field.getValue()){
	    	var groups = form.findField('usr.groupsIds');
	    	if (groups.getValue()){
	    		var arr = groups.getValue().split('\n');
	    		for (var index = 0; index < arr.length; index++) {
	    			if(arr[index] == field.getValue()){
	    				arr.splice(index, 1);
	    				groups.setValue(arr.join('\n'));
	    				break;
	    			}
	    		}
	    	}
        }
        btn.up('window').close();
    },
    onCheckPrivs: function(btn) {
        var form = this.getUserForm().getForm(), grid = this.getUserListPrivs();
        var datas = '';
        Ext.each(grid.selModel.getSelection(), function (record, index) {
            datas += record.data["usrPriv.name"] + '\n';
        });
        form.findField('usr.privilegsIds').setValue(datas.slice(0, -1));
        btn.up('window').close();
    },
    onUserGrFormShow: function(win){
        var panel = this.getUserFormGroups(),
            form = panel.getForm();
        if (panel.mode == 'edit') {
            var field = form.findField('usrGr.name');
            field.setDisabled(true);
            field.labelEl.update(panel.labelName1);
            form.loadRecord(this.getUserListGroups().selModel.getLastSelected());
        }
    },
    onEditGroups: function (btn) {
        if (btn.action == 'edit' && this.getUserList()) {
            if (!TK.Utils.isRowSelected(this.getUserList())) {
                return;
            }
        }

        Ext.create('Ext.window.Window', {
//            title: 'Редактор',
            width: 430, y: 1,
            modal: true,
            layout: 'fit',
            autoShow: true,
            items: {xtype:'usergroups', mode: btn.action},
            listeners: {show: this.onUserGrFormShow, scope: this}
        });
    },
    onSaveGroups: function (btn) {
        var form = this.getUserFormGroups().getForm();
        form.findField('usrGr.name').setDisabled(false);
        if (form.isValid()) {
            form.submit({
                waitMsg: this.waitMsg1,
                url: 'User_saveGr.do',
                scope: this,
                success: function (form, action) {
                    this.getUsersGroupsStore().load();
                    btn.up('window').close();
                },
                failure: function (form, action) {
                    TK.Utils.makeErrMsg(action.response, 'Error...');
                }
            });
        } else {
            TK.Utils.failureDataMsg();
        }
    }
});