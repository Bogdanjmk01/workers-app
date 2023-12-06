import { Module } from '@nestjs/common';
import { UserModule } from "./user/user.module";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [UserModule, MulterModule.register({ dest: join(__dirname, '../uploads/myFiles') }), ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../uploads/myFiles'),
    serveRoot: '/uploads'
  })],
  controllers: [],
  providers: [],
})
export class AppModule {
}
