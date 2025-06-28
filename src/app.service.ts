import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { User } from '@prisma/client';
@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

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
