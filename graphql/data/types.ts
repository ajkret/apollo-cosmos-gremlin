
// Type intersection
// https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types

export enum ModelType {
  Person = "Person",
  Interest = "Interest",
}

type Model = {
  id: string;
  modelType: ModelType;
};

export type InterestModel = {
  description: string;
  partitionKey: number;
} & Model;

export type PersonModel = {
  firstName: string;
  lastName: string;
  age: number;
  userId: number;
  partitionKey: number;
} & Model;

export interface IPersonDataSource {
  getPersons(): Promise<PersonModel[]>;
  getPerson(id: string): Promise<PersonModel>;
  createPerson(firstName: string, lastName: string, age: number, userId: number, interests: string[]): Promise<PersonModel>;
  updatePerson(person: PersonModel): Promise<PersonModel>;
}
