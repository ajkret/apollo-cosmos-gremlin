const resolvers = {
  Query: {
    person(_, { id }, { dataSources }) {
      return dataSources.person.getPerson(id);
    }
  },
  Mutation: {
    async createPerson(_, {name, age, interests}, { dataSources }) {
      const person = await dataSources.person.createPerson(name, age, interests);

      return person;
    },
//    async addInterestToPerson(_, { id, description, interests }, { dataSources }) {
//     const interest = await dataSources.interest.createUser(description);
//      const person = await dataSources.person.getPerson(id);
//      person.interests.push(interest);
//      await dataSources.person.updatePerson(person);
//
//      return interest;
//    },
  },
};

export default resolvers;
