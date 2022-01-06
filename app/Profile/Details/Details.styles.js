import {StyleSheet} from 'react-native'
import sizes from '../../Styles/sizes.style.js'
import constanst from '../../Styles/app.style.js'

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topContent: {
        flex: .6,
        width: '100%',
        height: 90,
        backgroundColor: 'red'
    },
    topImageBackground:{
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    bodyContent:{
        flex: .4,
        padding: sizes.spacing * 2
    },
    avatarContainer:{
        width: 130,
        height: 130,
        borderRadius: 130,
        backgroundColor: 'white',
        marginVertical: sizes. spacing -5,
        overflow:'hidden'
    },
    name: {
        ...constanst.appTitle,
        color: 'white',
        marginVertical: sizes. spacing -5
    },
    subName: {
        ...constanst.appSubText,
        color: 'white',
        marginVertical: sizes.spacing -5
    },
    pTitle: {
        ...constanst.appSubTitle,
        color: 'black',
        marginVertical: sizes.spacing -5
    },
    p: {
        ...constanst.appText,
        color: 'black',
        marginVertical: sizes.spacing -5
    }
})
