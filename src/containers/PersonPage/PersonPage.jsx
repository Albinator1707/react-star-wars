import { PropTypes } from 'prop-types';
import { useParams } from 'react-router';
import React, { useEffect, useState, Suspense } from 'react';
import { getApiResource } from '@utils/network';
import { API_PERSON } from '@constants/api';
import { withErrorApi } from '@hoc-helpers/withErrorApi';
import { getPeopleImg } from '@services/getPeopleData';
import PersonInfo from '@components/PersonPage/PersonInfo';
import PersonPhoto from '@components/PersonPage/PersonPhoto';
import PersonLinkBack from '@components/PersonPage/PersonLinkBack';
import UiLoading from '@ui/UiLoading';

import styles from './PersonPage.module.css';

const PersonFilms = React.lazy(() => import('@components/PersonPage/PersonFilms'));

const PersonPage = ({ setErrorApi }) => {
    const [personInfo, setPersonInfo] = useState(null);
    const [personName, setPersonName] = useState(null);
    const [personPhoto, setPersonPhoto] = useState(null);
    const [personFilms, setPersonFilms] = useState(null);

    const id = useParams().id;

    useEffect(() => {
        (async () => {
            const res = await getApiResource(`${API_PERSON}/${id}/`);

            if(res){ 
                setPersonName(res.name); 
                setPersonPhoto(getPeopleImg(id));

                setPersonInfo([
                    {title: 'Height', data: res.height},
                    {title: 'Mass', data: res.mass},
                    {title: 'Hair color', data: res.hair_color},
                    {title: 'Skin color', data: res.skin_color},
                    {title: 'Birth year', data: res.birth_year},
                    {title: 'Gender', data: res.gender},
                ]);

                res.films.length && setPersonFilms(res.films); 

                setErrorApi(false);
            }
            else {
                setErrorApi(true);
            }
        })();
    }, []);

    return (
        <>
            <PersonLinkBack/>
            <div className={styles.wrapper}>
                <span className={styles.person__name}>{personName}</span>
                <div className={styles.container}>
                    <PersonPhoto 
                        personPhoto={personPhoto} 
                        personName={personName}
                    />
                    
                    {personInfo && <PersonInfo personInfo={personInfo}/>}
                    {personFilms && (
                        <Suspense fallback={<UiLoading/>}>
                             <PersonFilms personFilms={personFilms}/>
                        </Suspense>
                    )}
                </div>
            </div>
        </>
    );
}

PersonPage.propTypes = {
    setErrorApi: PropTypes.func,
}

export default withErrorApi(PersonPage);