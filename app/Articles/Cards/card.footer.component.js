import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import AppStore from '../../Flux/AppStore';
import * as AppActions from './../../Flux/AppActions';

import styles from "./card.style";
import ShareButton from '../../UIComponents/Button/share.button.component';
import Localization from "../../Localization/localization";
import downloadState from './../../Download/download_state';

const CardFooter = ({ article }) => {

  const [isInList, setIsInList] = React.useState(false)

  const showToast = (msg, type) => {
    AppStore.emit("displayToast", {
      message: msg,
      type: type,
    });
  }

  const onDownload = () => {
    //after download
    //showToast(Localization.word('download_success'), 1)

    //console.log("Article: ", article)
    AppActions.startDownload(article);
    showToast(Localization.word('download_started'), 1)
    setTimeout(() => {
      verifyIsInList()
    }, 500)
    setIsInList(true)
  }
  
  const verifyIsInList = async () => {
    const isIn = await downloadState.isInList(article.id);
    setIsInList(isIn)
  }

  React.useEffect(() => {
    verifyIsInList()
    return () => {}
  }, [])

  const downloadUpdated = () => {
    verifyIsInList()
  }

  React.useEffect(() => {
    AppStore.on("onDownloadUpdated", downloadUpdated);
    return () => {
      AppStore.removeListener("onDownloadUpdated", downloadUpdated);
    }
  }, [])

  return (
    <View style={styles.footCont}>
      <TouchableOpacity 
        onPress={onDownload}
        activeOpacity={0.5}
        disabled={isInList}
        style={[styles.downloadBtn]}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={styles.icon}>
            <AntDesign
              name="download"
              size={styles.icon.height}
              color={!isInList ? styles.icon.color : styles.downloadBtnDisabled.color} />
          </View>
          <Text style={[styles.footerText, isInList && styles.downloadBtnDisabled]}>{Localization.word("download")}</Text>
        </View>
      </TouchableOpacity>
      <ShareButton article={article} >
        <View style={{ flexDirection: "row" }}>
          <View style={styles.icon}>
            <FontAwesome
              name="share"
              size={styles.icon.height}
              color={styles.icon.color} />
          </View>
          <Text style={styles.footerText}>{Localization.word("share")}</Text>
        </View>
      </ShareButton>
    </View>
  );
};

export default CardFooter;
