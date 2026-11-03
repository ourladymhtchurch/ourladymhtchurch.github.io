#!/bin/bash
# Double-click this file to preview the website on your Mac.
# It builds the site with Jekyll, serves it at http://127.0.0.1:4000/ and opens
# your browser. Pages rebuild automatically when you save a file.
cd "$(dirname "$0")" || exit 1
export PATH="$HOME/.rbenv/bin:$HOME/.rbenv/shims:$PATH"
if command -v rbenv >/dev/null 2>&1; then eval "$(rbenv init - bash 2>/dev/null)"; fi
PORT=4000

if ! command -v bundle >/dev/null 2>&1; then
  echo "Ruby's bundler was not found. Install Ruby 3.2 (for example with rbenv) and run: gem install bundler"
  read -r -p "Press Return to close."; exit 1
fi
bundle check >/dev/null 2>&1 || bundle install

(sleep 6; open "http://127.0.0.1:$PORT/") &
echo "Starting the website at http://127.0.0.1:$PORT/  (press Ctrl+C or close this window to stop)"
bundle exec jekyll serve --host 127.0.0.1 --port "$PORT" --livereload
