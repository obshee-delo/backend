import 'dotenv/config';
import { join } from 'path';
import { writeFileSync, mkdirSync } from 'fs';

const queriesRootDirectory = join(__dirname, '/../queries');

/**
 * Generates init.sql file.
 */
function generateDatabaseInitQuery(queriesRootDirectory: string) {
    let filePath = join(queriesRootDirectory, 'init.sql');
    let content = '';

    content += `CREATE DATABASE ${process.env.DATABASE_NAME};\n`;
    content += `ALTER ROLE ${process.env.DATABASE_USER} PASSWORD \'${process.env.DATABASE_PASSWORD}\';\n`;

    writeFileSync(filePath, content);
}

/**
 * Generates database query files for easier container deployment.
 */
function generateDatabaseQueries(queriesRootDirectory: string) {
    mkdirSync(queriesRootDirectory);
    generateDatabaseInitQuery(queriesRootDirectory);
}

generateDatabaseQueries(queriesRootDirectory);
