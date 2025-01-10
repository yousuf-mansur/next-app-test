import app from './app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  try {
    await prisma.$connect();
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Database connection error:', error);
  }
});
