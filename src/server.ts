import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes/routes';

const app = express();
const port = 3000;

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

// Original Route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Swagger Docs: http://localhost:${port}/docs`);
});