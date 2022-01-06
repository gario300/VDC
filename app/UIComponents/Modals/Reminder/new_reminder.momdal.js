import React, { useState, useEffect } from 'react';
import ModalBase from '../modal.layout.component';
import MainReminder from './main.reminder.component';

const NewReminderModal = ({ visible, OnCloseModal, edit=false, reminder }) => {
    const [frequency, setFrequency] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if(edit) {
            setDate(reminder.date);
            setFrequency(reminder.frequency);
        }
        return () => {}
    }, [edit])

    const onEnd = () => {
        // set reminder
        OnCloseModal();
    }

    const onDelete = () => {
        // delete memo
    }

    const onModify = () => {
        // modify
    }

    return (
        <ModalBase
            title="PROGRAMMER UN RAPPEL"
            visible={visible}
            OnCloseModal={OnCloseModal}>
                <MainReminder 
                    date={date}
                    edit={edit}
                    frequency={frequency}
                    onActivate={() => onEnd()}
                    onDateChange={setDate}
                    onFrequencyChange={setFrequency}
                    onDelete={onDelete}
                    onModify={onModify} />
        </ModalBase>
    )
}

export default NewReminderModal
