-- CREATE DATABASE IF NOT EXISTS codrrdb
--SELECT 'CREATE DATABASE ecommerce_nest_prod'
--WHERE NOT EXISTS (SELECT FROM ecommerce_nest_prod WHERE datname = 'ecommerce_nest_prod')\gexec
SELECT 'CREATE DATABASE ecommerce_nest_prod' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ecommerce_nest_prod');
