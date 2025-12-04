import { DataSource } from 'typeorm';
import { User } from './entities/User';

/**
 * TypeORM DataSource Configuration mit SQLite
 * 
 * SQLite Vorteile:
 * ✅ Keine Installation nötig
 * ✅ Keine Konfiguration nötig
 * ✅ Perfekt zum Lernen und Testen
 * ✅ Alles in einer Datei (database.sqlite)
 * 
 * Für Production würdest du PostgreSQL, MySQL oder ähnliches nutzen
 */
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',  // Datei wird automatisch erstellt
  
  // Synchronize automatically in development
  // WICHTIG: In Production auf false setzen und Migrations nutzen!
  // Dies erstellt/aktualisiert automatisch die Tabellen
  synchronize: true,
  
  // Logging - zeigt SQL Queries in der Console
  logging: true,
  
  // Entities - alle Datenmodelle
  entities: [User],
  
  // Migrations - für Production
  migrations: ['src/migrations/**/*.ts'],
  subscribers: [],
});