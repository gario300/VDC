import React from 'react';
import { Text, View, Modal, Image } from 'react-native';

import styles from './../Styles/modal_hours.style';

import NavHeadModal from './../NavHead/nav_head_modal.component';
import { SafeAreaView } from 'react-native-safe-area-context';

const imageTime = require('./../../assets/products/time.png');
const imageClock = require('./../../assets/products/clock.png');
const imageLocation = require('./../../assets/products/location.png');

const HoursModal = ({ activeModal, OnCloseModal, title, item, openingHours }) => {

    return (
        <Modal
        animationType="slide"
        transparent={false}
        visible={activeModal}
        onRequestClose={OnCloseModal}>
            <SafeAreaView style={styles.modalContainer}>
                <NavHeadModal
                    OnBackPress={OnCloseModal}
                />
                <View style={styles.modalContent}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                    <View style={styles.spacing} />
                    <View style={styles.spacing} />
                    <View style={styles.openingHoursContainer}>
                        <View style={styles.rowButton}>
                            <View style={styles.imgIconContainer}>
                                <Image 
                                    source={imageClock} 
                                    resizeMode={'contain'}
                                    style={styles.imageIcon}
                                />
                            </View>
                            <View style={styles.rowButtonText}>
                                <Text 
                                    style={styles.inlineText}
                                >
                                    {"Horaires d'ouverture"}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.spacing} />
                        <View style={styles.rowButton}>
                            <View style={styles.imgIconContainer}>
                            </View>
                            <View style={styles.hoursContainer}>
                                {openingHours.map(element => {
                                    return (
                                        <View 
                                            key={element.key}
                                            style={styles.hoursRowContainer}
                                        >
                                            <View style={styles.dayTitleContainer}>
                                                <Text style={styles.daysHoursText}>{element.title}</Text>
                                            </View>
                                            {!element.isClosed && (
                                            <View style={[styles.daysHoursInfo]}>
                                                <Text style={[styles.daysHoursText, styles.daysHoursTextInline]}>{element.first[0]}</Text>
                                                <Text style={[styles.daysHoursText, styles.daysHoursTextInline]}>{"-"}</Text>
                                                <Text style={[styles.daysHoursText, styles.daysHoursTextInline]}>{element.first[1]}</Text>
                                                <Text style={[styles.daysHoursText, styles.daysHoursTextInline]}>{"/"}</Text>
                                                <Text style={[styles.daysHoursText, styles.daysHoursTextInline]}>{element.second[0]}</Text>
                                                <Text style={[styles.daysHoursText, styles.daysHoursTextInline]}>{"-"}</Text>
                                                <Text style={[styles.daysHoursText, styles.daysHoursTextInline]}>{element.second[1]}</Text>
                                            </View>)}
                                            {element.isClosed && (
                                                <View style={styles.daysHoursInfo}>
                                                    <Text style={styles.daysHoursText}>{"Fermé"}</Text>
                                                </View>
                                            )}
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    </View>
                    <View style={styles.openingHoursContainer}>
                        <View style={styles.rowButton}>
                            <View style={styles.imgIconContainer}>
                                <Image 
                                    source={imageLocation} 
                                    resizeMode={'contain'}
                                    style={styles.imageIcon}
                                />
                            </View>
                            <View style={styles.rowButtonText}>
                                <Text 
                                    style={styles.inlineText}
                                >
                                    {"Adresse"}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.spacing} />
                        <View style={styles.rowButton}>
                            <View style={styles.imgIconContainer}>
                            </View>
                            <View style={styles.rowButtonText}>
                                <Text 
                                    style={styles.daysHoursText}
                                >
                                    {item.direction}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.spacing} />
                        <View style={styles.spacing} />
                        <View style={styles.spacing} />
                        <View style={styles.spacing} />
                        <View style={styles.rowButton}>
                            <View style={styles.imgIconContainer}>
                                <Image 
                                    source={imageTime} 
                                    resizeMode={'contain'}
                                    style={styles.imageIcon}
                                />
                            </View>
                            <View style={styles.rowButtonText}>
                                <Text 
                                    style={styles.daysHoursText}
                                >
                                    {item.pickHour}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default HoursModal;