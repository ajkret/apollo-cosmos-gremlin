import * as Gremlin from 'gremlin'
import { configuration } from "./config";
import { PersonDataSource as CosmosPersonDataSource } from "./cosmos/PersonDataSource";
import { PersonDataSource as InMemoryPersonDataSource } from "./inMemory/PersonDataSource";
import { Person } from './types';

export const cosmosDataSources = () => {

  if(!process.env.COSMOS_PRIMARY_KEY || process.env.COSMOS_PRIMARY_KEY.length === 0) throw new Error("Authentication failed on the Servcer side");

  const authenticator = new Gremlin.driver.auth.PlainTextSaslAuthenticator(
    `/dbs/${configuration.database}/colls/${configuration.collection}`, process.env.COSMOS_PRIMARY_KEY
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

const persons: Person[] = [];
export const inMemoryDataSources = () => ({
  person: new InMemoryPersonDataSource(persons),
});
