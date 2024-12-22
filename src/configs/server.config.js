import dotenv from 'dotenv'
dotenv.config()

const configs = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV,
  get DB_URL(){
    return this.NODE_ENV==='development'? process.env.DEV_DB_URL : process.env.PROD_DB_URL;
  }
}

export default configs;