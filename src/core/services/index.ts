import { AnimalService } from "./animal.service";
import { PersonService } from "./person.service";
import { StatisticsService } from "./statistics.service";
import { AnimalRepository } from "../../infrastructure/repositories/animal.repository";
import { PersonRepository } from "../../infrastructure/repositories/person.repository";

export function createServices() {
  const animalRepository = new AnimalRepository();
  const personRepository = new PersonRepository();

  const animalService = new AnimalService(animalRepository);
  const personService = new PersonService(personRepository);
  const statisticsService = new StatisticsService(animalService, personService);

  return {
    animalService,
    personService,
    statisticsService,
  };
}

export type Services = ReturnType<typeof createServices>;

export { AnimalService } from "./animal.service";
export { PersonService } from "./person.service";
export { StatisticsService } from "./statistics.service";
