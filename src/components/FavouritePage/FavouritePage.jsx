import { useSelector } from 'react-redux';
import styles from './FavouritePage.module.css';

const FavouritePage = () => {
    const storeData = useSelector(state => state.favourite);
    
    return (
        <>
            <h1>Favorite Page</h1>
        </>
    );
}

export default FavouritePage;