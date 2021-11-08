export default {
    User: [
        ////////////
        /// CATS ///
        ////////////
        {
            id: 100,
            userName: 'Norminet',
            nbVictories: 42,
            nbLosses: 0,
            ladderLevel: 1,
            achievements: ['Mouse Chaser', 'Ungrateful Bastard', 'Silent King of the School'],
            friends: [101, 102],
            blockedUsers: [200, 201, 202],
            channelsUserIsOwner: ['CatClub'],
            channelsUserIsAdmin: ['CatClub'],
            channelsUserIsIn: ['CatClub'],
            channelsUserIsBanned: ['DogClub'],
            messagesHistory: [1]
        },
        {
            id: 101,
            userName: 'Grumpy',
            nbVictories: 24,
            nbLosses: 15,
            ladderLevel: 3,
            achievements: ['Mouse Chaser'],
            friends: [100, 102],
            blockedUsers: [200, 201, 202],
            channelsUserIsAdmin: ['CatClub'],
            channelsUserIsIn: ['CatClub'],
            channelsUserIsBanned: ['DogClub'],
            messagesHistory: [2]
        },
        {
            id: 102,
            userName: 'HelloKitty',
            nbVictories: 10,
            nbLosses: 12,
            ladderLevel: 7,
            achievements: ['Mouse Chaser'],
            friends: [100, 101],
            blockedUsers: [200, 201, 202],
            channelsUserIsAdmin: ['CatClub'],
            channelsUserIsIn: ['CatClub'],
            channelsUserIsBanned: ['DogClub'],
        },
        ////////////
        /// DOGS ///
        ////////////
        {
            id: 200,
            userName: 'Milou',
            nbVictories: 40,
            nbLosses: 1,
            ladderLevel: 2,
            achievements: ['Man\'s best friend', 'Ball Chaser'],
            friends: [201, 202],
            blockedUsers: [100, 101, 102],
            channelsUserIsOwner: ['DogClub'],
            channelsUserIsAdmin: ['DogClub'],
            channelsUserIsIn: ['DogClub'],
            channelsUserIsBanned: ['CatClub'],
            messagesHistory: [3]
        },
        {
            id: 201,
            userName: 'Lassie',
            nbVictories: 30,
            nbLosses: 10,
            ladderLevel: 4,
            achievements: ['Man\'s best friend', 'Professional rescuer'],
            friends: [200, 202],
            blockedUsers: [100, 101, 102],
            channelsUserIsAdmin: ['DogClub'],
            channelsUserIsIn: ['DogClub'],
            channelsUserIsBanned: ['CatClub'],
            messagesHistory: [4]
        },
        {
            id: 202,
            userName: 'Idefix',
            nbVictories: 20,
            nbLosses: 7,
            ladderLevel: 6,
            achievements: ['Man\'s best friend'],
            friends: [200, 201],
            blockedUsers: [100, 101, 102],
            channelsUserIsAdmin: ['DogClub'],
            channelsUserIsIn: ['DogClub'],
            channelsUserIsBanned: ['CatClub'],
        },
        //////////////
        /// FISHES ///
        //////////////
        {
            id: 300,
            userName: 'Nemo',
            nbVictories: 10,
            nbLosses: 1,
            ladderLevel: 5,
            achievements: ['Fish out of water'],
            friends: [301, 302],
            channelsUserIsOwner: ['SecretClub'],
            channelsUserIsIn: ['CatClub', 'DogClub'],
            messagesHistory: [5]
        },
        {
            id: 301,
            userName: 'Dory',
            nbVictories: 12,
            nbLosses: 46,
            ladderLevel: 9,
            achievements: ['Fish out of water', 'Worldwide Adventurer'],
            friends: [300, 302],
            channelsUserIsIn: ['CatClub', 'DogClub', 'SecretClub'],
            messagesHistory: [6, 8]
        },
        {
            id: 302,
            userName: 'Marin',
            nbVictories: 10,
            nbLosses: 20,
            ladderLevel: 8,
            achievements: ['Fish out of water', 'Worldwide Adventurer'],
            friends: [300, 301],
            channelsUserIsOwner: ['SecretClub'],
            channelsUserIsIn: ['CatClub', 'DogClub', 'SecretClub'],
            messagesHistory: [7]
        }
    ],
    Channel: [
        {
            channelName: 'CatClub',
            owner: 100,
            isPublic: true,
            admins: [100, 101, 102],
            users: [100, 101, 102, 300, 301, 302],
            banList: [200, 201, 202],
            messagesHistory: [1, 2]
        },
        {
            channelName: 'DogClub',
            owner: 200,
            isPublic: true,
            admins: [200, 201, 202],
            users: [200, 201, 202, 300, 301, 302],
            banList: [100, 102, 103],
            messagesHistory: [3, 4]
        },
        {
            channelName: 'SecretClub',
            password: 'FishyFin',
            owner: 300,
            isPublic: false,
            users: [300, 301, 302],
            messagesHistory: [5, 6, 7, 8]
        }
    ],
    Message: [
        ////////////////
        /// CAT CLUB ///
        ////////////////
        {
            id: 1,
            channelName: 'CatClub',
            owner: 100,
            message: 'Meow !',
            dateStr: '1636395055'
        },
        {
            id: 2,
            channelName: 'CatClub',
            owner: 101,
            message: 'Cats rule !!',
            dateStr: '1636396000'
        },
        ////////////////
        /// DOG CLUB ///
        ////////////////
        {
            id: 3,
            channelName: 'DogClub',
            owner: 200,
            message: 'Waf waf !!',
            dateStr: '1636395055'
        },
        {
            id: 4,
            channelName: 'DogClub',
            owner: 201,
            message: 'Dogs are the best !',
            dateStr: '1636396000'
        },
        ///////////////////
        /// SECRET CLUB ///
        ///////////////////
        {
            id: 5,
            channelName: 'SecretClub',
            owner: 300,
            message: 'This is a secret channel for us sea-dwelling creatures.',
            dateStr: '1636395055'
        },
        {
            id: 6,
            channelName: 'SecretClub',
            owner: 301,
            message: 'A new channel, wonderful !',
            dateStr: '1636395060'
        },
        {
            id: 7,
            channelName: 'SecretClub',
            owner: 302,
            message: 'Good idea son, i\'m sure you will make a good leader on this new channel.',
            dateStr: '1636395150'
        },
        {
            id: 8,
            channelName: 'SecretClub',
            owner: 301,
            message: 'A new channel ?! What new channel ??',
            dateStr: '1636395155'
        },
    ]
}