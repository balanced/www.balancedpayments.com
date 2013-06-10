
PAGES= index about help terms flow


JAVASCRIPT= balanced.lib.js balanced.js
CSS=$(wildcard static/css/*.css)
ICONS=$(wildcard static/icons/*)

OUTPUT_DIR= output
PAGES_DIR= pages
STATIC_DIR= static

BUILD_CODE=$(shell git rev-parse --short=15 HEAD)-$(shell date +%s)

CDN_HOST=https:\/\/d3n06lmttbcmxe.cloudfront.net


.PHONY: all clean make_dir


all: codes

# sets the time on the static files for use with the cdn
# also a little hack to fix the issue with loading the static content from google
live: codes
	find $(OUTPUT_DIR) -type f -exec sed -i 's/https:\/\/themes.googleusercontent.com\/static/-google-static-/g' {} \;
	find $(OUTPUT_DIR) -type f -exec sed -i 's/\/images\//$(CDN_HOST)\/images\//g' {} \;
	find $(OUTPUT_DIR) -type f -exec sed -i 's/\/static\//$(CDN_HOST)\/static.$(BUILD_CODE)\//g' {} \;
	find $(OUTPUT_DIR) -type f -exec sed -i 's/-google-static-/https:\/\/themes.googleusercontent.com\/static/g' {} \;
	mv $(OUTPUT_DIR)/static $(OUTPUT_DIR)/static.$(BUILD_CODE)


# generates the output dir
codes: make_dir $(addprefix $(OUTPUT_DIR)/, $(PAGES:=.html)) $(OUTPUT_DIR)/images
codes: $(addprefix $(OUTPUT_DIR)/static/js/, $(JAVASCRIPT))
codes: $(addprefix $(OUTPUT_DIR)/static/css/, $(CSS))
codes: $(addprefix $(OUTPUT_DIR)/static/icons/, $(ICONS))
codes: $(OUTPUT_DIR)/favicon.ico


#server: all
#	cd $(OUTPUT_DIR) && mongoose need to make this deal with the .html issue on the end

clean:
	rm -rfv $(OUTPUT_DIR)
	cd static && make clean

make_dir:
	mkdir -p $(OUTPUT_DIR)/static/css
	mkdir -p $(OUTPUT_DIR)/static/js
	mkdir -p $(OUTPUT_DIR)/static/icons
	mkdir -p $(OUTPUT_DIR)/css/
	mkdir -p $(OUTPUT_DIR)/js/build



make_static:
	cd static && make all

$(OUTPUT_DIR)/%.html: $(PAGES_DIR)/%.html
	cp $< $@

$(OUTPUT_DIR)/images: $(wildcard static/images/*)
	cp -rv static/images $(OUTPUT_DIR)/images
	cp -rv static/images $(OUTPUT_DIR)/static/images

$(OUTPUT_DIR)/static/js/%.js: $(wildcard static/js/src/*) make_static
	cp -rv static/js/build/* $(OUTPUT_DIR)/static/js/
	cp -rv static/js/build/* $(OUTPUT_DIR)/js/build/

$(OUTPUT_DIR)/static/css/%.css: $(wildcard static/less/*) make_static
	cp -rv static/css/* $(OUTPUT_DIR)/static/css/
	cp -rv static/css/* $(OUTPUT_DIR)/css/

$(OUTPUT_DIR)/static/icons/%: $(wildcard static/icons/*)
	cp -rv static/icons/* $(OUTPUT_DIR)/static/icons/

$(OUTPUT_DIR)/favicon.ico: static/images/favicon.ico
	cp static/images/favicon.ico $(OUTPUT_DIR)
