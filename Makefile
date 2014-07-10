WWW_PATH=/var/lib/justice/www/


.PHONY : all clean live

clean:
	grunt clean

live:
	grunt build

live-force:
	grunt build --force

deploy:
	for host in balanced-www-01 balanced-www-02 balanced-www-03 balanced-www-04 ; do \
		echo "Uploading to $$host"; \
		time rsync --whole-file --recursive --links --devices -vzPO --no-owner --no-group --perms build/ deploy@$$host:$(WWW_PATH) ; \
	done
