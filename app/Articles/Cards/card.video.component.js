import React, { Fragment } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Localization from "../../Localization/localization";
import DateTime from "../../DateTime/date_time";
import styles from "./card.style";
import Tag from "../../UIComponents/Tag/tag.component";
import CardFooter from "./card.footer.component";
import ImageLoader from "../../UIComponents/Image/image_loader.component";
import TagRow from "./tag.row.component";

const dateTime = new DateTime();

const CardVideo = ({ article, onPress }) => {
    const lang = Localization.getUserLanguage();
    const createdAt = dateTime.dateFormatted(dateTime.newDate(article.created));

    let content = {
      "title": "",
      "description": ""
    };

    if (typeof article.content[lang] !== "undefined" ) {
      content = article.content[lang];
    }

  return (
    <View style={styles.container}>
      <TagRow categories={article.categories} type={article.type} />
      <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
        <Fragment>
          <View style={styles.titleCardCont}>
            <Text style={styles.titleText}>
              {content.title !== "" ? content.title : article.title}
            </Text>
          </View>
          <View style={styles.descCont}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={styles.descText}
            >
              {content.description !== "" ? content.description : article.description}
            </Text>
          </View>
          <View style={styles.authorCont}>
            <Text style={styles.authorText}>
              {Localization.word("author")} : {article.author.name}{" "}
              {article.author.lastName}
            </Text>
            <Text style={styles.authorText}>{createdAt}</Text>
          </View>
          <View style={styles.imageCont}>
            <ImageLoader
              resizeMode="cover"
              source={{ uri: article.images["0"] }}
              style={styles.imageCont}
              loadSize="large"
            />
          </View>
        </Fragment>
      </TouchableOpacity>
      <CardFooter article={article} />
      <View style={styles.separator} />
    </View>
  );
};

export default CardVideo;
