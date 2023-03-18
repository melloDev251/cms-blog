import { Command, CommandRunner } from "nest-commander";
import { CategorySeed } from "./seeders/category.seed";

@Command({
  name: "category",
  description: "Ajout liste category",
})
export class SeedCategoryCommand extends CommandRunner {
  constructor(private readonly categorySeed: CategorySeed) {
    super();
  }

  async run(): Promise<void> {
    console.log("start seeding");
    await this.categorySeed.run();
    console.log("finish seeding");
  }
}
