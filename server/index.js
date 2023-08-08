const app = require('./app/app');

const start = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.error(`Failed to start server ${error}`);
  }
}

start(3001);