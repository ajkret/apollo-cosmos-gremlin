import { DataSource } from "apollo-datasource"
import * as Gremlin  from 'gremlin'
import { arrayRandomiser, idGenerator } from "../../../utils"
import { IPersonDataSource } from "../dao-definition";
import { Interest, Person } from "../types";

export class PersonDataSource extends DataSource implements IPersonDataSource {
  constructor(private client: Gremlin.driver.Client) {
    super();
  }

  /*
  * Hacky workaround, especially as the properties are stored as arrays somehow?
  * If the database data is the same as the GrapQL model, we could write a generic mapper function though. (Or even just cast to the class)
  */
  toPerson(gremlinBlob: any): Person {
    let person = {} as Person;
    person.id = gremlinBlob['id'];
    person.firstName = gremlinBlob['firstName'][0];
    person.age = gremlinBlob['age'][0];
    person.interests = gremlinBlob['interests'];
    person.userId = gremlinBlob['userid'] == null ? "" : gremlinBlob['userid'][0];

    return person;
  }

  async getPersons() {
    console.log("Running Query to retrieve all ");
    const result = await this.client.submit("g.V().has('label','person').valueMap(true)", { }) as Gremlin.driver.ResultSet;
    const persons = new Array<Person>();
    console.log("Executed Query to retrieve all successfully");
    result.toArray().forEach(gremlinBlob => persons.push(this.toPerson(gremlinBlob)));
    console.log("Transformed result successfully");
    return Promise.resolve(persons);
  }

  async getPerson(id: string) {

    console.log("Running Query for Id");

    // Query
    const result = await this.client.submit("g.V().has('id',id).valueMap(true)",{ id: id }) as Gremlin.driver.ResultSet;

    console.log("Executed Query for Id successfully");

    // Process result

    const personModel = this.toPerson(result.first());

    console.log("Transformed result successfully");

    return Promise.resolve(personModel);
  }

  // Has bugs
  async createPerson(
    firstName: string,
    lastName: string,
    age: number,
    userId: number,
    interests: string[]
  ): Promise<Person> {
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
    let interestsToReturn : Interest[];
    for(var i of interestsArray ) {

      const result = await this.client.submit("g.addV('interested_in').from(personId).to(interestId)",{personId: personId, interestedId: i})

      const interest: Interest = {
        id: i,
        description: desc,
        //partitionKey: 1
      };
    }

    const personToReturn: Person = {
      id: personId,
      //modelType: ModelType.Person,
      firstName: firstName,
      //lastName: lastName,
      age: age,
      userId: 1,
      //partitionKey: 1,
    };

    //    this.persons.push(person);
    return Promise.resolve(personToReturn);
 

  }

  async updatePerson(person: Person) {
    //    const response = await this.container
    //      .item(person.id, person.modelType)
    //      .replace(person);

    //return response.resource;
    return Promise.resolve(null);
  }
}
