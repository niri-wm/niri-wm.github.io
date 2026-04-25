build:
    #!/usr/bin/env bash
    rm -r ./static/vendor/
    mkdir -p ./static/vendor
    cp -r ./node_modules/svelte/src  ./static/vendor/svelte
    cp -r ./node_modules/esm-env/    ./static/vendor/esm-env/
    # add node_modules/.bin to PATH for the following command
    export PATH="node_modules/.bin:$PATH"
    vite build -c islands.vite.config.js
    vite build -c vite.config.js

preview:
    vite preview

bp:
    just build
    just preview

b:
    just build

p:
    just preview
