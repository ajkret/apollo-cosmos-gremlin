import { DataSource } from "apollo-datasource";
import { idGenerator } from "../../../utils";
import { IPersonDataSource, PersonModel, ModelType, InterestModel } from "../types";

export class PersonDataSource extends DataSource implements IPersonDataSource {
  constructor(private persons: PersonModel[]) {
    super();
  }
  updatePerson(person: PersonModel): Promise<PersonModel> {
    return Promise.resolve(person);
  }

  getPersons() {
    return Promise.resolve(this.persons);
  }

  getPerson(id: string): Promise<PersonModel> {
    return Promise.resolve(this.persons.find((g) => g.id === id));
  }

  createPerson(firstName: string, lastName: string, age: number, userId: number, interests: string[]): Promise<PersonModel> {

    let interestsArray: InterestModel[] ;

    if(interests!=null) {
      for(var desc of interests) {
        const interest : InterestModel = {
          id: idGenerator(),
          modelType: ModelType.Interest,
          description: desc,
          partitionKey: 1
        };
        interestsArray.push(interest);
      }
    }

    const person : PersonModel = {
      id: idGenerator(),
      modelType: ModelType.Person,
      firstName: firstName,
      lastName: lastName,
      age: age,
      userId: userId,
      partitionKey: 1
    };

    this.persons.push(person);

    return Promise.resolve(person);
  }
}
