const { Pool } = require('pg');

class Database {
    constructor() {
        this.database = new Pool({
            user: 'postgres',     
            host: 'localhost',        
            database: 'Lab Commerce',  
            password: '88495949',     
            port: 5432,                
        });
    }
}

module.exports = Database;