set -eu

flyctl deploy --config fly.staging.logs.toml --remote-only
