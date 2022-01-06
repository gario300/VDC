import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Calendar, defaultStyle } from 'react-native-calendars'

import StylesVariables from './../../Styles/app.style';
import FilterButton from './../../UIComponents/Button/filter_button.component';

import Localization from './../../Localization/localization';

import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  today: 'Aujourd\'hui'
};

LocaleConfig.locales['en'] = {
  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  monthNamesShort: ['Jan.','Feb.','March','April','May','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  dayNamesShort: ['Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.'],
  today: 'Today'
};

const XDate = require('xdate');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    btnContainer: {
        height: 46 * StylesVariables.responsiveMulti,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: StylesVariables.spacing * StylesVariables.responsiveMulti,
    }
});

export default class DateRangePicker extends Component {

  state = {
      isFromDatePicked: false, 
      isToDatePicked: false, 
      markedDates: {},
      selectedDate: {
          dateString: ''
      }
    }

  componentDidMount() {  
    this.setupInitialDate();
  }

  onDayPress = (day) => {
      console.log("day", this.state.selectedDate)
      this.setState({
          selectedDate: day
        })
      /*
    if (!this.state.isFromDatePicked || (this.state.isFromDatePicked && this.state.isToDatePicked)) {
      this.setupStartMarker(day)
    } else if (!this.state.isToDatePicked) {
      let markedDates = {...this.state.markedDates}
      let [mMarkedDates, range] = this.setupMarkedDates(this.state.fromDate, day.dateString, markedDates)
      if (range >= 0) {
        this.props.onSuccess(this.state.fromDate, day.dateString)
      } else {
        this.setupStartMarker(day)
      }
    }
    */
  }
/*
  setupStartMarker = (day) => {
    let markedDates = {[day.dateString]: {startingDay: true, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}}
    this.setState({isFromDatePicked: true, isToDatePicked: false, fromDate: day.dateString, markedDates: markedDates})
  }

  setupMarkedDates = (fromDate, toDate, markedDates) => {
    let mFromDate = new XDate(fromDate)
    let mToDate = new XDate(toDate)
    let range = mFromDate.diffDays(mToDate)
    if (range >= 0) {
      if (range == 0) {
        markedDates = {[toDate]: {color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}}
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd')
          if (i < range) {
            markedDates[tempDate] = {color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}
          } else {
            markedDates[tempDate] = {endingDay: true, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}
          }
        }
      }
    }
    return [markedDates, range]
  }
  */

  setupInitialDate = () => {
    if (!this.props.initialValue || this.props.initialValue === "") return
    console.log("Initial ", this.props.initialValue)
    /*
    let [fromDate, toDate] = this.props.initialRange
    let markedDates = {[fromDate]: {startingDay: true, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}}
    let [mMarkedDates, range] = this.setupMarkedDates(fromDate, toDate, markedDates)
    */
   const d = new XDate(this.props.initialValue)
    this.setState({
        selectedDate: {
            dateString: d.toString('yyyy-MM-dd')
        }
    })
  }

  render() {
    let minDate = new XDate()
    minDate.diffDays(1)
    LocaleConfig.defaultLocale = Localization.getSelectedLanguage();
    return (
        <View style={styles.container}>
            <Calendar {...this.props}
                markedDates={{
                    [this.state.selectedDate.dateString]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedColor: this.props.theme.markColor,
                      selectedTextColor: this.props.theme.markTextColor
                    }
                  }}
                  minDate={minDate.toString('yyyy-MM-dd')}
                onDayPress={this.onDayPress}
                style={{
                  backgroundColor: StylesVariables.btnSecondary,
                }}
                theme={{
                  backgroundColor: StylesVariables.btnSecondary,
                  calendarBackground: StylesVariables.whiteColor,
                  textSectionTitleColor: StylesVariables.whiteColor,
                  selectedDayBackgroundColor: '#333',
                  selectedDayTextColor: StylesVariables.redColor,
                  todayTextColor: StylesVariables.orangeColor,
                  dayTextColor: StylesVariables.secondaryColor,
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#00adf5',
                  selectedDotColor: StylesVariables.orangeColor,
                  arrowColor: StylesVariables.whiteColor,
                  disabledArrowColor: '#d9e1e8',
                  monthTextColor: StylesVariables.whiteColor,
                  indicatorColor: StylesVariables.secondaryColor,
                  textDayFontFamily: StylesVariables.textFont,
                  textMonthFontFamily: StylesVariables.textFont,
                  textDayHeaderFontFamily: StylesVariables.textFont,
                  textDayFontWeight: '300',
                  textDayHeaderFontWeight: '300',
                  textDayFontSize: StylesVariables.textFontSize,
                  textMonthFontSize: StylesVariables.titleFontSize - 3,
                  textDayHeaderFontSize: StylesVariables.textFontSize - 4
                }}
            />
            <View style={styles.btnContainer}>
                <FilterButton 
                    customStyleText={styles.homeButtonText}
                    title={Localization.word("annuler").toUpperCase()}
                    callback={this.props.OnCancel}
                    style={{
                        backgroundColor: StylesVariables.btnSecondary,
                        borderColor: StylesVariables.btnSecondary,
                        borderWidth: 1
                    }}
                />
                <FilterButton 
                    customStyleText={styles.homeButtonText}
                    title={Localization.word("confirmer").toUpperCase()}
                    callback={() => {
                        this.props.OnContinue(this.state.selectedDate.dateString)
                    }}
                    style={{
                        backgroundColor: StylesVariables.btnSecondary,
                        borderColor: StylesVariables.btnSecondary
                    }}
                />
            </View>
        </View>
    )
  }
}

DateRangePicker.defaultProps = {
    theme: { markColor: '#00adf5', markTextColor: StylesVariables.otherBlue }
};
