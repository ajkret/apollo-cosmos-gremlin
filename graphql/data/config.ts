export type ConfigurationType = {
    endpoint: string;
    database: string;
    collection: string;
  };
  

export const configuration : ConfigurationType = {
    endpoint : "wss://kb-cosmos-gremlin-provisioned.gremlin.cosmos.azure.com:443/gremlin",
    database : "graphdb",
    collection : "Persons"
};
