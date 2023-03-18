require("dotenv").config({ path: `../${process.env.NODE_ENV}.env` });
import { Exclude } from "class-transformer";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { json, urlencoded } from 'express';
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("api");
  app.use(cookieParser());
  app.enableCors({
    origin: [
      "http://127.0.0.1:8080/",
      "http://localhost:4200",
      "http://localhost:4300",
      "https://cmsblog-frontend.azurewebsites.net",
    ],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  const config = new DocumentBuilder()
    .setTitle("CMS Blog")
    .setDescription("The blog API for professionals")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document);

  await app.listen(5000);
}

bootstrap().then();
