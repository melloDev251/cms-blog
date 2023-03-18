import { Module } from "@nestjs/common";

import { PostModule } from "./post/post.module";
import { CategoryModule } from "./category/category.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessControlModule } from "nest-access-control";
import { roles } from "./models/user-roles.models";
import { AuthModule } from "./auth/auth.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { CommanderModule } from "./commander/commander.module";
import { parse } from "dotenv";

@Module({
  imports: [
    CategoryModule,
    PostModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "blog",
      charset: "utf8mb4",
      timezone: "+00:00",
      entities: ["src/**/*.entity.ts"],
      autoLoadEntities: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    AccessControlModule.forRoles(roles),
    CommanderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
