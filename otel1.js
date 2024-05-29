// tracing.js

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');
const { OTLPLogExporter } = require('@opentelemetry/exporter-logs-otlp-http');
const { Resource } = require('@opentelemetry/resources');

const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces', // Replace with your OTLP collector URL
});

const metricExporter = new OTLPMetricExporter({
    url: 'http://localhost:4318/v1/metrics'
    });


    const logExporter = new OTLPLogExporter({
    url: 'http://localhost:4318/v1/logs'
    });


const sdk = new NodeSDK({
  resource: new Resource({
    ['service.name']: 'deepsikha-test',
  }),
  traceExporter,
  metricExporter,
  logExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

// Initialize the SDK
sdk.start()

// Gracefully shut down the SDK on process exit
// process.on('SIGTERM', () => {
//   sdk.shutdown()
//     .then(() => console.log('Tracing terminated'))
//     .catch((error) => console.error('Error terminating tracing', error))
//     .finally(() => process.exit(0));
// });
