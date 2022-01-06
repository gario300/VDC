import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Localization from '../../Localization/localization';
import DateTime from '../../DateTime/date_time';
import styles from './card.style';
import Tag from '../../UIComponents/Tag/tag.component';
import ImageLoader from '../../UIComponents/Image/image_loader.component';
import TagRow from './tag.row.component';

const dateTime = new DateTime();

const CardArticleSearch = ({ article, onPress }) => {
    const lang = Localization.getUserLanguage();
    const createdAt = dateTime.dateFormatted(dateTime.newDate(article.createdAt));
    return (
      <View style={styles.container}>
        <TagRow categories={article.categories} type={article.type} />
        <TouchableOpacity onPress={onPress}>
          <View style={styles.articleRow}>
            <View style={styles.imageSearchCont}>
              <ImageLoader
                resizeMode="cover"
                source={{ uri: article.images["0"] }}
                style={styles.imageSearch}
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
                  {article.content[lang].title}
                </Text>
              </View>
              <View style={[styles.authorCont, {marginTop: styles.authorCont.marginBottom}]}>
                <Text style={styles.authorText}>
                  {Localization.word("author")} : {article.author.name}{" "}
                  {article.author.lastName}
                </Text>
                <Text style={styles.authorText}>{createdAt}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    );
}

export default CardArticleSearch