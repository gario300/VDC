import React from 'react';
import CardArticle from './card.article.component';
import CardAudio from './card.audio.component';
import CardVideo from './card.video.component';

const ArticleIndex = ({ item, OnShowArticle }) => {
    switch (item.type) {
        case 'video':
        case 1:
            return <CardVideo
                article={item}
                onPress={OnShowArticle} />
        case 'audio':
        case 2:
            return <CardAudio
                article={item}
                onPress={OnShowArticle} />
        case 'article':
        case 3:
            return <CardArticle
                article={item}
                onPress={OnShowArticle} />
        default:
            return <CardArticle
                article={item}
                onPress={OnShowArticle} />
    }
}

export default ArticleIndex
