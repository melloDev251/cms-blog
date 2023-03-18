import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/category/entities/category.entity";
import { Repository } from "typeorm";
import data from "../categories.json";

@Injectable()
export class CategorySeed {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async run() {
    await this.categoryRepository.createQueryBuilder().delete().execute();

    const nbRows = await this.categoryRepository.count();
    if (nbRows > 0) {
      return;
    }

    const categories = data.map((catRows) =>
      this.categoryRepository.create(catRows)
    );
    return await this.categoryRepository.save(categories);
  }
}
