export default {
    User: [
        {
            id: 0,
            userName: 'Illegal',
            matchHistory: [],
            nbVictories: 42,
            nbLosses: 0,
            ladderLevel: 1,
            achievements: [],
            friends: [],
            blockedUsers: [],
            channelsUserIsOwner: [],
            channelsUserIsAdmin: [],
            channelsUserIsIn: [],
            channelsUserIsBanned: [],
            channelsUserIsMuted: [],
            messagesHistory: []
        },
        ////////////
        /// CATS ///
        ////////////
        {
            id: 100,
            userName: 'Norminet',
            matchHistory: [],
            nbVictories: 42,
            nbLosses: 0,
            ladderLevel: 1,
            achievements: [18, 8, 14, 11, 5, 31, 27, 13, 16, 29, 15, 23, 6, 33, 25, 9, 20, 7, 19, 17, 12, 2, 30, 28, 10, 32, 22, 26, 24, 4, 3, 1, 21],
            friends: [101, 102],
            blockedUsers: [200, 201, 202],
            channelsUserIsOwner: ['CatClub'],
            channelsUserIsAdmin: ['CatClub'],
            channelsUserIsIn: ['CatClub'],
            channelsUserIsBanned: ['DogClub'],
            channelsUserIsMuted: [],
            messagesHistory: [1]
        },
        {
            id: 101,
            userName: 'Grumpy',
            matchHistory: [],
            nbVictories: 24,
            nbLosses: 15,
            ladderLevel: 3,
            achievements: [22, 11, 2],
            friends: [100, 102],
            blockedUsers: [200, 201, 202],
            channelsUserIsOwner: [],
            channelsUserIsAdmin: ['CatClub'],
            channelsUserIsIn: ['CatClub'],
            channelsUserIsBanned: ['DogClub'],
            channelsUserIsMuted: [],
            messagesHistory: [2]
        },
        {
            id: 102,
            userName: 'HelloKitty',
            matchHistory: [],
            nbVictories: 10,
            nbLosses: 12,
            ladderLevel: 7,
            achievements: [21, 2, 13],
            friends: [100, 101],
            blockedUsers: [200, 201, 202],
            channelsUserIsOwner: [],
            channelsUserIsAdmin: ['CatClub'],
            channelsUserIsIn: ['CatClub'],
            channelsUserIsBanned: ['DogClub'],
            channelsUserIsMuted: [],
        },
        ////////////
        /// DOGS ///
        ////////////
        {
            id: 200,
            userName: 'Milou',
            matchHistory: [],
            nbVictories: 40,
            nbLosses: 1,
            ladderLevel: 2,
            achievements: [20, 9, 18],
            friends: [201, 202],
            blockedUsers: [100, 101, 102],
            channelsUserIsOwner: ['DogClub'],
            channelsUserIsAdmin: ['DogClub'],
            channelsUserIsIn: ['DogClub'],
            channelsUserIsBanned: ['CatClub'],
            channelsUserIsMuted: [],
            messagesHistory: [3]
        },
        {
            id: 201,
            userName: 'Lassie',
            matchHistory: [],
            nbVictories: 30,
            nbLosses: 10,
            ladderLevel: 4,
            achievements: [24, 10, 2],
            friends: [200, 202],
            blockedUsers: [100, 101, 102],
            channelsUserIsOwner: [],
            channelsUserIsAdmin: ['DogClub'],
            channelsUserIsIn: ['DogClub'],
            channelsUserIsBanned: ['CatClub'],
            channelsUserIsMuted: [],
            messagesHistory: [4]
        },
        {
            id: 202,
            userName: 'Idefix',
            matchHistory: [],
            nbVictories: 20,
            nbLosses: 7,
            ladderLevel: 6,
            achievements: [19, 17, 13],
            friends: [200, 201],
            blockedUsers: [100, 101, 102],
            channelsUserIsOwner: [],
            channelsUserIsAdmin: ['DogClub'],
            channelsUserIsIn: ['DogClub'],
            channelsUserIsBanned: ['CatClub'],
            channelsUserIsMuted: [],
        },
        //////////////
        /// FISHES ///
        //////////////
        {
            id: 300,
            userName: 'Nemo',
            matchHistory: [],
            nbVictories: 10,
            nbLosses: 1,
            ladderLevel: 5,
            achievements: [14, 12, 4],
            friends: [301, 302],
            blockedUsers: [],
            channelsUserIsOwner: ['SecretClub'],
            channelsUserIsAdmin: [],
            channelsUserIsIn: ['CatClub', 'DogClub', 'SecretClub'],
            channelsUserIsBanned: [],
            channelsUserIsMuted: [],
            messagesHistory: [5]
        },
        {
            id: 301,
            userName: 'Dory',
            matchHistory: [],
            nbVictories: 12,
            nbLosses: 46,
            ladderLevel: 9,
            achievements: [17, 18, 13],
            friends: [300, 302],
            blockedUsers: [],
            channelsUserIsOwner: [],
            channelsUserIsAdmin: [],
            channelsUserIsIn: ['CatClub', 'DogClub', 'SecretClub'],
            channelsUserIsBanned: [],
            channelsUserIsMuted: [],
            messagesHistory: [6, 8]
        },
        {
            id: 302,
            userName: 'Marin',
            matchHistory: [],
            nbVictories: 10,
            nbLosses: 20,
            ladderLevel: 8,
            achievements: [14, 10, 8],
            friends: [300, 301],
            blockedUsers: [],
            channelsUserIsOwner: [],
            channelsUserIsAdmin: [],
            channelsUserIsIn: ['CatClub', 'DogClub', 'SecretClub'],
            channelsUserIsBanned: [],
            channelsUserIsMuted: [],
            messagesHistory: [7]
        }
    ],
    Channel: [
        {
            channelName: 'CatClub',
            owner: 100,
            password: null,
            isPublic: true,
            admins: [100, 101, 102],
            users: [100, 101, 102, 300, 301, 302],
            banList: [200, 201, 202],
            muteList: [],
            messagesHistory: [1, 2]
        },
        {
            channelName: 'DogClub',
            owner: 200,
            password: null,
            isPublic: true,
            admins: [200, 201, 202],
            users: [200, 201, 202, 300, 301, 302],
            banList: [100, 102, 103],
            muteList: [],
            messagesHistory: [3, 4]
        },
        {
            channelName: 'SecretClub',
            owner: 300,
            password: 'FishyFin',
            isPublic: false,
            admins: [],
            users: [300, 301, 302],
            banList: [],
            muteList: [],
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