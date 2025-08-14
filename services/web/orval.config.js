export default {
  api: {
    input: {
      target: 'http://localhost:8888/swagger/openapi.json',
    },
    output: {
      mode: 'split',
      target: 'src/client/api.ts',
      schemas: 'src/client/types',
      client: 'react-query',
      mock: false,
      override: {
        mutator: {
          path: 'src/client/mutator.ts',
          name: 'customInstance',
        },
      },
    },
  },
}