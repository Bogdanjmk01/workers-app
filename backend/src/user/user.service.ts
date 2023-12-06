import { PrismaService } from "../prisma.service";
import { WorkEntry } from "./work_entry.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllWorkEntries(id: number): Promise<WorkEntry[]> {
    // @ts-ignore
    return this.prisma.workEntry.findMany({ where: { userId: Number(id) } });
  };

  async getWorkEntryById(id: number): Promise<WorkEntry> {
    // @ts-ignore
    return this.prisma.workEntry.findUnique({ where: { id: Number(id) } });
  };

  async createWorkEntry(data: WorkEntry): Promise<WorkEntry> {
    try {
      //@ts-ignore
      return await this.prisma.workEntry.create({
        data: {
          title: data.title,
          description: data.description,
          isHidden: Boolean(data.isHidden),
          customerLink: data.customerLink,
          userId: Number(data.userId),
          imageUrl: String(data.imageUrl)
        },
      });
    } catch (error) {
      console.error('Error creating work entry:', error);
      throw error;
    }
  }

  async updateWorkEntry(id: number, data: WorkEntry): Promise<WorkEntry> {
    // @ts-ignore
    return this.prisma.workEntry.update({
      where: { id: Number(id) },
      data: { title: data.title, description: data.description, imageUrl: data.imageUrl, customerLink: data.customerLink, isHidden: data.isHidden }
    });
  };

  async deleteWorkEntry(id: number): Promise<WorkEntry> {
    // @ts-ignore
    return this.prisma.workEntry.delete({ where: { id: Number(id) } });
  };
}