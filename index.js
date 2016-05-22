var fs = require('fs');

var getNameAndVersion = function(packagejsonfie, cb1, cb2) {

	fs.readFile(packagejsonfie, 'utf8', function(er, d) {
		if(er) {
			cb1('Error in opening package.json ' + er);
			cb2('Error in opening package.json ' + er);
		}
		else {
			try {
				var p = JSON.parse(d);
			} catch(err) {
				cb1('Error in parsing package.json '+ err);
				cb2('Error in parsing package.json '+ err);
			}
			if(p.version) {
				GLOBAL.DEVOPS_APP_VERSION = p.version;
				cb1(p.version);
			}
			else {
				cb1('Cannot find version info from package.json');
			}
			if(p.name) {
				GLOBAL.DEVOPS_APP_NAME = p.name;
				cb2(p.name + ' is running.');
			}
			else {
				cb2('Cannot find name info from package.json');
			}
		}

	});
};

module.exports = function(app, packagejsonfie) {

	packagejsonfie = packagejsonfie || './package.json';

	getNameAndVersion(
		packagejsonfie,
		function(versioninfo){
			app.use('/version', function(req, res, next) {
				res.write(versioninfo);
				res.end();
			})
		},
		function(statusinfo) {
			app.use('/status', function(req, res, next) {
				res.write(statusinfo);
				res.end();
			})
		})
};

