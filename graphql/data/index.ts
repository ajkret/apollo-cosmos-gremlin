import * as Gremlin from 'gremlin'
import { configuration } from "./config";
import { PersonDataSource as CosmosPersonDataSource } from "./cosmos/PersonDataSource";
import { PersonDataSource as InMemoryPersonDataSource } from "./inMemory/PersonDataSource";
import { PersonModel } from "./types";

export const cosmosDataSources = () => {

  if(!configuration.endpoint || configuration.endpoint.length === 0) throw new Error("CosmosDB connection string not found.");

  const authenticator = new Gremlin.driver.auth.PlainTextSaslAuthenticator(
    `/dbs/${configuration.database}/colls/${configuration.collection}`, configuration.primaryKey
  )

  const client = new Gremlin.driver.Client(
      configuration.endpoint, 
      { 
          authenticator,
          traversalsource : "g",
          rejectUnauthorized : true,
          mimeType : "application/vnd.gremlin-v2.0+json"
      }
  );

  return {
    person: new CosmosPersonDataSource(client),
  };
};

const persons: PersonModel[] = [];
export const inMemoryDataSources = () => ({
  person: new InMemoryPersonDataSource(persons),
});
