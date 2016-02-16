Ext.define('TK.controller.exchange.Agreements', {
    extend: 'Ext.app.Controller',
    mixins: [
        'TK.controller.exchange.LockChecker'
    ],
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

    init: function () {
//        this.selectors = {};
//        this.selectors['tbcReady_btn'] = 'docsform button[action="tbcReady"]';
//        this.selectors['tbcNotReady_btn'] = 'docsform button[action="tbcNotReady"]';
//        this.selectors['ftsReady_btn'] = 'docsform button[action="ftsReady"]';
//        this.selectors['ftsNotReady_btn'] = 'docsform button[action="ftsNotReady"]';
//        this.selectors['iftminReady_btn'] = 'docsform button[action="iftminReady"]';
//        this.selectors['iftminNotReady_btn'] = 'docsform button[action="iftminNotReady"]';
//        this.selectors['iftminCanceled_btn'] = 'docsform button[action="iftminCanceled"]';
//        this.selectors['btlcReady_btn'] = 'docsform button[action="btlcReady"]';
//        this.selectors['btlcNotReady_btn'] = 'docsform button[action="btlcNotReady"]';
//        this.selectors['btlcCanceled_btn'] = 'docsform button[action="btlcCanceled"]';
//        this.selectors['tdgFtsReady_btn'] = 'docsform button[action="tdgFtsReady"]';
//        this.selectors['tdgFtsNotReady_btn'] = 'docsform button[action="tdgFtsNotReady"]';
//        this.selectors['tdgFtsCanceled_btn'] = 'docsform button[action="tdgFtsCanceled"]';
//        this.selectors['smgsFormStatusChanged_event'] = 'smgs';
//        this.selectors['cimSmgsFormStatusChanged_event'] = 'cimsmgs';
//
//        var listeners = {};
//        listeners[this.selectors['tbcReady_btn']] = {click: this.onTbcReady};
//        listeners[this.selectors['tbcNotReady_btn']] = {click: this.onTbcReady};
//        listeners[this.selectors['ftsReady_btn']] = {click: this.onFtsReady};
//        listeners[this.selectors['ftsNotReady_btn']] = {click: this.onFtsReady};
//        listeners[this.selectors['iftminReady_btn']] = {click: this.onIftminReady};
//        listeners[this.selectors['iftminNotReady_btn']] = {click: this.onIftminReady};
//        listeners[this.selectors['iftminCanceled_btn']] = {click: this.onIftminReady};
//        listeners[this.selectors['btlcReady_btn']] = {click: this.onBtlcReady};
//        listeners[this.selectors['btlcNotReady_btn']] = {click: this.onBtlcReady};
//        listeners[this.selectors['btlcCanceled_btn']] = {click: this.onBtlcReady};
//        listeners[this.selectors['tdgFtsReady_btn']] = {click: this.onTdgReady};
//        listeners[this.selectors['tdgFtsNotReady_btn']] = {click: this.onTdgReady};
//        listeners[this.selectors['tdgFtsCanceled_btn']] = {click: this.onTdgReady};
//        listeners[this.selectors['smgsFormStatusChanged_event']] = {smgsFormStatusChanged: this.smgsFormStatusChanged};
//        listeners[this.selectors['cimSmgsFormStatusChanged_event']] = {cimSmgsFormStatusChanged: this.cimSmgsFormStatusChanged};

        this.control({
            'docsform button[action="tbcReady"]': {
                click: this.onTbcReady
            },
            'docsform button[action="tbcNotReady"]': {
                click: this.onTbcReady
            },
            'docsform button[action="ftsReady"]': {
                click: this.onFtsReady
            },
            'docsform button[action="ftsNotReady"]': {
                click: this.onFtsReady
            },
            'docsform button[action="iftminReady"]': {
                click: this.onIftminReady
            },
            'docsform button[action="iftminNotReady"]': {
                click: this.onIftminReady
            },
            'docsform button[action="iftminCanceled"]': {
                click: this.onIftminReady
            },
            'docsform button[action="btlcReady"]': {
                click: this.onBtlcReady
            },
            'docsform button[action="btlcNotReady"]': {
                click: this.onBtlcReady
            },
            'docsform button[action="btlcCanceled"]': {
                click: this.onBtlcReady
            },
            'docsform button[action="tdgFtsReady"]': {
                click: this.onTdgReady
            },
            'docsform button[action="tdgFtsNotReady"]': {
                click: this.onTdgReady
            },
            'docsform button[action="tdgFtsCanceled"]': {
                click: this.onTdgReady
            },
            smgs: {
                smgsFormStatusChanged: this.smgsFormStatusChanged
            },
            smgs2: {
                smgsFormStatusChanged: this.smgsFormStatusChanged
            },
            cimsmgs: {
                cimSmgsFormStatusChanged: this.cimSmgsFormStatusChanged
            }
        });
    },
    smgsFormStatusChanged: function(smgs) {
        var form = smgs.getForm(),
            toolbar1 = smgs.dockedItems.items[0];

        if (form.findField('task').getValue() == 'copy' || form.findField('task').getValue() == 'create') {
            return;
        }

        this.tbcStatusCheck(smgs);
        this.btlcStatusCheck(smgs);
        this.iftminStatusCheck(smgs);
        this.ftsStatusCheck(smgs);
        this.tdgStatusCheck(smgs);

        var saveBtn = toolbar1.getComponent('save');

        if(saveBtn) {
            var locked = this.isStatusLocked(
                form.findField('smgs.tbcStatus').getValue(),
                form.findField('smgs.status').getValue(),
                form.findField('smgs.ftsStatus').getValue(),
                form.findField('smgs.btlc_status').getValue(),
                form.findField('smgs.tdg_status1').getValue()
            );

            if (locked) {
                toolbar1.getComponent('save').disable();
                toolbar1.getComponent('save_close').disable();
                toolbar1.getComponent('save_print2').disable();
            } else {
                toolbar1.getComponent('save').enable();
                toolbar1.getComponent('save_close').enable();
                toolbar1.getComponent('save_print2').enable();
            }

        }
    },
    cimSmgsFormStatusChanged: function(cimsmgs) {
        var form = cimsmgs.getForm(),
            toolbar1 = cimsmgs.dockedItems.items[0];

        if (form.findField('task').getValue() == 'copy' || form.findField('task').getValue() == 'create') {
            return;
        }

        this.btlcStatusCheck(cimsmgs);
        this.iftminStatusCheck(cimsmgs);
        this.ftsStatusCheck(cimsmgs);
        this.tdgStatusCheck(cimsmgs);

        var saveBtn = toolbar1.getComponent('save');

        if(saveBtn) {
            var locked = this.isStatusLocked(
                '',
                form.findField('smgs.status').getValue(),
                form.findField('smgs.ftsStatus').getValue(),
                form.findField('smgs.btlc_status').getValue(),
                form.findField('smgs.tdg_status1').getValue()
            );

            if (locked) {
                toolbar1.getComponent('save').disable();
                toolbar1.getComponent('save_close').disable();
                toolbar1.getComponent('save_print2').disable();
            } else {
                toolbar1.getComponent('save').enable();
                toolbar1.getComponent('save_close').enable();
                toolbar1.getComponent('save_print2').enable();
            }

        }
    },
    tbcStatusCheck: function(form) {    // form.down('button[action="iftminReady"]')
        var tbcReadyBtn = form.down('button[action="tbcReady"]'),
            tbcNotReadyBtn = form.down('button[action="tbcNotReady"]'),
            tbcStatus = form.getForm().findField('smgs.tbcStatus').getValue();

        switch (tbcStatus) {
            case '8':    // ready
                if(tbcReadyBtn) {
                    tbcReadyBtn.disable();
                }
                if(tbcNotReadyBtn){
                    tbcNotReadyBtn.enable();
                }
                break;
            case '9': // cancel
                if(tbcReadyBtn){
                    tbcReadyBtn.enable();
                }
                if(tbcNotReadyBtn){
                    tbcNotReadyBtn.disable();
                }
                break;
            case '1':   //send
            case '2':   // receive
            case '3':   // accepted
            case '4':   // done
                if(tbcReadyBtn){
                    tbcReadyBtn.disable();
                }
                if(tbcNotReadyBtn){
                    tbcNotReadyBtn.disable();
                }
                break;
            default:
                if(tbcReadyBtn){
                    tbcReadyBtn.enable();
                }
                if(tbcNotReadyBtn){
                    tbcNotReadyBtn.disable();
                }
                break;
        }
    },
    btlcStatusCheck: function(form) {    //   form.down('button[action="iftminReady"]')
        var btlcReadyBtn = form.down('button[action="btlcReady"]'),
            btlcNotReadyBtn = form.down('button[action="btlcNotReady"]'),
            btlcCanceledBtn = form.down('button[action="btlcCanceled"]'),
            btlcStatus = form.getForm().findField('smgs.btlc_status').getValue();

        switch (btlcStatus) {
            case '39': // ready
                if(btlcReadyBtn){
                    btlcReadyBtn.disable();
                }
                if(btlcNotReadyBtn){
                    btlcNotReadyBtn.enable();
                }
                if(btlcCanceledBtn){
                    btlcCanceledBtn.disable();
                }

                break;
            case '40': // cancel
            case '42':
            case '43':    // cancelED by receiver
                if(btlcReadyBtn){
                    btlcReadyBtn.enable();
                }
                if(btlcNotReadyBtn){
                    btlcNotReadyBtn.disable();
                }
                if(btlcCanceledBtn){
                    btlcCanceledBtn.disable();
                }

                break;
            case '41':    // send
                if(btlcReadyBtn){
                    btlcReadyBtn.disable();
                }
                if(btlcNotReadyBtn){
                    btlcNotReadyBtn.disable();
                }
                if(btlcCanceledBtn){
                    btlcCanceledBtn.enable();
                }

                break;
            default:
                if(btlcReadyBtn){
                    btlcReadyBtn.enable();
                }
                if(btlcNotReadyBtn){
                    btlcNotReadyBtn.disable();
                }
                if(btlcCanceledBtn){
                    btlcCanceledBtn.disable();
                }
                break;
        }
    },
    tdgStatusCheck: function(form) { // //   form.down('button[action="iftminReady"]')
        var tdgFtsReadyBtn = form.down('button[action="tdgFtsReady"]'),
            tdgFtsNotReadyBtn = form.down('button[action="tdgFtsNotReady"]'),
            tdgFtsCanceledBtn = form.down('button[action="tdgFtsCanceled"]'),
            tdgFtsStatus = form.getForm().findField('smgs.tdg_status1').getValue();

        switch (tdgFtsStatus) {
            case '44': // ready
                if(tdgFtsReadyBtn){
                    tdgFtsReadyBtn.disable();
                }
                if(tdgFtsNotReadyBtn){
                    tdgFtsNotReadyBtn.enable();
                }
                if(tdgFtsCanceledBtn){
                    tdgFtsCanceledBtn.disable();
                }

                break;
            case '45': // cancel
            case '47': // cancelED by receiver
            case '48': // don't accepled
                if(tdgFtsReadyBtn){
                    tdgFtsReadyBtn.enable();
                }
                if(tdgFtsNotReadyBtn){
                    tdgFtsNotReadyBtn.disable();
                }
                if(tdgFtsCanceledBtn){
                    tdgFtsCanceledBtn.disable();
                }

                break;
            case '46':    // send
                if(tdgFtsReadyBtn){
                    tdgFtsReadyBtn.disable();
                }
                if(tdgFtsNotReadyBtn){
                    tdgFtsNotReadyBtn.disable();
                }
                if(tdgFtsCanceledBtn){
                    tdgFtsCanceledBtn.enable();
                }

                break;
            default:
                if(tdgFtsReadyBtn){
                    tdgFtsReadyBtn.enable();
                }
                if(tdgFtsNotReadyBtn){
                    tdgFtsNotReadyBtn.disable();
                }
                if(tdgFtsCanceledBtn){
                    tdgFtsCanceledBtn.disable();
                }
                break;
        }
    },
    iftminStatusCheck: function(form) {
        var iftminReadyBtn = form.down('button[action="iftminReady"]'),
            iftminNotReadyBtn = form.down('button[action="iftminNotReady"]'),
            iftminCanceledBtn = form.down('button[action="iftminCanceled"]'),
            iftminStatus = form.getForm().findField('smgs.status').getValue();

        switch (iftminStatus) {
            case '22': // ready
                if(iftminReadyBtn){
                    iftminReadyBtn.disable();
                }
                if(iftminNotReadyBtn){
                    iftminNotReadyBtn.enable();
                }
                if(iftminCanceledBtn){
                    iftminCanceledBtn.disable();
                }

                break;
            case '23': // cancel
            case '38':
            case '37':    // cancelED by receiver
                if(iftminReadyBtn){
                    iftminReadyBtn.enable();
                }
                if(iftminNotReadyBtn){
                    iftminNotReadyBtn.disable();
                }
                if(iftminCanceledBtn){
                    iftminCanceledBtn.disable();
                }

                break;
            case '24':    // send
                if(iftminReadyBtn){
                    iftminReadyBtn.disable();
                }
                if(iftminNotReadyBtn){
                    iftminNotReadyBtn.disable();
                }
                if(iftminCanceledBtn){
                    iftminCanceledBtn.enable();
                }

                break;
            default:
                if(iftminReadyBtn){
                    iftminReadyBtn.enable();
                }
                if(iftminNotReadyBtn){
                    iftminNotReadyBtn.disable();
                }
                if(iftminCanceledBtn){
                    iftminCanceledBtn.disable();
                }
                break;
        }
    },
    ftsStatusCheck: function(form) {   //   form.down('button[action="iftminReady"]')
        var ftsReadyBtn = form.down('button[action="ftsReady"]'),
            ftsNotReadyBtn = form.down('button[action="ftsNotReady"]'),
            ftsStatus = form.getForm().findField('smgs.ftsStatus').getValue();

        switch (ftsStatus) {
            case '25': // ready
                if(ftsReadyBtn){
                    ftsReadyBtn.disable();
                }
                if(ftsNotReadyBtn){
                    ftsNotReadyBtn.enable();
                }

                break;
            case '26': // cancel
                if(ftsReadyBtn){
                    ftsReadyBtn.enable();
                }
                if(ftsNotReadyBtn){
                    ftsNotReadyBtn.disable();
                }

                break;
            case '27':    // send
                if(ftsReadyBtn){
                    ftsReadyBtn.disable();
                }
                if(ftsNotReadyBtn){
                    ftsNotReadyBtn.disable();
                }

                break;
            default:
                if(ftsReadyBtn){
                    ftsReadyBtn.enable();
                }
                if(ftsNotReadyBtn){
                    ftsNotReadyBtn.disable();
                }
                break;
        }
    },
    onTbcReady: function(btn){
        var formpanel = btn.up('form'),
            form = formpanel.getForm(),
            statusTbcDir = function(){
                switch(btn.itemId){
                    case 'tbcReady':
                        return 8;
                    case 'tbcNotReady':
                        return 9;
                }
            },
            statusDir = function(){
                switch(btn.itemId){
                    case 'tbcReady':
                        return 20;
                    case 'tbcNotReady':
                        return 21;
                }
            },
            paramsObj = {
                'smgs.hid':   form.findField('smgs.hid').getValue(),
                'smgs.tbcStatus': statusTbcDir(),
                'smgs.packDoc.hid':   form.findField('smgs.packDoc.hid').getValue(),
                'smgs.docType1':    form.findField('smgs.docType1').getValue(),
                'smgs.type':    form.findField('smgs.type').getValue(),
                'status': statusDir()
            };
        this.getCenter().getEl().mask(this.maskMsg);
        Ext.Ajax.request({
            url: 'Status_changeTbcStatus.do',
            params: paramsObj,
            scope:this,
            success: function (response, options) {
                form.findField('smgs.tbcStatus').setRawValue(statusTbcDir());
                formpanel.doStatus();
                this.getCenter().getEl().unmask();
            },
            failure: function (response, options) {
                this.getCenter().getEl().unmask();
                TK.Utils.makeErrMsg(response, this.errorMsg);
            }
        });
    },
    onFtsReady: function(btn){
        var formpanel = btn.up('form'),
            form = formpanel.getForm(),
            statusDir = function(){
                switch(btn.itemId){
                    case 'ftsReady':
                        return 25;
                    case 'ftsNotReady':
                        return 26;
                }
            },
            paramsObj = {
                'smgs.hid':   form.findField('smgs.hid').getValue(),
                'smgs.ftsStatus': statusDir(),
                'smgs.packDoc.hid':   form.findField('smgs.packDoc.hid').getValue(),
                'smgs.type':    form.findField('smgs.type').getValue(),
                'smgs.docType1':    form.findField('smgs.docType1').getValue(),
                'status': statusDir()
            };
        this.getCenter().getEl().mask(this.maskMsg);
        Ext.Ajax.request({
            url: 'Status_changeFtsStatus.do',
            params: paramsObj,
            scope:this,
            success: function (response, options) {
                form.findField('smgs.ftsStatus').setRawValue(statusDir());
                formpanel.doStatus();
                this.getCenter().getEl().unmask();
            },
            failure: function (response, options) {
                this.getCenter().getEl().unmask();
                TK.Utils.makeErrMsg(response, this.errorMsg);
            }
        });
    },
    onIftminReady: function(btn){
        var formpanel = btn.up('form'),
            form = formpanel.getForm(),
            statusDir = function(){
                switch(btn.itemId){
                    case 'iftminReady':
                        return 22;
                    case 'iftminNotReady':
                        return 23;
                    case 'iftminCanceled':
                        return 37;
                }
            },
            paramsObj = {
                'smgs.hid':   form.findField('smgs.hid').getValue(),
//                'smgs.status': statusDir(),
                'smgs.packDoc.hid':   form.findField('smgs.packDoc.hid').getValue(),
                'smgs.type':    form.findField('smgs.type').getValue(),
                'smgs.docType1':    form.findField('smgs.docType1').getValue(),
                'status': statusDir()
            };
        this.getCenter().getEl().mask(this.maskMsg);
        Ext.Ajax.request({
            url: 'Status_changeIftminStatus.do',
            params: paramsObj,
            scope:this,
            success: function (response, options) {
                form.findField('smgs.status').setRawValue(statusDir());
                formpanel.doStatus();
                this.getCenter().getEl().unmask();
            },
            failure: function (response, options) {
                this.getCenter().getEl().unmask();
                TK.Utils.makeErrMsg(response, this.errorMsg);
            }
        });
    },
    onBtlcReady: function(btn){
        var formpanel = btn.up('form'),
            form = formpanel.getForm(),
            statusDir = function(){
                switch(btn.itemId){
                    case 'btlcReady':
                        return 39;
                    case 'btlcNotReady':
                        return 40;
                    case 'btlcCanceled':
                        return 42;
                }
            },
            paramsObj = {
                'smgs.hid':   form.findField('smgs.hid').getValue(),
                'smgs.btlc_status': statusDir(),
                'smgs.packDoc.hid':   form.findField('smgs.packDoc.hid').getValue(),
                'smgs.type':    form.findField('smgs.type').getValue(),
                'smgs.docType1':    form.findField('smgs.docType1').getValue(),
                'status': statusDir()
            };
        this.getCenter().getEl().mask(this.maskMsg);
        Ext.Ajax.request({
            url: 'Status_changeBtlcStatus.do',
            params: paramsObj,
            scope:this,
            success: function (response, options) {
                form.findField('smgs.btlc_status').setRawValue(statusDir());
                formpanel.doStatus();
                this.getCenter().getEl().unmask();
            },
            failure: function (response, options) {
                this.getCenter().getEl().unmask();
                TK.Utils.makeErrMsg(response, this.errorMsg);
            }
        });
    },
    onTdgReady: function(btn){
        var formpanel = btn.up('form'),
            form = formpanel.getForm(),
            statusDir = function(){
                switch(btn.itemId){
                    case 'tdgFtsReady':
                        return 44;
                    case 'tdgFtsNotReady':
                        return 45;
                    case 'tdgFtsCanceled':
                        return 48;
                }
            },
            paramsObj = {
                'smgs.hid':   form.findField('smgs.hid').getValue(),
                'smgs.tdg_status1': statusDir(),
                'smgs.packDoc.hid':   form.findField('smgs.packDoc.hid').getValue(),
                'smgs.type':    form.findField('smgs.type').getValue(),
                'smgs.docType1':    form.findField('smgs.docType1').getValue(),
                'status': statusDir()
            };
        this.getCenter().getEl().mask(this.maskMsg);
        Ext.Ajax.request({
            url: 'Status_changeTdgStatus.do',
            params: paramsObj,
            scope:this,
            success: function (response, options) {
                form.findField('smgs.tdg_status1').setRawValue(statusDir());
                formpanel.doStatus();
                this.getCenter().getEl().unmask();
            },
            failure: function (response, options) {
                this.getCenter().getEl().unmask();
                TK.Utils.makeErrMsg(response, this.errorMsg);
            }
        });
    }
});
