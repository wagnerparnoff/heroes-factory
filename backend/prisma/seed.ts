import { prisma } from '../src/infrastructure/prisma/client.ts';
const heroesData = [
    {
        name: 'Clark Kent',
        nickname: 'Superman',
        dateOfBirth: new Date('1938-04-18'),
        universe: 'DC',
        mainPower: 'Super Strength',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/791.jpg', // Superman
    },
    {
        name: 'Bruce Wayne',
        nickname: 'Batman',
        dateOfBirth: new Date('1939-05-27'),
        universe: 'DC',
        mainPower: 'Wealth and Intellect',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/639.jpg', // Batman
    },
    {
        name: 'Diana Prince',
        nickname: 'Wonder Woman',
        dateOfBirth: new Date('1941-10-21'),
        universe: 'DC',
        mainPower: 'Super Strength',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/1496.jpg', // Wonder Woman
    },
    {
        name: 'Barry Allen',
        nickname: 'The Flash',
        dateOfBirth: new Date('1956-10-01'),
        universe: 'DC',
        mainPower: 'Super Speed',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/1000.jpg', // The Flash (aprox)
    },
    {
        name: 'Arthur Curry',
        nickname: 'Aquaman',
        dateOfBirth: new Date('1941-11-01'),
        universe: 'DC',
        mainPower: 'Water Telepathy',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/732.jpg', // Aquaman
    },
    {
        name: 'Hal Jordan',
        nickname: 'Green Lantern',
        dateOfBirth: new Date('1959-10-01'),
        universe: 'DC',
        mainPower: 'Power Ring',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg', // Green Lantern
    },
    {
        name: 'Peter Parker',
        nickname: 'Spider-Man',
        dateOfBirth: new Date('1962-08-10'),
        universe: 'Marvel',
        mainPower: 'Wall-crawling',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/133.jpg', // Spider-Man
    },
    {
        name: 'Tony Stark',
        nickname: 'Iron Man',
        dateOfBirth: new Date('1963-03-01'),
        universe: 'Marvel',
        mainPower: 'Powered Armor',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/1455.jpg', // Iron Man
    },
    {
        name: 'Steve Rogers',
        nickname: 'Captain America',
        dateOfBirth: new Date('1941-03-01'),
        universe: 'Marvel',
        mainPower: 'Super Soldier Serum',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/1008.jpg', // Captain America
    },
    {
        name: 'Thor Odinson',
        nickname: 'Thor',
        dateOfBirth: new Date('1962-08-01'),
        universe: 'Marvel',
        mainPower: 'God of Thunder',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/1005.jpg', // Thor
    },
    {
        name: 'Bruce Banner',
        nickname: 'Hulk',
        dateOfBirth: new Date('1962-05-01'),
        universe: 'Marvel',
        mainPower: 'Super Strength',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/1004.jpg', // Hulk
    },
    {
        name: 'Natasha Romanoff',
        nickname: 'Black Widow',
        dateOfBirth: new Date('1964-04-01'),
        universe: 'Marvel',
        mainPower: 'Expert Spy',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/1009.jpg', // Black Widow
    },
    {
        name: 'Wanda Maximoff',
        nickname: 'Scarlet Witch',
        dateOfBirth: new Date('1964-03-01'),
        universe: 'Marvel',
        mainPower: 'Chaos Magic',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/1010.jpg', // Scarlet Witch
    },
    {
        name: 'Stephen Strange',
        nickname: 'Doctor Strange',
        dateOfBirth: new Date('1963-07-01'),
        universe: 'Marvel',
        mainPower: 'Magic',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/1011.jpg', // Doctor Strange
    },
    {
        name: 'T\'Challa',
        nickname: 'Black Panther',
        dateOfBirth: new Date('1966-07-01'),
        universe: 'Marvel',
        mainPower: 'Enhanced Senses',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/1012.jpg', // Black Panther
    },
    {
        name: 'Carol Danvers',
        nickname: 'Captain Marvel',
        dateOfBirth: new Date('1968-03-01'),
        universe: 'Marvel',
        mainPower: 'Energy Projection',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/1013.jpg', // Captain Marvel
    },
    {
        name: 'Matt Murdock',
        nickname: 'Daredevil',
        dateOfBirth: new Date('1964-04-01'),
        universe: 'Marvel',
        mainPower: 'Radar Sense',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/1014.jpg', // Daredevil
    },
    {
        name: 'Logan',
        nickname: 'Wolverine',
        dateOfBirth: new Date('1974-10-01'),
        universe: 'Marvel',
        mainPower: 'Healing Factor',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/1015.jpg', // Wolverine
    },
    {
        name: 'Oliver Queen',
        nickname: 'Green Arrow',
        dateOfBirth: new Date('1941-11-01'),
        universe: 'DC',
        mainPower: 'Archery',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/732.jpg', // Green Arrow (aprox)
    },
    {
        name: 'Victor Stone',
        nickname: 'Cyborg',
        dateOfBirth: new Date('1980-10-01'),
        universe: 'DC',
        mainPower: 'Technopathy',
        avatarUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/1016.jpg', // Cyborg
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