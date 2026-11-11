#!/bin/sh
set -eu

mkdir -p /app/uploads

archive=/seed/topic_uploads.tar.gz
marker="/app/uploads/.$(basename "$archive").loaded"
if [ -f "$archive" ] && [ ! -f "$marker" ]; then
  tar -xzf "$archive" -C /app/uploads
  touch "$marker"
fi

exec npm start
