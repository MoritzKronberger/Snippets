/* template from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_express_01a */

import { query }  from './index.js'

const
  postLogin =
  async ({user, password}) => 
  { const result = 
    (await query
     ( `SELECT check_password($1::VARCHAR, $2::VARCHAR) AS authorized, 
               id
        FROM   account
        WHERE  username = $1::VARCHAR
       `, 
       [user, password]
     )
    ).rows[0];

    return result 
           ? [result.authorized ? 200 : 401, result.id] 
           : [401, '']
  };


export default
{ postLogin,
}