import {
  IPersonDataSource
} from "./data/types";

export type ApolloContext = {
  dataSources: {
    person: IPersonDataSource;
  };
};
