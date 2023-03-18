import { CategorySeed } from "./cli/seeders/category.seed";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/category/entities/category.entity";
import { SeedCategoryCommand } from "./cli/seed-category.command";
import { CategoryService } from "src/category/category.service";
import { SeedCommand } from "./cli/seed.command";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategorySeed, SeedCategoryCommand, CategoryService, SeedCommand],
  exports: [SeedCategoryCommand, SeedCommand],
})
export class CommanderModule {}
