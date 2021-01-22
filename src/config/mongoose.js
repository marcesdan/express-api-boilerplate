import mongoose from 'mongoose';
import logger from './logger';
import vars from './vars';

// Exit application on error
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (vars.env === 'development') {
  mongoose.set('debug', true);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
export default () => {
  mongoose
    .connect(vars.mongo.uri, {
      useCreateIndex: true,
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    // eslint-disable-next-line no-console
    .then(() => console.log('mongoDB connected...'));
  return mongoose.connection;
};
