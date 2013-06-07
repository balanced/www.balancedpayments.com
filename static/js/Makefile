SHELL = /bin/bash
COMPILER = ./bin/compile.js
COMPRESSOR = ./node_modules/uglify-js/bin/uglifyjs

JS_LIBRARIES = $(addprefix lib/, \
                    jquery-1.8.2.min.js \
                    jquery-ui-1.9.1.custom.min.js \
                    jquery.ui.autocomplete.html.js \
                    bootstrap-dropdown-2.0.2.js \
                    bootstrap-2.2.1.js \
                    jquery-autosave.js \
                    jquery-hotkeys.js \
                    strftime.js \
                    mustache-0.7.2.js \
                ) \

JS_SOURCES = $(addprefix src/, \
                   utils.js \
                   loading.js \
                   core.js \
                   marketplaces.js \
                   payouts.js \
                   api_keys.js \
                   transactions.js \
                   root.js \
                   help.js \
                   accounts.js \
                   users.js \
                   docs.js \
                   logs.js \
                   analytics.js \
                   search.js \
                   callbacks.js \
                 )

STATS_SOURCES = $(addprefix src/_stats/, \
                   utils.js \
                   core.js \
                 )

STATUS_SOURCES = $(addprefix src/_status/, \
                   core.js \
                 )

DOCS_SOURCES = $(addprefix src/docs/, \
                   docs.js \
                 )

all: node_modules \
    build \
    build/balanced.min.js \
    build/docs/docs.min.js \
    build/balanced.lib.min.js \
    build/irc.src.js \
    build/kyc.src.js

build:
	mkdir -p build
	mkdir -p build/_stats
	mkdir -p build/docs
	mkdir -p build/_status

build/balanced.lib.js: $(JS_LIBRARIES)
	cat $^ > $@

build/balanced.src.js: $(JS_SOURCES)
	$(COMPILER) $^ > $@

build/docs/docs.src.js: $(DOCS_SOURCES)
	cat $^ > $@

build/docs/docs.min.js: build/docs/docs.src.js
	$(COMPRESSOR) $^ > $@

build/balanced.min.js: build/balanced.src.js
	$(COMPRESSOR) $^ > $@

build/balanced.lib.min.js: build/balanced.lib.js
	$(COMPRESSOR) $^ > $@

build/kyc.src.js:
	cp src/kyc.js $@
	$(COMPRESSOR) $@ > build/kyc.min.js

build/irc.src.js:
	cp src/irc.js $@
	$(COMPRESSOR) $@ > build/irc.min.js

build/_stats/stats.src.js: $(STATS_SOURCES)
	$(COMPILER) $^ > $@
	$(COMPRESSOR) $@ > build/_stats/stats.min.js

build/_status/status.src.js: $(STATUS_SOURCES)
	$(COMPILER) $^ > $@
	$(COMPRESSOR) $@ > build/_status/status.min.js

clean:
	rm -rf build

node_modules: package.json
	npm install
	touch node_modules
