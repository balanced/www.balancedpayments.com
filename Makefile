
PAGES=
# index about help terms flow


JAVASCRIPT= balanced.lib.js balanced.js
CSS=$(wildcard static/css/*.css)
ICONS=$(wildcard static/icons/*)

OUTPUT_DIR= output_tmp
FINAL_OUTPUT_DIR= output
PAGES_DIR= pages
STATIC_DIR= static

WINTERS= contents/static contents/images contents/help

BUILD_CODE=$(shell git rev-parse --short=15 HEAD)-$(shell date +%s)

CDN_HOST=https:\/\/d3n06lmttbcmxe.cloudfront.net

WINTERSMITH= ./node_modules/.bin/wintersmith
V=

.PHONY: all clean make_dir




all: winter

test: all
#	$(WINTERSMITH) preview

# sets the time on the static files for use with the cdn
# also a little hack to fix the issue with loading the static content from google
live: codes
	find $(FINAL_OUTPUT_DIR) -type f -exec sed -i 's/https:\/\/themes.googleusercontent.com\/static/-google-static-/g' {} \;
	find $(FINAL_OUTPUT_DIR) -type f -exec sed -i 's/\/images\//$(CDN_HOST)\/images\//g' {} \;
	find $(FINAL_OUTPUT_DIR) -type f -exec sed -i 's/\/static\//$(CDN_HOST)\/static.$(BUILD_CODE)\//g' {} \;
	find $(FINAL_OUTPUT_DIR) -type f -exec sed -i 's/-google-static-/https:\/\/themes.googleusercontent.com\/static/g' {} \;
	mv $(FINAL_OUTPUT_DIR)/static $(FINAL_OUTPUT_DIR)/static.$(BUILD_CODE)


# generates the output dir
codes: make_dir $(addprefix $(OUTPUT_DIR)/, $(PAGES:=.html)) $(OUTPUT_DIR)/images
codes: $(addprefix $(OUTPUT_DIR)/static/js/, $(JAVASCRIPT))
codes: $(addprefix $(OUTPUT_DIR)/static/css/, $(CSS))
codes: $(addprefix $(OUTPUT_DIR)/static/icons/, $(ICONS))
codes: $(OUTPUT_DIR)/favicon.ico

winter: $(WINTERS)
	cd contents && rm -f $(V) *~ **/*~ .\#* **/.\#*
	rm contents/help.json
	$(WINTERSMITH) build
	mv build/help_ctr.html contents/help.json
	$(WINTERSMITH) build
	rm -f build/robots.txt
	echo "var answers_data = " > build/auto_complete.js
	cat build/auto_complete.html >> build/auto_complete.js
	rm build/auto_complete.html
	cp -r $(V)  build $(FINAL_OUTPUT_DIR)
	rm $(FINAL_OUTPUT_DIR)/help_ctr.html


#server: all
#	cd $(OUTPUT_DIR) && mongoose need to make this deal with the .html issue on the end

clean:
	rm -rf $(V) $(OUTPUT_DIR)
	rm -rf $(V) $(FINAL_OUTPUT_DIR)
	rm -rf $(V) build
	rm -rf $(V) contents/images
	rm -rf $(V) contents/static
	rm -rf $(V) contents/help
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
	cp -r $(V) static/images $(OUTPUT_DIR)/images
	cp -r $(V) static/images $(OUTPUT_DIR)/static/images
	touch $(OUTPUT_DIR)/images/*

$(OUTPUT_DIR)/static/js/%.js: $(wildcard static/js/src/*) make_static
	cp -r $(V) static/js/build/* $(OUTPUT_DIR)/static/js/
	cp -r $(V) static/js/build/* $(OUTPUT_DIR)/js/build/
	touch $(OUTPUT_DIR)/static/js/*

$(OUTPUT_DIR)/static/css/%.css: $(wildcard static/less/*) make_static
	cp -r $(V) static/css/* $(OUTPUT_DIR)/static/css/
	cp -r $(V) static/css/* $(OUTPUT_DIR)/css/
	touch $(OUTPUT_DIR)/static/css/*

$(OUTPUT_DIR)/static/icons/%: $(wildcard static/icons/*)
	cp -r $(V) static/icons/* $(OUTPUT_DIR)/static/icons/
	touch $(OUTPUT_DIR)/static/icons/*

$(OUTPUT_DIR)/favicon.ico: static/images/favicon.ico
	cp static/images/favicon.ico $(OUTPUT_DIR)



contents/static: codes
	mkdir -p contents/static
	cp -r $(V) $(OUTPUT_DIR)/static/* contents/static
	touch contents/static

contents/images: codes
	mkdir -p contents/images
	cp -r $(V) $(OUTPUT_DIR)/images/* contents/images
	touch contents/images

contents/help:
	#./update_submodules.sh
	mkdir -p contents/help
	cp -r $(V) data/balanced-docs/faq/* contents/help
	touch contents/help
