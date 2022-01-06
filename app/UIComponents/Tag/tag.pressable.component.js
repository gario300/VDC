import React from 'react'
import { TouchableOpacity } from 'react-native'
import Tag from './tag.component'

const TagPressable = ({onPress, title, category, type, style}) => (
    <TouchableOpacity 
        onPress={onPress}
        activeOpacity={0.5}
    >
            <Tag
                title={title}
                category={category}
                type={type}
                style={style} />
    </TouchableOpacity>
)

export default TagPressable
