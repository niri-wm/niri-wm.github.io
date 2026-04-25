build:
    #!/usr/bin/env bash
    export PATH="node_modules/.bin:$PATH"
    vite build

preview:
    vite preview

dev:
    export PATH="node_modules/.bin:$PATH"
    vite dev

bp:
    just build
    just preview

b:
    just build

p:
    just preview

d:
    just dev

install:
    npm ci

[default]
ready:
    just install
    just dev
