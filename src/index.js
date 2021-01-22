// make bluebird default Promise
import mongoose from './config/mongoose';
import app from './config/express';
import logger from './config/logger';
import vars from './config/vars';

// open mongoose connection
mongoose();

// listen to requests
app.listen(vars.port, () => logger.info(`server started on port ${vars.port} (${vars.env})`));

/**
 * Exports express
 * @public
 */
export default app;
