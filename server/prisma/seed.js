const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  // Clear existing data first
  await prisma.gig.deleteMany({});
  await prisma.user.deleteMany({});

  const users = [
    {
      email: 'jobseeker0@gmail.com',
      password: '$2a$04$YcD6IeJ/F2gcI6c9yArsqOu0wPE1cxO3BGLuTOBZpj248Rtpp/zMq',
      role: 'JOB_SEEKER',
      isSubscribed: true,
      photo: 'https://example.com/uploads/jobseeker0.jpg',
      createdAt: '2024-05-23T00:00:00Z',
    },
    {
      email: 'company1@example.com',
      password: '$2a$04$YcD6IeJ/F2gcI6c9yArsqOu0wPE1cxO3BGLuTOBZpj248Rtpp/zMq',
      role: 'COMPANY',
      isSubscribed: true,
      photo: 'https://example.com/uploads/company1.jpg',
      createdAt: '2024-05-24T00:00:00Z',
    },
    {
      email: 'jobseeker2@gmail.com',
      password: '$2a$04$YcD6IeJ/F2gcI6c9yArsqOu0wPE1cxO3BGLuTOBZpj248Rtpp/zMq',
      role: 'JOB_SEEKER',
      isSubscribed: false,
      photo: 'https://example.com/uploads/jobseeker2.jpg',
      createdAt: '2024-05-25T00:00:00Z',
    },
    {
      email: 'admin3@platform.com',
      password: '$2a$04$YcD6IeJ/F2gcI6c9yArsqOu0wPE1cxO3BGLuTOBZpj248Rtpp/zMq',
      role: 'ADMIN',
      isSubscribed: true,
      photo: 'https://example.com/uploads/admin3.jpg',
      createdAt: '2024-05-26T00:00:00Z',
    },
    {
      email: 'company4@business.com',
      password: '$2a$04$YcD6IeJ/F2gcI6c9yArsqOu0wPE1cxO3BGLuTOBZpj248Rtpp/zMq',
      role: 'COMPANY',
      isSubscribed: true,
      photo: 'https://example.com/uploads/company4.jpg',
      createdAt: '2024-05-27T00:00:00Z',
    },
    {
      email: 'superadmin@platform.com',
      password: '$2a$04$YcD6IeJ/F2gcI6c9yArsqOu0wPE1cxO3BGLuTOBZpj248Rtpp/zMq',
      role: 'SUPER_ADMIN',
      isSubscribed: true,
      photo: 'https://example.com/uploads/superadmin.jpg',
      createdAt: '2024-05-28T00:00:00Z',
    },
  ];

  // Seed users and store their IDs
  const createdUsers = {};
  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        role: user.role,
        isSubscribed: user.isSubscribed,
        photo: user.photo,
        createdAt: new Date(user.createdAt),
      },
    });
    if (user.role === 'COMPANY') {
      createdUsers[user.email] = createdUser.id;
    }
  }

  const gigs = [
    {
      title: 'Senior Full Stack Developer needed for E-commerce Platform',
      description:
        'Looking for an experienced developer to build and maintain our e-commerce platform. Must have experience with React, Node.js, and AWS.',
      price: 120,
      ownerEmail: 'company1@example.com',
      photo: 'https://example.com/uploads/gig1.jpg',
      createdAt: '2024-05-24T00:00:00Z',
    },
    {
      title: 'UI/UX Designer for Web Application',
      description:
        'Seeking a designer to improve user experience and interface design for our web application.',
      price: 90,
      ownerEmail: 'company1@example.com',
      photo: 'https://example.com/uploads/gig2.jpg',
      createdAt: '2024-05-25T00:00:00Z',
    },
    {
      title: 'Content Writer for Tech Blog',
      description:
        'Seeking an experienced content writer to create engaging technical articles and blog posts about emerging technologies.',
      price: 45,
      ownerEmail: 'company4@business.com',
      photo: 'https://example.com/uploads/gig3.jpg',
      createdAt: '2024-05-26T00:00:00Z',
    },
    {
      title: 'Frontend Developer - React Specialist',
      description:
        'Seeking a React developer to build responsive and interactive user interfaces.',
      price: 85,
      ownerEmail: 'company4@business.com',
      photo: 'https://example.com/uploads/gig4.jpg',
      createdAt: '2024-05-27T00:00:00Z',
    },
  ];

  // Seed gigs using the stored user IDs
  for (const gig of gigs) {
    const ownerId = createdUsers[gig.ownerEmail];
    if (ownerId) {
      await prisma.gig.create({
        data: {
          title: gig.title,
          description: gig.description,
          price: gig.price,
          ownerId: ownerId,
          photo: gig.photo,
          createdAt: new Date(gig.createdAt),
        },
      });
    }
  }

  console.log('Data seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
