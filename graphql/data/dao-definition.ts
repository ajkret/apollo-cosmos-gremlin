import { Person } from "./types";

export interface IPersonDataSource {
  getPersons(): Promise<Person[]>;
  getPerson(id: string): Promise<Person>;
  createPerson(firstName: string, lastName: string, age: number, userId: number, interests: string[]): Promise<Person>;
  updatePerson(person: Person): Promise<Person>;
}
