export type ConfigurationType = {
    endpoint: string;
    primaryKey: string;
    database: string;
    collection: string;
  };
  

export const configuration : ConfigurationType = {
    endpoint : "wss://kb-cosmos-gremlin-provisioned.gremlin.cosmos.azure.com:443/gremlin",
    primaryKey : "kivXbedaSSEmsfR4lwX0ns4IEBRQ4gOXaceB0sNFcIk8yoEkd4D4xlA4OCxqFZEZLopvE7Ig7MlzhB8XlpQ75w==",
    database : "graphdb",
    collection : "Persons",
};
