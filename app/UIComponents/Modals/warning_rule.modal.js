import React from 'react';
import { View, Modal } from 'react-native';

import NavHeadModalTitle from '../../Navigation/NavHead/nav_head_modal_title.component';

import safeStyles from './../../Styles/safe_area.style';
import { SafeAreaView } from 'react-native-safe-area-context';

const WarningRuleModal = ({ activeModal, OnCloseModal, Rule, title }) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={activeModal}
            onRequestClose={() => { }}
        >
            <SafeAreaView style={[safeStyles.droidSafeArea]}>
                <NavHeadModalTitle
                    OnBackPress={OnCloseModal}
                    title={title}
                />
                {Rule}
            </SafeAreaView>
        </Modal>
    )
}

export default WarningRuleModal;