import { faker } from "@faker-js/faker";
import { Thread, User } from "../types/threads";

export function createRandomFollower(): User {
  return {
    id: faker.string.uuid(),
    photo: faker.image.avatar(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    verified: Math.random() >= 0.5,
    bio: faker.person.bio(),
    username: faker.internet.userName(),
    link: faker.internet.url(),
  };
}

export function createRandomUser(): User {
  return {
    id: faker.string.uuid(),
    photo: faker.image.avatar(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    verified: Math.random() >= 0.5,
    bio: faker.person.bio(),
    username: faker.internet.userName(),
    link: faker.internet.url(),
    followers: new Array(Math.floor(Math.random() * 10))
      .fill(null)
      .map((_) => createRandomFollower()),
  };
}

export function createRandomThread(): Thread {
  return {
    id: faker.string.uuid(),
    author: createRandomUser(),
    content: faker.lorem.paragraph(),
    image: Math.random() >= 0.5 ? faker.image.url() : undefined,
    replies: new Array(Math.floor(Math.random() * 10)).fill(null).map(() => ({
      id: faker.string.uuid(),
      author: createRandomUser(),
      content: faker.lorem.sentence(),
      likesCount: Math.floor(Math.random() * 1000),
      createdAt: faker.date.recent().toISOString(),
    })),
    repliesCount: Math.floor(Math.random() * 100),
    likesCount: Math.floor(Math.random() * 1000),
    mention: Math.random() >= 0.5,
    mentionUser: createRandomUser(),
    createdAt: faker.date.recent().toISOString(),
  };
}

export function generateThreads(n: number): Thread[] {
  return new Array(n).fill(null).map((_) => createRandomThread());
}
