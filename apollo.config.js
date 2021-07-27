module.exports = {
    client: {
      service: {
        name: 'vi-staff',
        url: 'http://localhost:3001/graphiql',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }