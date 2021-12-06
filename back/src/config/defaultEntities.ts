export default {
    User: [
        {
            id: 0,
            userName: 'Illegal',
            ladderLevel: 1,
            achievements: [],
            friends: [],
            blockedUsers: [],
        },
        ////////////
        /// CATS ///
        ////////////
        {
            id: 100,
            userName: 'Norminet',
            ladderLevel: 1,
            achievements: [18, 8, 14, 11, 5, 13, 16, 15, 6, 9, 20, 7, 19, 17, 12, 2, 10, 4, 3, 1],
            friends: [101, 102],
            blockedUsers: [200, 201, 202],
        },
        {
            id: 101,
            userName: 'Grumpy',
            ladderLevel: 3,
            achievements: [19, 11, 2],
            friends: [100, 102],
            blockedUsers: [200, 201, 202],
        },
        {
            id: 102,
            userName: 'HelloKitty',
            ladderLevel: 7,
            achievements: [20, 2, 13],
            friends: [100, 101],
            blockedUsers: [200, 201, 202],
        },
        ////////////
        /// DOGS ///
        ////////////
        {
            id: 200,
            userName: 'Milou',
            ladderLevel: 2,
            achievements: [20, 9, 18],
            friends: [201, 202],
            blockedUsers: [100, 101, 102],
        },
        {
            id: 201,
            userName: 'Lassie',
            ladderLevel: 4,
            achievements: [14, 10, 2],
            friends: [200, 202],
            blockedUsers: [100, 101, 102],
        },
        {
            id: 202,
            userName: 'Idefix',
            ladderLevel: 6,
            achievements: [19, 17, 13],
            friends: [200, 201],
            blockedUsers: [100, 101, 102],
        },
        //////////////
        /// FISHES ///
        //////////////
        {
            id: 300,
            userName: 'Nemo',
            ladderLevel: 5,
            achievements: [14, 12, 4],
            friends: [301, 302],
            blockedUsers: [],
        },
        {
            id: 301,
            userName: 'Dory',
            ladderLevel: 9,
            achievements: [17, 18, 13],
            friends: [300, 302],
            blockedUsers: [],
        },
        {
            id: 302,
            userName: 'Marin',
            ladderLevel: 8,
            achievements: [14, 10, 8],
            friends: [300, 301],
            blockedUsers: [],
        }
    ],
    ////////////////
    /// CHANNELS ///
    ////////////////
    Channel: [
        {
            channelName: 'CatClub',
            owner: 100,
            password: null,
            isProtected: false,
            isPublic: true,
            admins: [100, 101, 102],
            users: [100, 101, 102, 300, 301, 302],
            banList: [200, 201, 202],
            muteList: [],
            kickList: [],
            messagesHistory: [1, 2]
        },
        {
            channelName: 'DogClub',
            owner: 200,
            password: null,
            isProtected: false,
            isPublic: true,
            admins: [200, 201, 202],
            users: [200, 201, 202, 300, 301, 302],
            banList: [100, 102, 103],
            muteList: [],
            kickList: [],
            messagesHistory: [3, 4]
        },
        {
            channelName: 'SecretClub',
            owner: 300,
            password: 'FishyFin',
            isProtected: true,
            isPublic: false,
            admins: [],
            users: [300, 301, 302],
            banList: [],
            muteList: [],
            kickList: [],
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
    ],
    Match: [
        {
            playerOne: 100,
            playerTwo: 101,
            scorePlayerOne: 4,
            scorePlayerTwo: 5,
        },
        {
            playerOne: 200,
            playerTwo: 201,
            scorePlayerOne: 3,
            scorePlayerTwo: 5,
        },
        {
            playerOne: 300,
            playerTwo: 301,
            scorePlayerOne: 5,
            scorePlayerTwo: 1,
        },
        {
            playerOne: 102,
            playerTwo: 101,
            scorePlayerOne: 5,
            scorePlayerTwo: 4,
        },
        {
            playerOne: 200,
            playerTwo: 101,
            scorePlayerOne: 2,
            scorePlayerTwo: 5,
        },
        {
            playerOne: 201,
            playerTwo: 300,
            scorePlayerOne: 5,
            scorePlayerTwo: 0,
        },
        {
            playerOne: 102,
            playerTwo: 301,
            scorePlayerOne: 5,
            scorePlayerTwo: 2,
        },
        {
            playerOne: 102,
            playerTwo: 202,
            scorePlayerOne: 1,
            scorePlayerTwo: 5,
        },
    ]
}