export OTEL_EXPORTER_OTLP_ENDPOINT='http://otlp.nr-data.net:4317'
export OTEL_EXPORTER_OTLP_HEADERS='ada'
docker run --rm \
  -e OTEL_EXPORTER_OTLP_ENDPOINT \
  -e OTEL_EXPORTER_OTLP_HEADERS \
  -p 4317:4317 \
  -p 4318:4318 \
  -v "/Users/vishal/Documents/workspace/personal/nodejs-otel/otel-config.yaml":/otel-config.yaml \
  --name otelcol \
  otel/opentelemetry-collector \
  --config otel-config.yaml