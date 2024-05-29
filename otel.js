const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');
const { OTLPLogExporter } = require('@opentelemetry/exporter-logs-otlp-http');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const { Resource } = require('@opentelemetry/resources');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');

const collectorIP = '0.0.0.0';
const collectorPort = 4318;

const metricsURL = `http://${collectorIP}:${collectorPort}/v1/metrics`;
const tracesURL = `http://${collectorIP}:${collectorPort}/v1/traces`;
const logsURL = `http://${collectorIP}:${collectorPort}/v1/logs`;

console.log(`Metrics URL: ${metricsURL}`);
console.log(`Traces URL: ${tracesURL}`);
console.log(`Logs URL: ${logsURL}`);

const metricExporter = new OTLPMetricExporter({
  url: metricsURL
});

const traceExporter = new OTLPTraceExporter({
  endpoint: tracesURL
});

const logExporter = new OTLPLogExporter({
  url: logsURL
});

const resource = new Resource({
  'service.name': 'deepsikha-test'
});

const sdk = new NodeSDK({
  traceExporter: traceExporter,
  metricReader: new PeriodicExportingMetricReader({
    exporter: metricExporter,
  }),
  logExporter: logExporter,
  resource: resource
});

sdk.start();