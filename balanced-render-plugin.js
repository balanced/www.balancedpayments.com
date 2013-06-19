var marked = require('./node_modules/wintersmith/node_modules/marked');
var nunjuck = require('./node_modules/wintersmith-nunjucks/node_modules/nunjucks');
// use the version of markdown that wintersmith is using so that we get its configs
var fs = require('fs');

module.exports = function(env, callback) {

    function RawTemplate (template) {
	this.template = template;
	try {
	    this.fun = eval(" ( function (env, callback, require) { \n " + template + " \n }) ");
	} catch(e) {
	    console.error("Problem generating function for raw template", env.path);
	    this.fun = function (env, callback) { callback("bad template"); };
	    process.exit(1);
	}
    }

    RawTemplate.prototype.render = function (locals, callback) {
	try {
	    this.fun(locals, callback, require);
	}catch(e) {
	    console.log(e);
	    callback(e);
	}
    };

    RawTemplate.fromFile = function fromFile(filepath, callback) {
	callback(null, new RawTemplate(fs.readFileSync(filepath.full).toString()));
    };

    env.registerTemplatePlugin("**/*.raw_js", RawTemplate);


    function HelpPlugin(path, source) {
	this.path = path;
	this.source = source;
    }

    HelpPlugin.prototype.getFilename = function () {
	return this.filepath.relative;
    };

    HelpPlugin.prototype.getView = function () {
	var self = this;
	return function (env, locals, contents, templates, callback) {

	};
    };

    //env.registerContentPlugin("help", "help/**/*.md", );

    var nunjuck_env = new nunjuck.Environment();
//    console.log(nunjuck, nunjuck_env, nunjuck.filters);

    //nunjuck.filters.toJSONs = JSON.stringify;
    //nunjuck.filters.testing = function (str) {};
    nunjuck_env.addFilter('asdfasdf', function(str) {
	//console.log(str);
	return str;
    });
    //nunjuck.filters.toJSON = JSON.stringify;

    // this is a massive hack with globals etc
    //nunjuck.filters.GenHelpData =
    Balanced_GenHelpData = function (help) {
//	console.log("helps stuff", env);
	var faq = [];
	var topics = {};
	var category = {};
	var faq_id = 100;

	function look_at(files) {
	    //	  console.log(files);
	    if(!files) return;
	    if(files.filepath) {// && files.metadata.category) {
		var id = faq_id++;
		//console.log(files.metadata, files.markdown);
		faq.push({
		    title: files.metadata.title,
		    tags: files.metadata.tags,
		    id: id,
		    url: "", // TODO: make the url or something come up here
		    html: files.markdown.markdown(),
		    category: files.metadata.category
		});
		if(files.metadata.tags)
		    for(var a = 0; a < files.metadata.tags.length; a++) {
			var tag = files.metadata.tags[a];
			if(!topics[tag]) topics[tag] = [];
			topics[tag].push({
			    title: files.metadata.title,
			    id: id
			});
		    }
		if(files.metadata.category) {
		    if(!category[files.metadata.category]) category[files.metadata.category] = [];
		    category[files.metadata.category].push({
			title: files.metadata.title,
			id: id
		    });
		}
	    }
	    if(!files || files.filepath) return;
	    if(typeof files == "object")
		for(var name in files)
		    look_at(files[name]);
	}

	look_at(help);

	return { faq: faq, topics: topics, category: category };
    };



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
