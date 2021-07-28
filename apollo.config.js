module.exports = {
    client: {
      service: {
        name: 'vi-staff',
        url: 'http://localhost:3001/api/graphql_dev',
        headers: {
        }
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }