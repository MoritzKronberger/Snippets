/* from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_express_01a */

import pg from 'pg'

const 
  { PGHOST     = 'localhost',
    PGUSER     = 'web',
    PGPASSWORD = 'web',
    PGDATABASE = 'account',
    PGPORT     =  5432, 
  }            = process.env,
  c_pool       = new pg.Pool({"host":     PGHOST,
                              "user":     PGUSER,
                              "password": PGPASSWORD,
                              "database": PGDATABASE,
                              "port":     PGPORT,
                            }),
                            
  query = 
    async (p_sql, p_params) => 
    await c_pool.query(p_sql, p_params),
  
  transaction = 
    async (p_query_callback) =>
    { const c_client = await c_pool.connect();
      try 
      { await c_client.query('BEGIN');
        await p_query_callback(c_client);
        await c_client.query('COMMIT')
      } 
      catch (p_error) 
      { await c_client.query('ROLLBACK')
        throw p_error
      } finally 
      { c_client.release() }
    };

export 
{ query, 
  transaction
}

export default
{ query, 
  transaction,
}  