import mongoose from 'mongoose';
import Product from '../models/product.model';
import dotenv from 'dotenv';

dotenv.config();

const sampleProducts = Array.from({ length: 20 }).map((_, i) => ({
  name: `Product ${i + 1}`,
  price: Number((Math.random() * 100 + 10).toFixed(2)),
  imageUrl: `photos/product${i + 1}.jpg`,
  category: ['Electronics', 'Books', 'Clothing', 'Home'][i % 4],
  stock: Math.floor(Math.random() * 50) + 1,
  createdAt: new Date(),
}));

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');

    await Product.deleteMany();
    const created = await Product.insertMany(sampleProducts);

    console.log(`Seeded ${created.length} products`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedProducts();
