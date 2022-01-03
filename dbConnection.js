const { Pool } = require('pg')

const client = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://tsyjmirvbapihn:a1386c7f3512692fdcddf838c3daf33eda37ff4c2e1098b1afb973fa0015b80e@ec2-44-198-211-34.compute-1.amazonaws.com:5432/doho8l5g5obhn',
  ssl: {
    rejectUnauthorized: false
  }
})

module.exports = client