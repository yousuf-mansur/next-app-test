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
      createdAt: '2024-05-23T00:00:00Z',
    },
    {
      email: 'company1@example.com',
      password: '$2a$04$YcD6IeJ/F2gcI6c9yArsqOu0wPE1cxO3BGLuTOBZpj248Rtpp/zMq',
      role: 'COMPANY',
      isSubscribed: true,
      createdAt: '2024-05-24T00:00:00Z',
    },
    {
      email: 'jobseeker2@gmail.com',
      password: '$2a$04$YcD6IeJ/F2gcI6c9yArsqOu0wPE1cxO3BGLuTOBZpj248Rtpp/zMq',
      role: 'JOB_SEEKER',
      isSubscribed: false,
      createdAt: '2024-05-25T00:00:00Z',
    },
    {
      email: 'admin3@platform.com',
      password: '$2a$04$YcD6IeJ/F2gcI6c9yArsqOu0wPE1cxO3BGLuTOBZpj248Rtpp/zMq',
      role: 'ADMIN',
      isSubscribed: true,
      createdAt: '2024-05-26T00:00:00Z',
    },
    {
      email: 'company4@business.com',
      password: '$2a$04$YcD6IeJ/F2gcI6c9yArsqOu0wPE1cxO3BGLuTOBZpj248Rtpp/zMq',
      role: 'COMPANY',
      isSubscribed: true,
      createdAt: '2024-05-27T00:00:00Z',
    },
    {
      email: 'superadmin@platform.com',
      password: '$2a$04$YcD6IeJ/F2gcI6c9yArsqOu0wPE1cxO3BGLuTOBZpj248Rtpp/zMq',
      role: 'SUPER_ADMIN',
      isSubscribed: true,
      createdAt: '2024-05-28T00:00:00Z',
    },
    {
      email: 'jobseeker5@outlook.com',
      password: '$2a$04$YcD6IeJ/F2gcI6c9yArsqOu0wPE1cxO3BGLuTOBZpj248Rtpp/zMq',
      role: 'JOB_SEEKER',
      isSubscribed: true,
      createdAt: '2024-05-29T00:00:00Z',
    },
    {
      email: 'company6@corp.com',
      password: '$2a$04$YcD6IeJ/F2gcI6c9yArsqOu0wPE1cxO3BGLuTOBZpj248Rtpp/zMq',
      role: 'COMPANY',
      isSubscribed: false,
      createdAt: '2024-05-30T00:00:00Z',
    },
    {
      email: 'jobseeker7@yahoo.com',
      password: '$2a$04$YcD6IeJ/F2gcI6c9yArsqOu0wPE1cxO3BGLuTOBZpj248Rtpp/zMq',
      role: 'JOB_SEEKER',
      isSubscribed: false,
      createdAt: '2024-05-31T00:00:00Z',
    },
    {
      email: 'admin8@platform.com',
      password: '$2a$04$YcD6IeJ/F2gcI6c9yArsqOu0wPE1cxO3BGLuTOBZpj248Rtpp/zMq',
      role: 'ADMIN',
      isSubscribed: true,
      createdAt: '2024-06-01T00:00:00Z',
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
      createdAt: '2024-05-24T00:00:00Z',
    },
    {
      title: 'UI/UX Designer for Web Application',
      description:
        'Seeking a designer to improve user experience and interface design for our web application.',
      price: 90,
      ownerEmail: 'company1@example.com',
      createdAt: '2024-05-25T00:00:00Z',
    },
    {
      title: 'Content Writer for Tech Blog',
      description:
        'Seeking an experienced content writer to create engaging technical articles and blog posts about emerging technologies.',
      price: 45,
      ownerEmail: 'company4@business.com',
      createdAt: '2024-05-26T00:00:00Z',
    },
    {
      title: 'Frontend Developer - React Specialist',
      description:
        'Seeking a React developer to build responsive and interactive user interfaces.',
      price: 85,
      ownerEmail: 'company4@business.com',
      createdAt: '2024-05-27T00:00:00Z',
    },
    {
      title: 'Mobile App Developer - iOS Focus',
      description:
        'Looking for an iOS developer to create a new fitness tracking app. Swift experience required.',
      price: 110,
      ownerEmail: 'company6@corp.com',
      createdAt: '2024-05-28T00:00:00Z',
    },
    {
      title: 'Digital Marketing Specialist',
      description:
        'Need a marketing specialist to manage social media campaigns and improve online presence.',
      price: 65,
      ownerEmail: 'company1@example.com',
      createdAt: '2024-05-29T00:00:00Z',
    },
    {
      title: 'Database Administrator',
      description:
        'Looking for a DBA to optimize and maintain our PostgreSQL databases.',
      price: 100,
      ownerEmail: 'company4@business.com',
      createdAt: '2024-05-30T00:00:00Z',
    },
    {
      title: 'DevOps Engineer',
      description:
        'Need a DevOps engineer to implement CI/CD pipelines and manage cloud infrastructure.',
      price: 130,
      ownerEmail: 'company6@corp.com',
      createdAt: '2024-05-31T00:00:00Z',
    },
    {
      title: 'Graphic Designer for Brand Identity Project',
      description:
        'Need a creative graphic designer to develop complete brand identity including logo, color scheme, and style guide.',
      price: 75,
      ownerEmail: 'company1@example.com',
      createdAt: '2024-06-01T00:00:00Z',
    },
    {
      title: 'Backend Developer - Python/Django',
      description:
        'Looking for a backend developer with strong Python and Django experience to build robust APIs.',
      price: 95,
      ownerEmail: 'company4@business.com',
      createdAt: '2024-06-02T00:00:00Z',
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
