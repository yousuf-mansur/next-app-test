import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add a Gig
export const addGig = async (req: Request, res: Response) => {
  const { title, description, price, ownerEmail } = req.body;

  try {
    const owner = await prisma.user.findUnique({
      where: { email: ownerEmail },
    });

    if (!owner || owner.role !== 'COMPANY') {
      return res
        .status(400)
        .json({ error: 'Invalid owner or not a company user' });
    }

    const newGig = await prisma.gig.create({
      data: {
        title,
        description,
        price,
        ownerId: owner.id,
      },
    });

    res.status(201).json(newGig);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Gigs
export const getAllGigs = async (_req: Request, res: Response) => {
  try {
    const gigs = await prisma.gig.findMany({
      include: {
        owner: true, // Include owner details
      },
    });

    res.status(200).json(gigs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get Gig by ID
export const getGigById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const gig = await prisma.gig.findUnique({
      where: { id: parseInt(id) },
      include: {
        owner: true, // Include owner details
      },
    });

    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }

    res.status(200).json(gig);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGig = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  try {
    const updatedGig = await prisma.gig.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        price,
      },
    });
    res.status(200).json(updatedGig);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteGig = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  try {
    await prisma.gig.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
