Ext.define('TK.model.Log', {
    extend: 'Ext.data.Model',

    fields: [
        'eventId','userName','remoteHost','userAgent','requestURI',
        'timestamp','formattedMessage','loggerName','levelString','threadName',
        'callerFilename','callerClass','callerMethod','callerLine'
    ]
});