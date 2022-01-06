const METHODS = {
    "POST": "POST",
    "GET": "GET"
}

const dictionary = {
    auth: {
        login: {
            service: 'auth/login', 
            method: METHODS.POST,
            token: false
        },
        appleLogin: {
            service: 'auth/login-social-apple', 
            method: METHODS.POST,
            token: false
        },
        facebookLogin: {
            service: 'auth/login-social-facebook', 
            method: METHODS.POST,
            token: false
        },
        googleLogin: {
            service: 'auth/login-social-google', 
            method: METHODS.POST,
            token: false
        },
        loginAnonym: {
            service: 'auth/login-anonym', 
            method: METHODS.POST,
            token: false
        },
        statusToken: {
            service: 'auth/status-token', 
            method: METHODS.GET,
            token: true
        },
        logout: {
            service: 'auth/logout',
            method: METHODS.POST,
            token: true
        }
    },
    users: {
        getUserMe: { 
            service: 'users/me', 
            method: METHODS.GET,
            token: true
        },
        inscription: { 
            service: 'users/new', 
            method: METHODS.POST,
            token: false
        },

        inscriptionSocial: { 
            service: 'users/new-client-social', 
            method: METHODS.POST,
            token: false
        },
        passwordRecovery: { 
            service: 'users/password-recovery', 
            method: METHODS.GET,
            token: false
        },
        verifyUser: {
            service: 'users/verify-user', 
            method: METHODS.GET,
            token: false
        },
        updatePassword: {
            service: 'users/update-password', 
            method: METHODS.POST,
            token: true
        },
        setUserProfile: {
            service: 'userclient/set-user-profile',
            token: true,
            method: METHODS.POST,
        },
        updateUserProfile: {
            service: 'userclient/update-user-profile',
            token: true,
            method: METHODS.POST,
        },
        updateUserSettings: {
            service: 'users/settings',
            token: true,
            method: METHODS.POST,
        },
        getUsers: { 
            service: 'users/get-available', 
            token: true,
            method: METHODS.GET,
        },
        getPublicUsers: { 
            service: 'userclient/public-users', 
            token: true,
            method: METHODS.GET,
        },
        usersDetail: {
            service: 'userclient/user-detail',
            token: true,
            method: METHODS.GET
        }
    },

    sns: {
        isDeviceRegistered: { 
            service: 'sns/is-device-registered', 
            token: true,
            method: METHODS.GET
        },
        registerDevice: { 
            service: 'sns/register-user-device', 
            token: true,
            method: METHODS.POST 
        },
        updateBadges: { 
            service: 'sns/reset-badges-count', 
            token: true,
            method: METHODS.POST 
        },
        removeDeviceNotifications: { 
            service: 'sns/remove-user-device', 
            token: true,
            method: METHODS.POST 
        },
        usersPush: { 
            service: 'sns/user-push-notifications', 
            token: true,
            method: METHODS.GET 
        },
        updateUsersPush: { 
            service: 'sns/update-user-push-notifications', 
            token: true,
            method: METHODS.POST 
        },
        sendNotification: { 
            service: 'sns/send-notification', 
            token: true,
            method: METHODS.POST
        },
        updateChatMeessages: {
            service: 'users/update-chat-messages', 
            token: true,
            method: METHODS.POST
        }
    },

    userClient: {
        updateProducerLiked: { 
            service: 'userclient/update-producer-liked', 
            token: true,
            method: METHODS.POST
        },
        getProducersLiked: { 
            service: 'userclient/producers-liked', 
            token: true,
            method: METHODS.GET
        },
        updateNotificationStatus: {
            service: 'userclient/update-notification-status', 
            token: true,
            method: METHODS.POST
        },
        updateUserInfo: {
            service: 'userclient/update-user-info', 
            token: true,
            method: METHODS.POST
        },
        setBillingInfo: {
            service: 'userclient/set-billing-info', 
            token: true,
            method: METHODS.POST
        },
        getBillingInfo: {
            service: 'userclient/get-billing-info', 
            token: true,
            method: METHODS.GET
        },
    },

    flashNotification: {
        getSentNotifications: {
            service: 'flashnotification/get-sent-notifications', 
            token: true,
            method: METHODS.GET
        },
        getDetail: {
            service: 'flashnotification/get', 
            token: true,
            method: METHODS.GET
        }
    },

    orders: {
        getMeOrders: { 
            service: 'orders/get-me-orders', 
            token: true,
            method: METHODS.GET
        },
        getClientOrderDetails: { 
            service: 'orders/get-client-order-details', 
            token: true,
            method: METHODS.GET
        },
        reclaimOrder: { 
            service: 'orders/reclaim-order', 
            token: true,
            method: METHODS.POST
        },
    },

    userPayment: {
        doPaymentWithCard: { 
            service: 'userpayment/do-payment-with-card', 
            token: true,
            method: METHODS.POST
        },
        getClientInvoices: { 
            service: 'userpayment/client-invoices', 
            token: true,
            method: METHODS.GET
        },
        createReport: { 
            service: 'userpayment/create-client-report', 
            token: true,
            method: METHODS.POST
        },
    },

    contacts: {
        getPublicContacts: {
            service: 'userclient/public-users',
            token: true,
            method: METHODS.GET,
        },
    },

    subscriptions: {
        getSubscriptions: {
            service: 'subscriptions/me',
            token: true,
            method: METHODS.GET,
        },
        getSentSubscriptions: {
            service: 'subscriptions/me-sent',
            token: true,
            method: METHODS.GET,
        },
        getMemosFromSubscriptions: {
            service: 'subscriptions/user-network-memos',
            token: true,
            method: METHODS.GET,
        },
        newRequest: {
            service: 'subscriptions/new-request',
            token: true,
            method: METHODS.POST,
        },
        acceptRequest: {
            service: 'subscriptions/accept-request',
            token: true,
            method: METHODS.POST,
        },
        refuseRequest: {
            service: 'subscriptions/refuse-request',
            token: true,
            method: METHODS.POST,
        },
        unSubscribe: {
            service: 'subscriptions/remove-subscription',
            token: true,
            method: METHODS.POST,
        },
    },

    book: {
        addBook: {
            service: 'library/book',
            token: true,
            method: METHODS.POST,
        },
        getLibrary: {
            service: 'library/me',
            token: true,
            method: METHODS.GET,
        },
        getLibraryComplete: {
            service: 'library/me-complete',
            token: true,
            method: METHODS.GET,
        },
        getPublicLibrary: {
            service: 'library/user',
            token: true,
            method: METHODS.GET,
        }
    },
    vendre: {
        add: {
            service: 'article/new',
            token: true,
            method: METHODS.POST
        },
        filters: {
            service: 'article/filters',
            token: true,
            method: METHODS.GET
        },
        update : {
            service: 'article/update',
            token: true,
            method: METHODS.POST
        }
    },
    memos: {
        addMemo: {
            service: 'memos/new',
            token: true,
            method: METHODS.POST,
        },
        updateMemo: {
            service: 'memos/update',
            token: true,
            method: METHODS.POST,
        },
        removeMemo: {
            service: 'memos/remove',
            token: true,
            method: METHODS.POST,
        },
        getBookMemos: {
            service: 'memos/book-memos',
            token: true,
            method: METHODS.GET,
        },
        getMemosFromUser: {
            service: 'memos/memos',
            token: true,
            method: METHODS.GET,
        },
    },
    
    publications: {
        getPublicationsAvaliable: {
            service: 'publication/available',
            token: true,
            method: METHODS.GET
        },
        getPublicationDetail: {
            service: 'publication/detail',
            token: true,
            method: METHODS.GET
        },
        getPublicationsWithFilter: {
            service: 'publication/with-filters',
            token: true,
            method: METHODS.GET
        },
    },

    log: {
        newEvent: {
            service: 'log/new-events', 
            token: true,
            method: METHODS.POST
        },
        opendedArticle: {
            service: 'log/new-events-open', 
            token: true,
            method: METHODS.POST
        },
    },

    localization: {
        getLocalization: {
            service: 'localization/get', 
            token: false,
            method: METHODS.GET
        },
        getContentLangs: {
            service: 'localization/get-languages', 
            token: false,
            method: METHODS.GET
        }
    },
    products: {
        list: {
            service: 'article/list',
            token: true,
            method: METHODS.GET
        },
        detail : {
            service : 'article/detail',
            token: true,
            method: METHODS.GET
        },
        related : {
            service: 'product/related',
            token: true,
            method: METHODS.GET
        }
    },

    order: {
        newOrder: {
            service: 'orders/new',
            token: true,
            method: METHODS.POST
        },
        detailOrder: {
            service: 'orders/detail',
            token: true,
            method: METHODS.GET
        },
        listOrder: {
            service: 'orders/list',
            token: true,
            method: METHODS.GET
        },
        endOrder: {
            service: 'orders/update/status-order-5',
            token: true,
            method: METHODS.POST
        },
        rejectOrder: {
            service: 'orders/update/status-order-7',
            token: true,
            method: METHODS.POST
        },
        clientVideo: {
            service: 'orders/new/client-video',
            token: true,
            method: METHODS.POST
        },
        customerVideo: {
            service: 'orders/new/customer-video',
            token: true,
            method: METHODS.POST
        }

    },

    litige: {
        newLitige: {
            service: 'litige/new',
            token: true,
            method: METHODS.POST
        }
    },
    
    categories: {
        mainCat: {
            service: 'manage/all/category',
            token: true,
            method: METHODS.GET
        },
        cats: {
            service: 'manage/all/sub-category',
            token: true,
            method: METHODS.GET
        },
        marques: {
            service: 'manage/all/marque',
            token: true,
            method: METHODS.GET
        },
        sizes: {
            service: 'manage/all/taille',
            token: true,
            method: METHODS.GET
        },
        coileurs: {
            service : 'manage/all/coileurs',
            token: true,
            method: METHODS.GET
        },
        etat: {
            service: 'manage/all/etat',
            token: true,
            method: METHODS.GET
        },
        authenticite: {
            service: 'manage/all/authenticite',
            token: true,
            mkethod: METHODS.GET
        },
        getSubCategorysById: {
            service: 'manage/get/sub-categories',
            token: true,
            method: METHODS.GET
        }
    },
    
    address: {
        newAddress: {
            service: 'address/new',
            token: true,
            method: METHODS.POST
        },
        addressList: {
            service: 'address/list',
            token: true,
            method: METHODS.GET
        }
    },

    updateUserMe: { service: 'users/update-info', type: 'POST' },
    updateUserPassword: { service: 'users/update-password', type: 'POST' },
    updateUserAddress: { service: 'users/update-profile', type: 'POST' },
    setProfile: { service: 'users/set-profile', type: 'POST' },

    contactSend: { service: 'contact/send', type: 'POST' },

    newPublish: { service: 'publish/new', type: 'POST' },
    updatePublish: { service: 'publish/update', type: 'POST' },
    removePublish: { service: 'publish/remove', type: 'POST' },
    userPublish: { service: 'publish/get-user', type: 'GET' },
    availablePublish: { service: 'publish/get-available', type: 'GET' },
    searchPublish: { service: 'publish/get-by-search', type: 'GET' },

    getLocationsByType: { service: 'location/get-available-by-type', type: 'GET' },
    getLocationsByParent: { service: 'location/get-available-by-parent', type: 'GET' },
    getLocationsAvailable: { service: 'location/get-available', type: 'GET' },

    
    getAvailableProducts: {service: 'product/get-available-products', type: 'GET'},
    getAvailableNews: {service: 'news/get-available-news', type: 'GET'},
    getAvailableQuestionaires: {service: 'questionaire/get-available-questionaires', type: 'GET'},
    getQuestionaire: {service: 'questionaire/get', type: 'GET'},
    setAnswers: {service: 'answers/new', type: 'POST'},
    
    
    getusermepremium: { service: 'users/me-premium', type: 'POST' },
    getAvailableCategories: { service: 'category/get-available-categories', type: 'GET' },
    getPodcastWithId: { service: 'podcast/get', type: 'GET' },
    getPodcastsCategories: { service: 'podcast/get-podcasts-and-categories', type: 'GET' },
    getAvailablePodcasts: { service: 'podcast/get-available-podcasts', type: 'GET' },
    getUserPodcasts: { service: 'user_podcasts/get-all', type: 'GET' },
    getUserPodcastsWithId: { service: 'user_podcasts/get', type: 'GET' },
    updateUserPodcasts: { service: 'user_podcasts/update', type: 'POST' },
    userPodcastAvailable: { service: 'user_podcasts/is-available', type: 'GET' },
    getSentNotifications: { service: 'flashnotification/get-sent-notifications', type: 'GET' },
    getNotificationDetailed: { service: 'flash_notification/get', type: 'GET' },
    getHome: { service: 'home/get', type: 'GET' },
    subscriptionPayment: { service: 'payment/new_subscription_token', type: 'POST' },
    cancelSubscription: { service: 'payment/cancel_subscription', type: 'POST' },
    updateUserSettings: { service: 'users/settings', type: 'POST' },

    getuser: { service: 'get-user', type: 'POST' },
    getuserUpdate: { service: 'get-user-update', type: 'POST' },

    getUsers: { service: 'users/get-all-users', type: 'GET' },
    getUserAdmin: { service: 'users/get-all-admin', type: 'GET' },
    sendMessageNotification: { service: 'sns/send-notification', type: 'GET' },

    updateuser: { service: 'users/update-user', type: 'POST' },
    updateChatMeessages: { service: 'users/update-chat-messages', type: 'POST' },

    newuser: { service: 'new-user', type: 'POST' },
    deleteuser: { service: 'delete-user', type: 'POST' },
    getestablishment: { service: 'get-establishment', type: 'POST' },
    getcook: { service: 'cook/get', type: 'GET' },
    getCookPlannings: { service: 'cook/getCookPlannings', type: 'GET' },
    getConsumption: { service: 'consumption/get', type: 'GET' },
    getActiveConsumption: { service: 'consumption/getActive', type: 'GET' },
    updateConsumption: { service: 'consumption/update', type: 'POST' },
    setActiveConsumption: { service: 'consumption/setActive', type: 'POST' },
    updatecook: { service: 'cook/updateCook', type: 'POST' },
    updateCookDurationClients: { service: 'cook/update/duration', type: 'POST' },
    updateCookProducts: { service: 'cook/update/products', type: 'POST' },
    updateCookSettings: { service: 'cook/update/settings', type: 'POST' },
    verifyCookSchedule: { service: 'cook/verify/schedule', type: 'POST' },
    prepareCookNotifications: { service: 'cookNotifications/prepare', type: 'POST' },
    
    
}

export default class WebApiServicesDictionary {

    constructor() { }

    static get dictionary() {
        return dictionary;
    }

    static get methods() {
        return METHODS;
    }

}
