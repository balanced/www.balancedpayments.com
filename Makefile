
PAGES= index about help terms


JAVASCRIPT= balanced.lib.js balanced.js
CSS=

OUTPUT_DIR= output
PAGES_DIR= pages
STATIC_DIR= static

BUILD_CODE=$(shell git rev-parse --short=15 HEAD)
#$(shell date +%s)

CDN_HOST=https:\/\/d3n06lmttbcmxe.cloudfront.net


.PHONY: all clean make_dir


all: codes testing

# sets the time on the static files for use with the cdn
live: codes
	find $(OUTPUT_DIR) -type f -exec sed -i 's/\/static\//$(CDN_HOST)\/static.$(BUILD_CODE)\//g' {} \;
	mv $(OUTPUT_DIR)/static $(OUTPUT_DIR)/static.$(BUILD_CODE)


# generates the output dir
codes: make_dir $(addprefix $(OUTPUT_DIR)/, $(PAGES:=.html)) $(OUTPUT_DIR)/images
codes: $(addprefix $(OUTPUT_DIR)/static/js/, $(JAVASCRIPT))


server: all
	cd $(OUTPUT_DIR) && mongoose

clean:
	rm -rfv $(OUTPUT_DIR)
	cd static && make clean

make_dir:
	mkdir -p $(OUTPUT_DIR)/static/css
	mkdir -p $(OUTPUT_DIR)/static/js



make_static:
	cd static && make all

$(OUTPUT_DIR)/%.html: $(PAGES_DIR)/%.html
	cp $< $@

$(OUTPUT_DIR)/images: $(wildcard static/images/*)
	cp -rv static/images $(OUTPUT_DIR)/images

$(OUTPUT_DIR)/static/js/%.js: $(wildcard static/js/src/*) make_static
	cp -rv static/js/build $(OUTPUT_DIR)/static/js/

$(OUTPUT_DIR)/static/css/%.css: $(wildcard static/less/*)
	make_static
	cp -rv static/css/ $(OUTPUT_DIR)/static/css/
