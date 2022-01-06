import React, { useState, useEffect } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import SubscriptionPresenter from './subscription.presenter';
import StylesVariables from '../Styles/app.style';
import styles from '../Styles/my_circle.style';
import MyCircleList from './my_circle_list.component';
import MySubscribers from './my_subscribers.component';
import MySubscriptions from './my_subscriptions.component';
import ContactPresenter from '../User/contact.presenter';
import { formatPhoneNumber } from '../Utils/formater';
import AppStore from '../Flux/AppStore';
import * as AppActions from '../Flux/AppActions';

const MyCircleScreen = ({ navigation }) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [mySubscribers, setMySubscribers] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [contactsServer, setContactsServer] = useState([]);
    const [content, setContent] = useState('');
    const [renderContent, setRenderContent] = useState(null);
    const [subscriptionsCount, setSubscriptionsCount] = useState(0);
    const [subscribersCount, setSubscribersCount] = useState(0);
    const [contactReady, setContactReady] = useState(true);
    const [sentReady, setSentReady] = useState(true);
    const [meReady, setMeReady] = useState(true);

    useEffect(() => {
        setContent('list');
    }, [])

    useEffect(() => {
        setSentReady(false);
        const subscriptionPresenter = new SubscriptionPresenter();
        const sentSubscriptions = async () => {
            subscriptionPresenter.getSentSubscriptions()
                .then(res => {
                    if (res.status === 1) {
                        setSubscriptions(res.result.subscriptions);
                        setSubscriptionsCount(res.result.subscriptions.length);
                        setSentReady(true);
                    }
                })
                .catch(err => console.log(err))
        }

        AppStore.on('fetchSentSubs', sentSubscriptions)
        return () => {
            AppStore.removeListener('fetchSentSubs', sentSubscriptions)
        }
    }, [])

    useEffect(() => {
        setMeReady(false);
        const subscriptionPresenter = new SubscriptionPresenter();
        const meSubscriptions = async () => {
            subscriptionPresenter.getSubscriptions()
                .then(res => {
                    if (res.status === 1) {
                        setReceivedRequests(res.result.requests);
                        setMySubscribers(res.result.subscriptions);
                        setSubscribersCount(res.result.subscriptions.length);
                        setMeReady(true);
                    }
                })
                .catch(err => console.log(err))
        }

        AppStore.on('fetchMeSubs', meSubscriptions)
        return () => {
            AppStore.removeListener('fetchMeSubs', meSubscriptions)
        }
    }, [])

    useEffect(() => {
        setContactReady(false)
        const contactPresenter = new ContactPresenter();
        const serverContacts = async () => {
            contactPresenter.getContactsFromServer()
                .then(res => {
                    if (res.status === 1) {
                        const tempContacts = res.result.map(contact => (
                            {
                                ...contact,
                                ['phone']: formatPhoneNumber(contact.phone),
                            }
                        ));
                        setContactsServer(tempContacts);
                        setContactReady(true);
                    }
                })
                .catch(err => console.log(err));
        }

        AppStore.on('fetchContacts', serverContacts)
        return () => {
            AppStore.removeListener('fetchContacts', serverContacts)
        }
    }, [])

    useEffect(() => {
        let tempRender;
        if(contactReady && sentReady && meReady) {
            switch (content) {
                case 'list':
                    tempRender = (
                        <MyCircleList
                            onSendSubscription={onSendSubRequest}
                            navigation={navigation}
                            subs={subscriptions}
                            serverContacts={contactsServer} />
                    )
                    break;
                case 'subscriptions':
                    tempRender = (
                        <MySubscriptions subscriptions={subscriptions} />
                    )
                    break;
                case 'subscriber':
                    tempRender = (
                        <MySubscribers
                            subs={mySubscribers}
                            requests={receivedRequests}
                            onAccept={onAccept}
                            onReject={onReject}
                            onUnsubscribe={onUnsubscribe}
                            onSubscribe={onSendSubRequest} />
                    )
                    break;
                default:
                    AppActions.fetchContacts();
                    AppActions.fetchMeSubs();
                    AppActions.fetchSentSubs();
                    break;
            }
            setRenderContent(tempRender);
        }

        return () => { }
    }, [content, contactReady, meReady, sentReady])

    const onAccept = (id) => {
        const subscriptionPresenter = new SubscriptionPresenter();
        subscriptionPresenter.acceptSubscriptionRequest(id)
            .then(res => {
                if (res.status === 1) {
                    setMeReady(false);
                    AppActions.fetchMeSubs();
                }
            })
            .catch(err => console.log(err))
    }

    const onReject = (id) => {
        const subscriptionPresenter = new SubscriptionPresenter();
        subscriptionPresenter.refuseSubscriptionRequest(id)
            .then(res => {
                if (res.status === 1) {
                    setMeReady(false);
                    AppActions.fetchMeSubs();
                }
            })
            .catch(err => console.log(err))
    }

    const onUnsubscribe = (id) => {
        const subscriptionPresenter = new SubscriptionPresenter();
        subscriptionPresenter.unSubscribe(id)
            .then(res => {
                if (res.status === 1) {
                    setMeReady(false);
                    AppActions.fetchMeSubs();
                }
            })
            .catch(err => console.log(err))
    }

    const onSendSubRequest = (id) => {
        const subscriptionPresenter = new SubscriptionPresenter();
        subscriptionPresenter.sendSubscriptionRequest(id)
            .then(result => {
                if (result.status === 1) {
                    setSentReady(false);
                    AppActions.fetchSentSubs();
                    setContactReady(false);
                    AppActions.fetchContacts();
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableHighlight
                    underlayColor={StylesVariables.mainColor}
                    onPress={() => setContent('list')}>
                    <Text
                        style={[
                            styles.headerTitle,
                            content === 'list' ? { color: StylesVariables.secondaryColor } : null
                        ]}>Mon cercle</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={StylesVariables.mainColor}
                    onPress={() => setContent('subscriber')}>
                    <View>
                        <Text
                            style={[
                                styles.headerSub,
                                content === 'subscriber' ? { color: StylesVariables.secondaryColor } : null
                            ]}>{subscribersCount}</Text>
                        <Text
                            style={[
                                styles.headerSubQty,
                                content === 'subscriber' ? { color: StylesVariables.secondaryColor } : null
                            ]}>Abonnés</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={StylesVariables.mainColor}
                    onPress={() => setContent('subscriptions')}>
                    <View>
                        <Text
                            style={[
                                styles.headerSub,
                                content === 'subscriptions' ? { color: StylesVariables.secondaryColor } : null
                            ]}>{subscriptionsCount}</Text>
                        <Text
                            style={[
                                styles.headerSubQty,
                                content === 'subscriptions' ? { color: StylesVariables.secondaryColor } : null
                            ]}>Abonnements</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <View style={{flex: 1}}>
                {renderContent}
            </View>
        </View>
    )
}

export default MyCircleScreen