const { faker } = require('@faker-js/faker');
const { userSchema } = require('../schemas/user.schema');

class UserService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 10;

    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        userName: faker.internet.userName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: faker.phone.number(),
        region: faker.address.country(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        zipCode: faker.address.zipCode(),
        password: faker.internet.password(),
      });
    }
  }

  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.users.push(newUser);
    //console.log(this.users);
    return newUser;
  }

  async findOne(id) {
    //const user = this.users.find((user) => user.id === id);
    const user = this.users[0];
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

module.exports = UserService;
