const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create person', async () => {
    expect.assertions(1);
    const person = await db.Person.create({
        id: 1,
        username: 'Bobbie',
        email: 'Draper',
        password: '123321'
    });
    expect(person.id).toEqual(1);
});

test('get person', async () => {
    expect.assertions(3);
    const person = await db.Person.findByPk(1);
    expect(person.username).toEqual('Bobbie');
    expect(person.email).toEqual('Draper');
    expect(person.password).toEqual('123321');
});

test('delete person', async () => {
    expect.assertions(1);
    await db.Person.destroy({
        where: {
            id: 1
        }
    });
    const person = await db.Person.findByPk(1);
    expect(person).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});