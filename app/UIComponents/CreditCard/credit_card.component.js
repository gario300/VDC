import React, { Component } from 'react';
import {
    View, 
    Text, 
    Animated, 
    ScrollView,
    TextInput
} from 'react-native';
import { Input } from 'react-native-elements';
import { CreditCardInput } from "react-native-credit-card-input";
import Localization from './../../Localization/localization';
import styles from './credit_card.style';
import StylesVariables from '../../Styles/app.style';

export default class CreditCard extends Component {

    constructor(props) {
        super(props);
        this.inputRef = null;
        this.ccRef = null;
        this.state = {
            focused: 'name',
            name: "",
            form: {
                "valid": false
            }
        }
    }

    componentDidMount() {
        //this.inputRef.focus();
    }

    OnChangeName = (name) => {
        this.setState({name})
        const isValid = this.state.form.valid;
        this.props.OnChangeCard({...this.state.form, isValid, "name": name});
    }

    OnChange = (form) => {
        this.setState({
            "form": form
        })
        const isValid = form.valid;
        this.props.OnChangeCard({...form, isValid, name: this.state.name});
    }

    render() {
        return (
            <View style={styles.body}>
                {/*<View style={styles.slide}>
                    <View style={styles.inputContainer}>
                        <Input
                            label={Localization.word("card_holders_name")}
                            labelStyle={styles.inputLabel}
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            value={this.state.name}
                            ref={ref => this.inputRef = ref}
                            onChangeText={this.OnChangeName}
                            returnKeyType={"done"}
                            onSubmitEditing={() => {
                                if (this.state.name !== "") {
                                    this.ccRef.focus("number");
                                }
                            }}
                        />
                    </View>
                        </View>*/}
                <View style={styles.spacing}></View>
                <View style={styles.slideCreditCard}>
                    <CreditCardInput
                        ref={ref => this.ccRef = ref}
                        onFocus={this.props.OnFocusInput}
                        onChange={this.OnChange} 
                        placeholderColor={StylesVariables.textColorLight}
                        invalidColor={StylesVariables.redColor}
                        validColoor={StylesVariables.secondaryColor}
                    />
                </View>
            </View>
        );
    }
}
