import { Prisma } from "@prisma/client";

export class WorkEntry implements Prisma.WorkEntryCreateInput {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    customerLink: string;
    isHidden: boolean;
    userId: number;
    user: Prisma.UserCreateNestedOneWithoutWorkEntriesInput | null;
}