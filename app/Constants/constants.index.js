import Localization from '../Localization/localization';

export const getKidsArray = () => {
    let tempArray = [];
    for (let i = 1; i < 6; i++) {
        tempArray.push({
            value: i,
            key: `${i}`,
            label: `${i}`,
        })
    }
    return tempArray;
}

export const getFreqSportArray = () => {
    let tempArray = [];
    for (let i = 1; i < 6; i++) {
        tempArray.push({
            value: i,
            key: `${i}`,
            label: `${i}`,
        })
    }
    return tempArray;
}

export const getYesNoArray = () => ([
    {
        value: true,
        key: Localization.word('oui'),
        label: Localization.word('oui'),
    },
    {
        value: false,
        key: Localization.word('non'),
        label: Localization.word('non'),
    },
])

export const getGendersArray = () => ([
    {
        key: 'male',
        label: Localization.word('male'),
        value: 0,
    },
    {
        key: 'female',
        label: Localization.word('female'),
        value: 1,
    },
])

export const getLanguageArray = () => (Localization.getContentLanguages)

export const getPathoArray = () => ([
    { 
        label: Localization.word('hypert'),
        key: 'hypert',
        value: 'hypert',
    },
    { 
        label: Localization.word('diabete'),
        key: 'diabete',
        value: 'diabete',
    },
    { 
        label: Localization.word('avc'),
        key: 'avc',
        value: 'avc',
    },
    { 
        label: Localization.word('cancer'),
        key: 'cancer',
        value: 'cancer',
    },
    { 
        label: Localization.word('infartus'), 
        key: 'infartus',
        value: 'infartus',
    },
    { 
        label: Localization.word('drepan'),
        key: 'drepan',
        value: 'drepan',
    },
    { 
        label: Localization.word('aucune'),
        key: 'aucune',
        value: 'aucune',
    },
    { 
        label: Localization.word('other'),
        key: 'autre',
        value: 'autre',
    },
])

export const getBloodArray = () => ([
        { 
            key: 'A+',
            label: 'A+',
            value: 0,
        },
        { 
            key: 'A-',
            label: 'A-',
            value: 1,
        },
        { 
            key: 'B+',
            label: 'B+',
            value: 2
        },
        { 
            key: 'B-',
            label: 'B-',
            value: 3,
        },
        { 
            key: 'AB+',
            label: 'AB+',
            value: 4,
        },
        { 
            key: 'AB-',
            label: 'AB-',
            value: 5,
        },
        { 
            key: 'O+',
            label: 'O+',
            value: 6,
        },
        { 
            key: 'O-',
            label: 'O-',
            value: 7,
        },
])

export const typesSeance = [
    {
        label: 'Simple présence',
        key: 'Simple présence',
        value: 1
    },
    {
        label: 'Avec interaction / même domaine',
        key:  'Avec interaction / même domaine',
        value: 2
    },
    {
        label: 'Avec interaction / domaine différent',
        key: 'Avec interaction / domaine différent',
        value: 3
    },
]

export const niveauSeance = [
    {
        label: 'Lycée',
        key: 'Lycée',
        value: 1
    },
    {
        label: 'Bac',
        key:  'Bac',
        value: 2
    },
    {
        label: 'Licence-BAC+3',
        key: 'Licence-BAC+3',
        value: 3
    },
    {
        label: 'Master-Bac+5',
        key: 'Master-Bac+5',
        value: 4
    },
    {
        label: 'Recherches',
        key: 'Recherches',
        value: 5
    },
    {
        label: 'Formations',
        key: 'Formations',
        value: 6
    },
]
export const getCategories = () => ([
    { 
        label: Localization.word('cardio'),
        key: 'cardio',
        value: 'cardio',
    },
    { 
        label: Localization.word('diabete'),
        key: 'diabete',
        value: 'diabete',
    },
    { 
        label: Localization.word('aff_resp'),
        key: 'aff_resp',
        value: 'aff_resp',
    },
    { 
        label: Localization.word('cancer'),
        key: 'cancer',
        value: 'cancer',
    },
    { 
        label: Localization.word('drepan'),
        key: 'drepan',
        value: 'drepan',
    },
    { 
        label: Localization.word('hypert'),
        key: 'hypert',
        value: 'hypert',
    },
    { 
        label: Localization.word('child_maladies'),
        key: 'child_maladies',
        value: 'child_maladies',
    },
    { 
        label: Localization.word('autre'),
        key: 'autre',
        value: 'autre',
    },
])
