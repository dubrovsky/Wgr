Ext.define('TK.controller.Utils', {
    extend:'Ext.app.Controller',

    requires: [
        'Ext.util.DelayedTask',
        'Ext.util.TaskManager',
        'TK.Utils'
    ],

    refs:[{
        ref:'center',
        selector:'viewport > tabpanel'
    }],
    runProgressBar4LongOperation: function() {
        var me = this;
        me.getCenter().getEl().mask('Идет формирование файла...');
        new Ext.util.DelayedTask(function () {
            Ext.TaskManager.start({
                run: function () {
                    Ext.Ajax.request({
                        url: 'Report_checkFlagInSession.do',
                        success: function (response) {
                            var responseObj = Ext.decode(response.responseText);
                            if (responseObj['success']) {
                                me.getCenter().getEl().unmask();
                                Ext.TaskManager.destroy();
                                return false;
                            } else {
                                return true;
                            }
                        },
                        failure: function (response) {
                            me.getCenter().getEl().unmask();
                            Ext.TaskManager.destroy();
                            TK.Utils.makeErrMsg(response, this.errorMsg);
                            return false;
                        }
                    });

                },
                interval: 1000
            });
        }).delay(1000);
    }
});