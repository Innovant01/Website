module.exports = {
  async rewrites() {
      return [
        {
          source: 'https://localhost:4000/',
          destination: 'https://localhost:3000/',
        },
      ]
    },
};