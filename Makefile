client:
	@cd src/status-page-client ; \
	export NVM_DIR=$$HOME/.nvm; \
	source $$NVM_DIR/nvm.sh; \
	nvm use 16 ; \
 	npm run start
