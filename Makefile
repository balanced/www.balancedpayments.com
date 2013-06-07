
PAGES= index about help terms


JAVASCRIPT= balanced.lib.js balanced.js
CSS=

OUTPUT_DIR= output
PAGES_DIR= pages
STATIC_DIR= static

BUILD_TIME=$(shell date +%s)


.PHONY: all clean make_dir


all: codes testing

# generates the output dir
codes: make_dir $(addprefix $(OUTPUT_DIR)/, $(PAGES:=.html)) $(OUTPUT_DIR)/images
codes: $(addprefix $(OUTPUT_DIR)/js/, $(JAVASCRIPT))


testing:


live:
	find ./ -type f -exec sed -i 's/\/static\//\static.$(BUILD_TIME)\//g' {} \;
	mv $(OUTPUT_DIR)/static $(OUTPUT_DIR)/static.$(BUILD_TIME)

server: all
	cd $(OUTPUT_DIR) && mongoose

clean:
	rm -rfv $(OUTPUT_DIR)
	cd static/js && make clean
	cd static/css && make clean

make_dir:
	mkdir -p $(OUTPUT_DIR)/static/css
	mkdir -p $(OUTPUT_DIR)/static/js



make_css:
	cd static/css && make all

make_js:
	cd static/js && make all

$(OUTPUT_DIR)/%.html: $(PAGES_DIR)/%.html
	cp $< $@

$(OUTPUT_DIR)/images: $(wildcard static/images/*)
	cp -rv static/images $(OUTPUT_DIR)/images

$(OUTPUT_DIR)/js/%.js: $(wildcard static/js/src/*) make_js
	cp -rv static/js/build $(OUTPUT_DIR)/js/
