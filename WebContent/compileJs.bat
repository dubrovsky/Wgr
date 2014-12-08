sencha app build -c production

rem sencha --debug app build >111

rem   To update the bootstrap try this:
rem	sencha app refresh 

rem To enable a 'sencha app build', you will have to add the following to application_folder/.sencha/app/sencha.cfg:

rem	app.page.name=index.php
rem	app.page.file=${app.dir}/../${app.page.name}

rem 	app.page.name=Menu4.jsp
rem	app.page.file=${app.dir}/jsp/${app.page.name}

rem To use PROXY
rem cmd.jvm.args=-Xms124m -Xmx1024m -Djava.awt.headless=true -Dhttp.proxyHost=host -Dhttp.proxyPort=8080

rem The sencha upgrade feature lets you upgrade Sencha Cmd.
rem Check for new updates to Sencha Cmd
rem sencha upgrade --check

rem Upgrading Just The Sencha Cmd
rem sencha app upgrade --noframework
