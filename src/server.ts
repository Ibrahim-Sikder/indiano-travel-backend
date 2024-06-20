import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function bootstrap() {
  try {
    mongoose.connect(config.database_uri!).then(() => {
      console.log('✅Database successfully connected');
    });
    app.listen(config.port!, () => {
      console.log(
        `🚀 Server is running on port ${config.port}: http://localhost:${config.port as string}`,
      );
    });
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
