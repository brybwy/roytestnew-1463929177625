var expect = require('chai').expect,
	v = require('../index');
var path = require('path');
describe('test \'/status\' and \'/version\'', function() {
	it('testing version', function(done) {
		var testing;
		var fakeapp = {};
		var res = {},req={},next={};
		res.write = function(str) {
			if(testing == '/version') {
				expect(str).to.contain('1.0');
				expect(GLOBAL.DEVOPS_APP_VERSION).to.contain('1.0');
				done()
			}
		};
		res.end = function(){};
		fakeapp.use = function (p1, f) {
			testing=p1;
			f(req,res,next);
		};
		v(fakeapp);
	});
	it('testing status', function(done) {
		var testing;
		var fakeapp = {};
		var res = {},req={},next={};
		res.write = function(str) {
			if(testing == '/status') {
				expect(str).to.equal('devops-version-status is running.');
				expect(GLOBAL.DEVOPS_APP_NAME).to.equal('devops-version-status');
				done();
			}
		};
		res.end = function(){};
		fakeapp.use = function (p1, f) {
			testing=p1;
			f(req,res,next);
		};
		v(fakeapp);
	});
	it('testing invalid packagejson', function(done) {
		var testing;
		var fakeapp = {};
		var res = {},req={},next={};
		res.write = function(str) {
			if(testing == '/status') {
				expect(str).to.equal('Error in opening package.json Error: ENOENT: no such file or directory, open \'./test/package.json\'');
				done();
			}
		};
		res.end = function(){};
		fakeapp.use = function (p1, f) {
			testing=p1;
			f(req,res,next);
		};
		v(fakeapp, './test/package.json');
	});
	it('testing invalid format of json', function(done) {
		var testing;
		var fakeapp = {};
		var res = {},req={},next={};
		res.write = function(str) {
			if(testing == '/status') {
				expect(str).to.equal('Error in parsing package.json SyntaxError: Unexpected token v');
				done();
			}
		};
		res.end = function(){};
		fakeapp.use = function (p1, f) {
			testing=p1;
			f(req,res,next);
		};
		v(fakeapp, './index.js');
	});
});
