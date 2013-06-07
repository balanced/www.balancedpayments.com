SHELL = /bin/bash
COMPILER = ./node_modules/.bin/lessc
OUTPUT_DIR = ../css/

clean:
	rm -f $(OUTPUT_DIR)base.css
	rm -f $(OUTPUT_DIR)bootstrap-2.0.css
	rm -f $(OUTPUT_DIR)pygments.css
	rm -f $(OUTPUT_DIR)docs/old.css
	rm -f $(OUTPUT_DIR)public.css
	rm -f $(OUTPUT_DIR)ie9.css
	rm -f $(OUTPUT_DIR)root4.css
	rm -f $(OUTPUT_DIR)root5.css
	rm -f $(OUTPUT_DIR)about.css
	rm -f $(OUTPUT_DIR)kyc.css
	rm -f $(OUTPUT_DIR)docs/new.css
	rm -f $(OUTPUT_DIR)help.css

all: node_modules \
    build \
	$(OUTPUT_DIR)bootstrap-2.0.css \
	$(OUTPUT_DIR)base.css \
	$(OUTPUT_DIR)pygments.css \
	$(OUTPUT_DIR)docs/old.css \
	$(OUTPUT_DIR)public.css \
	$(OUTPUT_DIR)ie9.css \
	$(OUTPUT_DIR)root3.css \
	$(OUTPUT_DIR)root4.css \
	$(OUTPUT_DIR)root5.css \
	$(OUTPUT_DIR)about.css \
	$(OUTPUT_DIR)kyc.css \
	$(OUTPUT_DIR)docs/new.css \
	$(OUTPUT_DIR)help.css

build:
	mkdir -p $(OUTPUT_DIR)
	mkdir -p $(OUTPUT_DIR)docs

$(OUTPUT_DIR)bootstrap-2.0.css: bootstrap-2.0/bootstrap-2.0.less
	pushd bootstrap-2.0 && ../$(COMPILER) -x bootstrap-2.0.less > ../$@

$(OUTPUT_DIR)base.css: base.less callbacks.less transactions.less accounts.less marketplaces.less logs.less invoices.less search.less
	$(COMPILER) -x base.less > $@

$(OUTPUT_DIR)pygments.css: pygments.less
	$(COMPILER) -x $^ > $@

$(OUTPUT_DIR)docs/old.css: docs/old.less
	$(COMPILER) -x $^ > $@

$(OUTPUT_DIR)docs/new.css: docs/new.less
	$(COMPILER) -x $^ > $@

$(OUTPUT_DIR)public.css: public.less
	$(COMPILER) -x $^ > $@

$(OUTPUT_DIR)ie9.css: ie9.less
	$(COMPILER) -x $^ > $@

$(OUTPUT_DIR)root5.css: root5.less
	$(COMPILER) -x $^ > $@

$(OUTPUT_DIR)root4.css: root4.less
	$(COMPILER) -x $^ > $@

$(OUTPUT_DIR)root3.css: root3.less
	$(COMPILER) -x $^ > $@

$(OUTPUT_DIR)about.css: about.less
	$(COMPILER) -x $^ > $@

$(OUTPUT_DIR)kyc.css: kyc.less
	$(COMPILER) -x $^ > $@
	
$(OUTPUT_DIR)help.css: help.less
	$(COMPILER) -x $^ > $@

node_modules: package.json
	npm install
	touch node_modules
