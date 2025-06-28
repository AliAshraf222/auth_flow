import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma';
import { User } from '../generated/prisma/client';
@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaClient) {}

  getAllUsers(): Promise<Partial<User>[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isEmailVerified: true,
        provider: true,
        todos: {
          select: {
            id: true,
            title: true,
            completed: true,
            priority: true,
            userId: true,
          },
        },
      },
    });
  }
}
