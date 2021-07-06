export default () => ({
  node_env: process.env.NODE_ENV,

  logger: {
    output: 'console',
    fileName: 'logs.ts',
  },

  nimbusDB: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,

  port: parseInt(process.env.PORT, 10) || 3000,

  swagger: {
    title: 'NimbusCoding',
    description: 'Nimbus API',
    version: '1.0',
    tag: 'nimbus_coding',
  },
});
