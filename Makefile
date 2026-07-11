.PHONY: install dev run build preview deploy

PNPM ?= pnpm
PORT ?= 8443

install:
	$(PNPM) install

dev:
	$(PNPM) dev

build:
	$(PNPM) build

preview:
	PORT=$(PORT) $(PNPM) preview

run: build preview

deploy:
	$(PNPM) exec vercel --prod
