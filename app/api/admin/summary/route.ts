import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const GET = auth(async (req) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: 'unauthorized' }, { status: 401 });
  }

  const ordersCount = await prisma.order.count()
  const productsCount = await prisma.product.count()
  const usersCount = await prisma.user.count()

  const ordersPriceGroup = await prisma.order.aggregate({
    _sum: {
      totalPrice: true
    }
  })

  const ordersPrice =
    ordersPriceGroup._sum.totalPrice

  const salesData = await prisma.order.groupBy({
    by: ['createdAt'],
    _count: {
      id: true, // Menghitung jumlah pesanan
    },
    _sum: {
      totalPrice: true, // Menghitung total penjualan
    },
    where: {
      createdAt: {
        gte: new Date('2025-01-01T00:00:00Z'), // Filter jika perlu, misalnya untuk data mulai dari tahun tertentu
      },
    },
    orderBy: {
      createdAt: 'asc', // Urutkan berdasarkan tanggal secara ascending
    },
  });

  const productsData = await prisma.product.groupBy({
    by: ['categoryId'],  // Group by category
    _count: {
      id: true,  // Count total products for each category
    },
    orderBy: {
      categoryId: 'asc',  // Sort by category ascending
    },
  });


  const usersData = await prisma.user.groupBy({
    by: ['createdAt'],
    _count: {
      id: true, // Count the total number of users
    },
    orderBy: {
      createdAt: 'asc', // Sort by 'createdAt' ascending (date-wise)
    },
  });


  return Response.json({
    status: 201,
    ordersCount,
    productsCount,
    usersCount,
    ordersPrice,
    salesData,
    productsData,
    usersData,
  });
});
