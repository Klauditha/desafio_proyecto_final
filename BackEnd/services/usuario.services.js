const { faker } = require('@faker-js/faker');

class UsuarioService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        primerNombre: faker.person.firstName(),
        segundoNombre: faker.person.firstName(),
        primerApellido: faker.person.lastName(),
        segundoApellido: faker.person.lastName(),
        correo: faker.internet.email(),
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
}

module.exports = UsuarioService