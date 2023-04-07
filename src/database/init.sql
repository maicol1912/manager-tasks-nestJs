--CREATE DATABASE IF NOT EXISTS ecommerce_nest_prod

SELECT 'CREATE DATABASE ecommerce_nest_prod'
WHERE NOT EXISTS (SELECT FROM pg_database where datname = 'ecommerce_nest_prod')\gexec