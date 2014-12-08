Ext.define('TK.controller.Ajax', {
    extend: 'Ext.app.Controller',
    init: function() {
    	Ext.Ajax.on({
			requestcomplete: this.onRequestComplete,
			requestexception: this.onRequestException,
			failure: this.onFailure
		});
    },
    onRequestComplete: function(conn, res, opt){
        if(res.getResponseHeader && res.getResponseHeader('REQUIRES_AUTH') === '1'){
            delete opt.success;
            delete opt.callback;
            location.href = "j_spring_security_logout";
        }
    },
    onRequestException: function(conn, res, opt){
        if(res.getResponseHeader && res.getResponseHeader('REQUIRES_AUTH') === '1'){
            delete opt.failure;
            delete opt.callback;
            location.href = "j_spring_security_logout";
        }
    },
    /*onRequestComplete: function(conn, res, opt){
		if(res.responseText && res.responseText.indexOf('j_spring_security_check') != -1){
		    delete opt.success;
		    delete opt.callback;
		    location.href = "j_spring_security_logout";
		}
	},
	onRequestException: function(conn, res, opt){
		if(res.responseText && res.responseText.indexOf('j_spring_security_check') != -1){
		    delete opt.failure;
    		delete opt.callback;
		    location.href = "j_spring_security_logout";
		}
	},*/
	onFailure: function(response){
		var msg = response.statusText;
		if(response.responseText){
			var errors = Ext.decode(response.responseText);
			if(errors && errors.exception){
				msg += "<br/>" + errors.exception;
				if(errors.cause){
					msg += "<br/>" + errors.cause;
				}
			} else{
				msg += "<br/>" + response.responseText;
			}
		}

		Ext.Msg.show({title: this.errorMsg,msg: msg,buttons: Ext.MessageBox.OK,icon: Ext.MessageBox.ERROR});
	}
});