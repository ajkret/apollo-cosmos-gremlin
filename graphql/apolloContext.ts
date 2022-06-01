import { IPersonDataSource } from "./data/dao-definition";

export type ApolloContext = {
  dataSources: {
    person: IPersonDataSource;
  };
};
