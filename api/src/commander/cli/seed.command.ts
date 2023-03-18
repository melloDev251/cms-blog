import { Command, CommandRunner } from "nest-commander";
import { CategorySeed } from "./seeders/category.seed";

@Command({
  name: "init",
  description:
    "Ajouter les données prédéfinies de l'application 'npm run seed init' ",
})
export class SeedCommand extends CommandRunner {
  constructor(private readonly categorySeed: CategorySeed) {
    super();
  }

  async run(): Promise<void> {
    console.log("Start seeding");

    await this.categorySeed.run();
    console.log("Finish seeding");
  }
}
