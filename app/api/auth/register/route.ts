import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { randomBytes } from 'crypto';

export const POST = async (request: NextRequest) => {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: 'Name, email, and password are required' }),
        { status: 400 }
      );
    }

    const userAlready = await prisma.user.findUnique({ where: { email } });
    if (userAlready) {
      return new Response(
        JSON.stringify({ message: 'Email is already registered' }),
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const emailVerificationToken = randomBytes(32).toString('hex');

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerificationToken,
        resetPassword: null
      },
    });

    return new Response(
      JSON.stringify({ message: 'User created successfully' }),
      { status: 201 }
    );
  } catch (err) {
    console.log("error", err)
    return new Response(
      JSON.stringify({ message: 'Server error' }),
      { status: 500 }
    );
  }
};
