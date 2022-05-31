import { DataSource } from "apollo-datasource"
import * as Gremlin  from 'gremlin'
import { arrayRandomiser, idGenerator } from "../../../utils"
import {
  IPersonDataSource,
  PersonModel,
  ModelType,
  InterestModel,
} from "../types"

export class PersonDataSource extends DataSource implements IPersonDataSource {
  constructor(private client: Gremlin.driver.Client) {
    super();
  }

  async getPersons() {
    console.log("Running Query to retrieve all ");

    return Promise.resolve(await this.client.submit("g.V().has('label','person')", { }))
  }

  async getPerson(id: string) {

    console.log("Running Query for Id");

    // Query
    const result = await this.client.submit("g.V().has('id',id).values('id','firstName','lastName','age','userId','partitionKey')",{ id: id })

    // Process result
    const personModel: PersonModel = {
      id: result._items[0],
      firstName: result._items[1],
      lastName: result._items[2],
      userId: result._items[3],
      age: result[4],
      partitionKey: result[5],
      modelType: ModelType.Person
    }

    return Promise.resolve(personModel);
  }

  // Has bugs
  async createPerson(
    firstName: string,
    lastName: string,
    age: number,
    userId: number,
    interests: string[]
  ): Promise<PersonModel> {
    let interestsArray: string[];

    if (interests != null) {
      for (var desc of interests) {

        const interestId = idGenerator();
        const result = await this.client.submit("g.addV('interest').property('id', idGenerator()).property('description', desc).property('partitionKey', 1)", {
          id: idGenerator(),
          description: desc
        })

        interestsArray.push(interestId);
      }
    }

    // Create Person
    const personId = idGenerator();
    const p = await this.client.submit("g.addV('person').property('id', id).property('firstName', name).property('age', age).property('userId',userId).property('partitionKey', 1)",{
      id: personId,
      firstName: name,
      age: age,
      userId: idGenerator(),
    });

    // Add relationships
    let interestsToReturn : InterestModel[];
    for(var i of interestsArray ) {

      const result = await this.client.submit("g.addV('interested_in').from(personId).to(interestId)",{personId: personId, interestedId: i})

      const interest: InterestModel = {
        id: i,
        modelType: ModelType.Interest,
        description: desc,
        partitionKey: 1
      };
    }

    const personToReturn: PersonModel = {
      id: personId,
      modelType: ModelType.Person,
      firstName: firstName,
      lastName: lastName,
      age: age,
      userId: 1,
      partitionKey: 1,
    };

    //    this.persons.push(person);
    return Promise.resolve(personToReturn);
 

  }

  async updatePerson(person: PersonModel) {
    //    const response = await this.container
    //      .item(person.id, person.modelType)
    //      .replace(person);

    //return response.resource;
    return Promise.resolve(null);
  }
}
