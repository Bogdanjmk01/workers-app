import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutDownHooks(app: INestApplication) {
    if (typeof this.$on === 'function') {
      // @ts-ignore
      this.$on("beforeExit", async () => {
        await app.close();
      });
    } else {
      console.error("$on is not a function");
    }
  }
}