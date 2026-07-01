import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });
const heroesData = [
    {
        name: 'Clark Kent',
        nickname: 'Superman',
        dateOfBirth: new Date('1938-04-18'),
        universe: 'DC',
        mainPower: 'Super Strength',
        avatarUrl: 'https://example.com/superman.jpg',
    },
    {
        name: 'Bruce Wayne',
        nickname: 'Batman',
        dateOfBirth: new Date('1939-05-27'),
        universe: 'DC',
        mainPower: 'Wealth and Intellect',
        avatarUrl: 'https://example.com/batman.jpg',
    },
    {
        name: 'Diana Prince',
        nickname: 'Wonder Woman',
        dateOfBirth: new Date('1941-10-21'),
        universe: 'DC',
        mainPower: 'Super Strength',
        avatarUrl: 'https://example.com/wonderwoman.jpg',
    },
    {
        name: 'Barry Allen',
        nickname: 'The Flash',
        dateOfBirth: new Date('1956-10-01'),
        universe: 'DC',
        mainPower: 'Super Speed',
        avatarUrl: 'https://example.com/flash.jpg',
    },
    {
        name: 'Arthur Curry',
        nickname: 'Aquaman',
        dateOfBirth: new Date('1941-11-01'),
        universe: 'DC',
        mainPower: 'Water Telepathy',
        avatarUrl: 'https://example.com/aquaman.jpg',
    },
    {
        name: 'Hal Jordan',
        nickname: 'Green Lantern',
        dateOfBirth: new Date('1959-10-01'),
        universe: 'DC',
        mainPower: 'Power Ring',
        avatarUrl: 'https://example.com/greenlantern.jpg',
    },
    {
        name: 'Peter Parker',
        nickname: 'Spider-Man',
        dateOfBirth: new Date('1962-08-10'),
        universe: 'Marvel',
        mainPower: 'Wall-crawling',
        avatarUrl: 'https://example.com/spiderman.jpg',
    },
    {
        name: 'Tony Stark',
        nickname: 'Iron Man',
        dateOfBirth: new Date('1963-03-01'),
        universe: 'Marvel',
        mainPower: 'Powered Armor',
        avatarUrl: 'https://example.com/ironman.jpg',
    },
    {
        name: 'Steve Rogers',
        nickname: 'Captain America',
        dateOfBirth: new Date('1941-03-01'),
        universe: 'Marvel',
        mainPower: 'Super Soldier Serum',
        avatarUrl: 'https://example.com/captainamerica.jpg',
    },
    {
        name: 'Thor Odinson',
        nickname: 'Thor',
        dateOfBirth: new Date('1962-08-01'),
        universe: 'Marvel',
        mainPower: 'God of Thunder',
        avatarUrl: 'https://example.com/thor.jpg',
    },
    {
        name: 'Bruce Banner',
        nickname: 'Hulk',
        dateOfBirth: new Date('1962-05-01'),
        universe: 'Marvel',
        mainPower: 'Super Strength',
        avatarUrl: 'https://example.com/hulk.jpg',
    },
    {
        name: 'Natasha Romanoff',
        nickname: 'Black Widow',
        dateOfBirth: new Date('1964-04-01'),
        universe: 'Marvel',
        mainPower: 'Expert Spy',
        avatarUrl: 'https://example.com/blackwidow.jpg',
    },
    {
        name: 'Wanda Maximoff',
        nickname: 'Scarlet Witch',
        dateOfBirth: new Date('1964-03-01'),
        universe: 'Marvel',
        mainPower: 'Chaos Magic',
        avatarUrl: 'https://example.com/scarletwitch.jpg',
    },
    {
        name: 'Stephen Strange',
        nickname: 'Doctor Strange',
        dateOfBirth: new Date('1963-07-01'),
        universe: 'Marvel',
        mainPower: 'Magic',
        avatarUrl: 'https://example.com/doctorstrange.jpg',
    },
    {
        name: 'T\'Challa',
        nickname: 'Black Panther',
        dateOfBirth: new Date('1966-07-01'),
        universe: 'Marvel',
        mainPower: 'Enhanced Senses',
        avatarUrl: 'https://example.com/blackpanther.jpg',
    },
    {
        name: 'Carol Danvers',
        nickname: 'Captain Marvel',
        dateOfBirth: new Date('1968-03-01'),
        universe: 'Marvel',
        mainPower: 'Energy Projection',
        avatarUrl: 'https://example.com/captainmarvel.jpg',
    },
    {
        name: 'Matt Murdock',
        nickname: 'Daredevil',
        dateOfBirth: new Date('1964-04-01'),
        universe: 'Marvel',
        mainPower: 'Radar Sense',
        avatarUrl: 'https://example.com/daredevil.jpg',
    },
    {
        name: 'Logan',
        nickname: 'Wolverine',
        dateOfBirth: new Date('1974-10-01'),
        universe: 'Marvel',
        mainPower: 'Healing Factor',
        avatarUrl: 'https://example.com/wolverine.jpg',
    },
    {
        name: 'Oliver Queen',
        nickname: 'Green Arrow',
        dateOfBirth: new Date('1941-11-01'),
        universe: 'DC',
        mainPower: 'Archery',
        avatarUrl: 'https://example.com/greenarrow.jpg',
    },
    {
        name: 'Victor Stone',
        nickname: 'Cyborg',
        dateOfBirth: new Date('1980-10-01'),
        universe: 'DC',
        mainPower: 'Technopathy',
        avatarUrl: 'https://example.com/cyborg.jpg',
    }
];
async function main() {
    console.log('Start seeding...');
    for (const hero of heroesData) {
        const createdHero = await prisma.hero.create({
            data: hero,
        });
        console.log(`Created hero with id: ${createdHero.id} (${createdHero.nickname})`);
    }
    console.log('Seeding finished.');
}
main()
    .catch(async (e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map