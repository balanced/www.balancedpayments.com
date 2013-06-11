var marked = require('./node_modules/wintersmith/node_modules/marked');
// use the version of markdown that wintersmith is using so that we get its configs

module.exports = function(env, callback) {
	callback();
};


String.prototype.markdown = function(no_p_tag) {
    var str = this.toString();
    if(no_p_tag === true) {
	str = "<div>"+str+"</div>"; // makes markdown not add <p>
    }
    var m = marked(str);
    //console.log(this.toString(), m);
    return m;
};
