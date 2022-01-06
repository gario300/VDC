import React, { useEffect, useState } from 'react';
import ModalBase from '../modal.layout.component';
import BookManually from '../NewBook/book.manually.component';
import BookOptions from '../NewBook/book.options.component';
import BookResult from './book.wishlist.result.component';
import BookSearchCode from '../NewBook/book_code.search.component';
import modalState from '../NewBook/modal.state';

const tempBook = {
    title: "Les secrets d'un esprit millionnaire",
    autor: "T.Harv Eker",
    date: "Octobre 2008",
    numPages: 222,
    resume: `Savez-vous pourquoi certaines personnes s’enrichissent facilement, alors que d’autres semblent destinées à une vie de difficultés financières ? Pour T. Harv Eker, vous aurez beau tout savoir sur le marketing, la vente, les négociations, la bourse, l’immobilier et le monde de la finance, si votre plan financier intérieur ne vise pas un degré de réussite élevé, vous n’aurez jamais beaucoup d’argent. Grâce à la combinaison rare de débrouillardise et d’humour, vous découvrirez en quoi votre enfance a façonné votre destinée....`,
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1476804302l/32692668._SY475_.jpg"
};

const NewWishModal = ({ OnCloseModal, visible, onAddBook }) => {
    const [content, setContent] = useState('options');
    const [bookWithCode, setBookWithCode] = useState({})
    let renderContent;

    useEffect(() => {
        if (!modalState.getModalState()) {
            modalState.resetModalState();
            setBookWithCode({});
            setContent('options');
        }
    }, [modalState.getModalState()])

    useEffect(() => {
        if (bookWithCode.hasOwnProperty('title')) {
            setContent('finalBook');
        }
    }, [bookWithCode])

    const onClose = () => {
        OnCloseModal();
        modalState.resetModalState();
    };

    const onEnd = (data) => {
        onAddBook(data);
        modalState.resetModalState();
    }


    const onSearch = (code) => {
        //search book with code
        setBookWithCode(tempBook); //tempBook is the result of search
    }

    switch (content) {
        case 'finalBook':
            renderContent = <BookResult
                book={bookWithCode}
                onBack={() => setContent('options')}
                onEnd={onEnd} />
            break;
        case 'codeBook':
            renderContent = <BookSearchCode
                onBack={() => setContent('options')}
                onSearch={onSearch} />
            break;
        case 'manualBook':
            renderContent = <BookManually
                onBack={() => setContent('options')}
                onEnd={onEnd} />
            break;
        default: ///options
            renderContent = <BookOptions 
                onNext={setContent}
                onSearch={onSearch} />
            break;
    }

    return (
        <ModalBase
            OnCloseModal={() => onClose()}
            title="NOUVEAU COUP DE COEUR"
            visible={visible}>
            {renderContent}
        </ModalBase>
    )
}

export default NewWishModal