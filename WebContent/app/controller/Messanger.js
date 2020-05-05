Ext.define('TK.controller.Messanger', {
    extend: 'Ext.app.Controller',
    views: [
        'messanger.Messanger'
    ],
    stores: [
        'messanger.MessageStore',
        'messanger.MessageUserStore'
    ],
    models: [
        'messanger.MessageModel',
        'messanger.MessageUserModel'
    ],
    /*refs: [{
        ref: 'messanger',
        selector: 'messanger'
    }],*/
    messanger: undefined,
    groupsUsers: undefined,
    task: undefined,
    parentList: undefined,
    parentModel: undefined,
    extraParams: undefined,
    init: function () {
        this.listen({
            controller: {
                '*': {
                    //updateMessanger: this.onUpdateMessanger,
                    showOrUpdateMessanger: this.onShowOrUpdateMessanger,
                    menuDocItemChanged: this.clearMessenger
                }
            }
        });

        this.control({
            /*'dataview': {
                showOrUpdateMessenger: this.onShowOrUpdateMessenger
            },*/
            'ky2baselist button[action="showMessanger"]': {
                click: this.onShowMessanger
            },
            'smgs2list button[action="showMessanger"]': {
                click: this.onShowMessanger
            },
            'aviso2list button[action="showMessanger"]': {
                click: this.onShowMessanger
            },
            'cimsmgslist button[action="showMessanger"]': {
                click: this.onShowMessanger
            },
            'avisocimsmgslist button[action="showMessanger"]': {
                click: this.onShowMessanger
            },
            'filelist button[action="showMessanger"]': {
                click: this.onShowMessanger
            },
            'messanger button[action="sendMessage"]': {
                click: this.sendMessage
            },
            'messanger button[action="close"]': {
                click: this.onBtnClose
            },
            'messanger button[action="reload"]': {
                click: this.onReload
            },
            'messanger': {
                close: this.onClose
            },
            'messanger > treepanel': {
                checkchange: this.onCheckchange
            }
        });
    },
    clearMessenger: function (record, gridParams) {
        if (this.messanger) {
            if (!gridParams || !gridParams['docName'] || !gridParams['tableName']) {
                this.messanger.close();
            } else {
                this.messanger.down('dataview').getStore().removeAll();
                this.messanger.down('#usersPanel').getRootNode().removeAll();
                this.clearAll();
            }
        }
    },
    onShowMessanger: function (btn) {
        if (this.messanger) {
            return;
        }

        var parentList = btn.up('grid');
        if (!TK.Utils.isRowSelected(parentList)) {
            return false;
        }
        this.showMessanger(parentList, parentList.getSelectionModel().getLastSelected());
    },
    showMessanger: function (view, record) {
        this.messanger = Ext.widget('messanger');
        this.messanger.alignTo(Ext.getBody(), "br-br");
        this.parentList = view;
        this.extraParams = view.getStore().getProxy().extraParams;
        this.parentModel = record;
        this.task = Ext.TaskManager.start({
            run: this.loadMessanger,
            scope: this,
            interval: 1000 * 60 * 5,
            fireOnStart: true
        });
    },
    onReload: function (btn) {
        this.loadMessanger();
    },
    onShowOrUpdateMessanger: function (view, record) {
        if (this.messanger) {
            this.updateMessanger(view, record);
        } else {
            this.showMessanger(view, record);
        }
    },
    updateMessanger: function (view, record) {
        if (!this.messanger) {
            return;
        }
        this.parentList = view;
        this.extraParams = view.getStore().getProxy().extraParams;
        this.parentModel = record;
        this.loadMessanger();
    },
    loadMessanger: function () {
        if (this.parentList && this.parentModel && this.extraParams) {
            var parentModel = this.parentModel;
            var parentList = this.parentList;
            this.messanger.setLoading(true);
            Ext.Ajax.request({     // get users
                url: './unsList',
                params: {
                    GROUPS_ID: parentModel.get('trans')
                },
                scope: this,
                callback: function (options, success, response) {
                    this.messanger.setLoading(false);
                    if (success) {

                        var groups = Ext.decode(response.responseText)['rows'];
                        var usersPanel = this.messanger.down('#usersPanel');
                        var rootNode = usersPanel.getRootNode();
                        rootNode.removeAll();

                        for (var groupsIndx in groups) {
                            var group = groups[groupsIndx],
                                users = group['children'],
                                groupModel = Ext.create('TK.model.messanger.MessageUserModel', {
                                    text: group['text'],
                                    groupId: group['GROUP_ID'],
                                    who: 'group',
                                    leaf: false,
                                    expanded: true,
                                    checked: false
                                });

                            rootNode.appendChild(groupModel);

                            if (users && !Ext.Object.isEmpty(users)) {
                                for (var usersIndx in users) {
                                    var user = users[usersIndx];

                                    if (tkUser.un !== user['UN']) {
                                        groupModel.appendChild(
                                            Ext.create('TK.model.messanger.MessageUserModel', {
                                                text: user['text'],
                                                un: user['UN'],
                                                who: 'user',
                                                groupId: user['GROUP_ID'],
                                                leaf: true,
                                                checked: user['UN'] === parentModel.get('un')
                                            })
                                        );
                                    }

                                }
                            }
                        }
                        this.messanger.down('dataview').getStore().load({    // get messages
                                params: {
                                    PACK_DOC_HID: parentModel.get('packDoc.hid') || parentModel.get('packId'),
                                    DOC_NAME: this.extraParams['docName'] ? this.extraParams['docName'] : 'smgs2',
                                    DOC_HID: parentModel.get('headHid') ? parentModel.get('headHid') : parentModel.get('hid'),
                                    UN: tkUser.un
                                },
                                scope: this,
                                callback: function (records, operation, success) {
                                    if (success) {
                                        // this.messanger.down('container#messages').getEl().scroll('b', 0);
                                        var messagesDom = this.messanger.down('container#messages').getEl().dom;
                                        messagesDom.scrollTop = messagesDom.scrollHeight - messagesDom.offsetHeight;
                                        if (parentModel.get('newMessCount') > 0 && parentList.getStore()) {
                                            parentList.getStore().reload();
                                        }
                                    } else {
                                        TK.Utils.makeErrMsg(response, 'Error!..');
                                    }
                                }
                            }
                        );
                    } else {
                        TK.Utils.makeErrMsg(response, 'Error!..');
                    }
                }
            });
        }
    },
    sendMessage: function (btn) {
        var win = btn.up('window');
        var form = win.down('form').getForm();
        var usersPanel = this.messanger.down('#usersPanel');
        var checkedUsers = [];
        usersPanel.getRootNode().eachChild(function (group) {
            group.eachChild(function (user) {
                if (user.get('checked')) {
                    checkedUsers.push(user.get('un'));
                }
            });
        });

        if (form.isValid() && this.parentList && this.parentModel && this.extraParams) {
            var parentList = this.parentList;
            var parentModel = this.parentModel;
            win.setLoading(true);
            Ext.Ajax.request({
                url: './putMessage',
                params: {
                    PACK_DOC_HID: parentModel.get('packDoc.hid') || parentModel.get('packId'),
                    DOC_NAME: this.extraParams['docName'] ? this.extraParams['docName'] : 'smgs2',
                    DOC_HID: parentModel.get('headHid') ? parentModel.get('headHid') : parentModel.get('hid'),
                    UN: tkUser.un,
                    CONTENT: form.findField('message').getValue(),
                    TABLE_NAME: this.extraParams['tableName'] ? this.extraParams['tableName'] : 'CIM_SMGS',
                    UNS: checkedUsers.length > 0 ? checkedUsers.join(',') : [],
                    SEND_MAIL: this.messanger.down('#toEmail').getValue() ? 1 : 0
                },
                scope: this,
                callback: function (options, success, response) {
                    win.setLoading(false);
                    if (success) {
                        form.findField('message').setRawValue('');
                        win.down('dataview').getStore().reload();
                        if (parentList.getStore()) {
                            parentList.getStore().reload();
                        }
                        win.down('container#messages').getEl().scrollTo('top', 0);
                    } else {
                        TK.Utils.makeErrMsg(response, 'Error!..');
                    }
                }
            });
        }
    },
    onBtnClose: function (btn) {
        btn.up('window').close();
        this.onClose();
    },
    onClose: function () {
        this.messanger = undefined;
        this.clearAll();
    },
    clearAll: function () {
        // this.groupsUsers = undefined;
        Ext.TaskManager.destroy();
        this.task = undefined;
        this.parentList = undefined;
        this.extraParams = undefined;
        this.parentModel = undefined;
    },
    onCheckchange: function (node, checked) {
        if (checked) {
            if (node.get('who') === 'group') {
                node.eachChild(function (user) {
                    user.set('checked', true);
                });
            } else if (node.get('who') === 'user') {
                var group = node.parentNode,
                    totalChecked = 0;
                group.eachChild(function (user) {
                    if (user.get('checked')) {
                        totalChecked++;
                    }
                });
                if (totalChecked === group.childNodes.length) {
                    group.set('checked', true);
                }
            }
        } else {
            if (node.get('who') === 'group') {
                node.eachChild(function (user) {
                    user.set('checked', false);
                });
            } else if (node.get('who') === 'user') {
                var group = node.parentNode,
                    totalUnchecked = 0;
                group.eachChild(function (user) {
                    if (!user.get('checked')) {
                        totalUnchecked++;
                    }
                });
                if (totalUnchecked === group.childNodes.length) {
                    group.set('checked', false);
                }
            }
        }
    },
    showOrUpdateMessenger: function (record) {
        alert('aaaa');
    }
});