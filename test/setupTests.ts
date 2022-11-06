import { faker } from '@faker-js/faker';

process.env = {
    SECRET_KEY: faker.random.alphaNumeric(),
    HOST_PORT: faker.internet.port().toString(),
    DB_HOST: faker.random.alphaNumeric(),
    DB_USER: faker.random.alphaNumeric(),
    DB_PASSWORD: faker.random.alphaNumeric(),
    DB_NAME: faker.random.alphaNumeric(),
    DB_PORT: faker.internet.port().toString(),
    REDIS_HOST: faker.random.alphaNumeric(),
    REDIS_PORT: faker.internet.port().toString(),
    DB_URL: faker.random.alphaNumeric(),
};

export { };
