import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import faker from 'faker';
import styles from '../Styles/wishlist.style';
import ButtonPlus from '../UIComponents/Button/button_plus.component';
import ListContainer from '../UIComponents/List/list.container.component';
import WishListBookTile from '../UIComponents/Tiles/wish.book.tile.component';
import InputSearch from '../UIComponents/Input/search.input.component';
import NewWishModal from '../UIComponents/Modals/NewWishlist/new_wish.modal';

const getFakeData = () => {
    const image1 = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1476804302l/32692668._SY475_.jpg";
    const image2 = "https://images-eu.ssl-images-amazon.com/images/I/51ijjHLLiCL._SY291_BO1,204,203,200_QL40_ML2_.jpg";
    let data = [];

    for (let i = 0; i < 10; i++) {
        let element = {
            autor: `${faker.name.firstName()} ${faker.name.lastName()}`,
            end: `${i === 0 ? 'Pas encore' : faker.date.recent().toDateString()}`,
            image: `${i % 2 === 0 ? image1 : image2}`,
            isbn: "2922405419",
            resume: faker.lorem.paragraph(),
            releaseDate: faker.date.recent().toDateString(),
            start: faker.date.recent().toDateString(),
            title: `${i % 2 === 0 ? "LES SECRETS D'UN ESPRIT MILLIONNAIRE" : "PERE RICHE, PERE PAUVRE"}`,
            totalPage: faker.random.number({max: 300}),
        }
        data.push(element);
    }
    return data;
}

const WishListScreen = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const tempData = getFakeData();
        setData(tempData)
        return () => {}
    }, [])

    const onAddBookToWishlist = (book) => {
        //pass book to server
        //call api
        //if success close modal
        setShowModal(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Wishlist</Text>
            </View>
            <View style={styles.listContainer}>
                <ButtonPlus
                    onPress={() => setShowModal(true)}
                    style={styles.listBtn} />
                <InputSearch
                    onSearch={() => { }}
                    setSearchTerm={() => { }} />
                <ListContainer
                    data={data}
                    renderItem={({item}) => 
                        <WishListBookTile 
                            book={item}
                            onDelete={() => {/* delete */}} />
                    } />
            </View>
            <NewWishModal
                onAddBook={onAddBookToWishlist}
                OnCloseModal={() => setShowModal(false)}
                visible={showModal} />
        </View>
    )
}

export default WishListScreen