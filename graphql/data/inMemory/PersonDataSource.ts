import { DataSource } from "apollo-datasource";
import { idGenerator } from "../../../utils";
import { IPersonDataSource } from "../dao-definition";
import { Interest, Person } from "../types";

export class PersonDataSource extends DataSource implements IPersonDataSource {
  constructor(private persons: Person[]) {
    super();
  }
  updatePerson(person: Person): Promise<Person> {
    return Promise.resolve(person);
  }

  getPersons() {
    return Promise.resolve(this.persons);
  }

  getPerson(id: string): Promise<Person> {
    return Promise.resolve(this.persons.find((g) => g.id === id));
  }

  createPerson(firstName: string, lastName: string, age: number, userId: number, interests: string[]): Promise<Person> {

    let interestsArray: Interest[] ;

    if(interests!=null) {
      for(var desc of interests) {
        const interest : Interest = {
          id: idGenerator(),
          //modelType: ModelType.Interest,
          description: desc,
          //partitionKey: 1
        };
        interestsArray.push(interest);
      }
    }

    const person : Person = {
      id: idGenerator(),
      //modelType: ModelType.Person,
      firstName: firstName,
      //lastName: lastName,
      age: age,
      userId: userId,
      //partitionKey: 1
    };

    this.persons.push(person);

    return Promise.resolve(person);
  }
}
