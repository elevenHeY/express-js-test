import 'reflect-metadata'; // WICHTIG: Muss ganz oben stehen!
import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes/routes';
import { AppDataSource } from './typeorm.config';

const app = express();
const port = process.env.PORT || 3000;

/**
 * Datenbank initialisieren
 * 
 * Vergleich zu FastAPI/Flask:
 * 
 * FastAPI:
 * @app.on_event("startup")
 * async def startup():
 *     await database.connect()
 * 
 * Flask:
 * with app.app_context():
 *     db.create_all()
 */
async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection established');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

// Middleware
app.use(express.json());

// tsoa Routes registrieren
RegisterRoutes(app);

// Swagger UI
app.use('/docs', swaggerUi.serve, async (req: Request, res: Response) => {
  return res.send(
    swaggerUi.generateHTML(await import('../dist/swagger.json'))
  );
});

// Health Check mit DB Status
app.get('/health', async (req: Request, res: Response) => {
  const dbStatus = AppDataSource.isInitialized ? 'connected' : 'disconnected';
  
  res.json({
    status: 'ok',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Original Route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World with TypeORM! 🚀');
});

// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message || 'Internal Server Error'
  });
});

/**
 * Server starten
 * 
 * Wichtig: Erst Datenbank initialisieren, dann Server starten
 */
async function startServer() {
  await initializeDatabase();
  
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📚 Swagger Docs: http://localhost:${port}/docs`);
    console.log(`💊 Health Check: http://localhost:${port}/health`);
  });
}

// Server starten
startServer();

// Graceful Shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing database connection...');
  await AppDataSource.destroy();
  process.exit(0);
});