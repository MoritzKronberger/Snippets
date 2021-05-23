<?php

// from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01a.git

require_once('plugins/login-servers.php');

return new AdminerLoginServers
([ 'PostgreSQL' => 
    [ 'server' => $_ENV['ADMINER_DEFAULT_SERVER'],
		  'driver' => 'pgsql'
    ]
]);
