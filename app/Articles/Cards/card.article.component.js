import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Localization from '../../Localization/localization';
import DateTime from '../../DateTime/date_time';
import styles from './card.style';
import CardFooter from './card.footer.component';
import ImageLoader from '../../UIComponents/Image/image_loader.component';
import TagRow from './tag.row.component';

const dateTime = new DateTime();

const CardArticle = ({ article, onPress }) => {
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
        <TouchableOpacity onPress={onPress}>
          <View style={styles.articleRow}>
            <View style={styles.imageArticle}>
              <ImageLoader
                resizeMode="cover"
                source={{ uri: article.images["0"] }}
                style={styles.imageArticle}
                loadSize="large"
              />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.titleCardCont}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={3}
                  style={styles.titleText}
                >
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
                  {article.author.name + " " + article.author.lastName}
                </Text>
                <Text style={styles.authorText}>{createdAt}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <CardFooter article={article} />
        <View style={styles.separator} />
      </View>
    );
}

export default CardArticle