var marked = require('./node_modules/wintersmith/node_modules/marked');
// use the version of markdown that wintersmith is using so that we get its configs

module.exports = function(env, callback) {
	callback();
};


String.prototype.markdown = function() {
    var m = marked(this.toString());
    //console.log(this.toString(), m);
    return m;
};
