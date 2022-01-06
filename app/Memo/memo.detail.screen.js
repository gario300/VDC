import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as AppActions from "../Flux/AppActions";
import AppStore from '../Flux/AppStore';
import DateTime from '../DateTime/date_time';
import MemoPresenter from './memo.presenter';
import AppIcons from '../AppIcons/app_icons';
import styles from '../Styles/memo.style';

import IconButton from '../UIComponents/Button/button_icon.component';
import ButtonPlus from '../UIComponents/Button/button_plus.component';
import ListContainer from '../UIComponents/List/list.container.component';
import BookDetailModal from '../UIComponents/Modals/book.detail.modal';
import MemoEditModal from '../UIComponents/Modals/EditMemo/memo_edit.modal';
import NewMemoModal from '../UIComponents/Modals/NewMemo/new_memo.modal';
import NewReminderModal from '../UIComponents/Modals/Reminder/new_reminder.momdal';
import MemoTile from '../UIComponents/Tiles/memo.tile.component';

const dateTime = new DateTime();

const MemoDetailScreen = ({ route }) => {
    const { params } = route;
    const book = params.item.book;
    const bookid = params.item.id;
    const bookDate = dateTime.dateFormatted(dateTime.newDate(book.date));

    const [data, setData] = useState(params.item.memos);
    const [refreshing, setRefreshing] = useState(false);
    const [showModalBookDetail, setShowModalBookDetail] = useState(false);
    const [showModalMemo, setShowModalMemo] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalReminder, setShowModalReminder] = useState(false);
    const [selectedMemo, setSelectedMemo] = useState({});

    const openMemoEdit = (value) => {
        setSelectedMemo(value);
        setShowModalEdit(true);
    }

    const getMemosFromBook = () => {
        setRefreshing(true);
        const memoPresenter = new MemoPresenter();
        memoPresenter.getBookMemos(bookid)
            .then(res => {
                if(res.status === 1) {
                    console.log(res);
                    setData(res.result.memos)
                    setRefreshing(false)
                } else { setRefreshing(false) }
            })
            .catch(err => console.log(err))
    }

    const OnAddMemo = (memo) => {
        const memoPresenter = new MemoPresenter();
        const memoValid = memoPresenter.validateFormMemo(memo);
        if (memoValid.error) {
            const msg = 'Oups: \n' + memoValid.msg
            AppStore.emit("displayToast", {
                message: msg,
                type: 1
            });
            return;
        } else {
            AppActions.displayLoaderMin(true);
            memoPresenter.addNewMemo(memo)
                .then(res => {
                    AppActions.displayLoaderMin(false);
                    setShowModalMemo(false);
                    if(res.status === 1) {
                        OnRefreshData();
                        AppStore.emit("displayToast", {
                            message: "Succès !",
                            type: 1
                        });
                    } else {
                        setShowModalMemo(false);
                        AppStore.emit("displayToast", {
                            message: "Erreur lors de la création d'un nouveau memo",
                            type: 2
                        });
                    }
                })
                .catch(err => {
                    AppActions.displayLoaderMin(false);
                    setShowModalMemo(false);
                    AppStore.emit("displayToast", {
                        message: "Erreur lors de la création d'un nouveau memo",
                        type: 2
                    });
                })
        }
    }

    const OnUpdateMemo = (memo) => {
        const memoPresenter = new MemoPresenter();
        const memoValid = memoPresenter.validateFormMemo(memo);
        if (memoValid.error) {
            const msg = 'Oups: \n' + memoValid.msg
            AppStore.emit("displayToast", {
                message: msg,
                type: 1
            });
            return;
        } else {
            AppActions.displayLoaderMin(true);
            memoPresenter.updateMemo(memo)
                .then(res => {
                    AppActions.displayLoaderMin(false);
                    if(res.status === 1) {
                        setShowModalEdit(false);
                        OnRefreshData();
                        AppStore.emit("displayToast", {
                            message: "Succès !",
                            type: 1
                        });
                    } else {
                        setShowModalEdit(false);
                        AppStore.emit("displayToast", {
                            message: "Erreur lors de la création d'un nouveau memo",
                            type: 2
                        });
                    }
                })
                .catch(err => {
                    AppActions.displayLoaderMin(false);
                    setShowModalEdit(false);
                    AppStore.emit("displayToast", {
                        message: "Erreur lors de la création d'un nouveau memo",
                        type: 2
                    });
                })
        }
    }

    const OnDeleteMemo = (id) => {
        const memoPresenter = new MemoPresenter();
        
        AppActions.displayLoaderMin(true);
        memoPresenter.deleteMemo(id)
            .then(res => {
                AppActions.displayLoaderMin(false);
                if (res.status === 1) {
                    setShowModalEdit(false);
                    OnRefreshData();
                    AppStore.emit("displayToast", {
                        message: "Succès !",
                        type: 1
                    });
                } else {
                    setShowModalEdit(false);
                    AppStore.emit("displayToast", {
                        message: "Erreur lors de la création d'un nouveau memo",
                        type: 2
                    });
                }
            })
            .catch(err => {
                AppActions.displayLoaderMin(false);
                setShowModalEdit(false);
                AppStore.emit("displayToast", {
                    message: "Erreur lors de la création d'un nouveau memo",
                    type: 2
                });
            })
    }

    const OnRefreshData = () => {
        getMemosFromBook();
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.bookImageCont}>
                    { book.photos.hasOwnProperty("0") ?
                        <Image
                            source={{ uri: book.photos["0"] }}
                            style={styles.bookImg}
                            resizeMode="cover" />
                        :
                        <View style={styles.bookImgDefault}>
                            <MaterialCommunityIcons 
                                name="image-off"
                                size={50}
                                color={styles.bookImgDefault.borderColor} />
                        </View>
                    }
                    <TouchableHighlight
                        onPress={() => setShowModalBookDetail(true)}>
                        <Text style={styles.textWhite}>Voir détails</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.bookDescCont}>
                    <Text style={styles.titleWhite}>{book.title}</Text>
                    <Text style={styles.textWhite}>{book.autor}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textWhite}>Ajouté le </Text>
                        <Text style={styles.textWhite}>{bookDate}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textWhite}>Terminé le : </Text>
                        <Text
                            style={
                                bookDate === 'Pas encore' ? styles.textRed : styles.textWhite
                            }>
                            {bookDate}
                        </Text>
                    </View>
                    <View style={styles.btnIconCont}>
                        <IconButton
                            callback={() => { }}
                            icon={<AppIcons.IconHourGlass />}
                            themeName="secundary"
                            title="Marquer comme terminé" />
                    </View>
                    <View style={styles.btnIconCont}>
                        <IconButton
                            callback={() => setShowModalReminder(true)}
                            icon={<AppIcons.IconClock />}
                            themeName="blue"
                            title="Programmer les mémos" />
                    </View>
                </View>
            </View>
            <View style={styles.listContainer}>
                <ButtonPlus
                    style={styles.listBtn}
                    onPress={() => setShowModalMemo(true)} />
                <ListContainer
                    data={data}
                    extraData={refreshing}
                    onRefresh={() => OnRefreshData()}
                    refreshing={refreshing}
                    renderItem={({ item }) => 
                        <MemoTile 
                            onPress={openMemoEdit}
                            memo={item} />} />
            </View>
            <BookDetailModal
                book={book}
                OnCloseModal={() => setShowModalBookDetail(false)}
                visible={showModalBookDetail} />
            <NewMemoModal
                bookData={[params.item]}
                OnAddMemo={OnAddMemo}
                OnCloseModal={() => setShowModalMemo(false)}
                visible={showModalMemo} />
            <MemoEditModal
                memo={selectedMemo}
                OnModifyMemo={OnUpdateMemo}
                OnDeleteMemo={OnDeleteMemo}
                OnCloseModal={() => setShowModalEdit(false)}
                visible={showModalEdit} />
            <NewReminderModal
                OnCloseModal={() => setShowModalReminder(false)}
                visible={showModalReminder} />
        </View>
    )
}

export default MemoDetailScreen
