/* from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_express_01 
and https://gitlab.multimedia.hs-augsburg.de/kowa/wk_express_hello_world_01 */

import express from 'express'
import cors from 'cors'

import * as uuid from 'uuid'
import auth      from './routes/auth.js'
import accounts  from './routes/accounts.js'

const 
  { PORT   = 3000, 
    SERVER = `http://localhost:${PORT}`,
  }        = process.env,
  c_app    = express(),
  c_uuid   = uuid.v4;


c_app.use('/v1',          auth);
c_app.use('/v1/accounts', accounts);

c_app.get('/v1/uuid', (req, res) => res.status(200).json(c_uuid()));

c_app.listen(PORT);

//c_app.use(cors());

console.log(`Running on ${SERVER}`);