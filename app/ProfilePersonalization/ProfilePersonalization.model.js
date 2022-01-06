export const formInputs = [
    { 
        id: "name",
        type: "text",
        title: "Prénom *",
        placeholder: "",
        toolTipText: "",
        disabled: false,
        onChange: "OnChangeText"
    },
    { 
        id: "lastName",
        type: "text",
        title: "Nom **",
        placeholder: "",
        toolTipText: "",
        disabled: false,
        onChange: "OnChangeText"
    },
    { 
        id: "email",
        type: "text",
        title: "Adresse e-mail**",
        placeholder: "",
        toolTipText: "",
        disabled: true,
        onChange: "OnChangeText"
    },
    { 
        id: "city",
        type: "text",
        title: "Ville*",
        placeholder: "",
        toolTipText: "",
        disabled: false,
        onChange: "OnChangeText"
    },
    { 
        id: "age",
        type: "text",
        title: "Age*",
        placeholder: "",
        toolTipText: "",
        disabled: false,
        onChange: "OnChangeText"
    },
    { 
        id: "niveau",
        type: "select",
        title: "Niuvau Scolaire",
        placeholder: "",
        toolTipText: "",
        disabled: false,
        onChange: "OnChangeText"
    }
]

export const secondInputs = [
    { 
        id: "etablissement",
        type: "text",
        title: "Etablissement**",
        placeholder: "",
        toolTipText: "",
        onChange: "OnChangeText"
    },
    { 
        id: "description",
        type: "textarea",
        title: `A propos
Présentez-vous, vos matières préférées...`,
        placeholder: "",
        toolTipText: "",
        onChange: "OnChangeText"
    }
]

export const form = {
    name: "",
    lastName: "",
    city: "",
    niuvau: "",
    description: "",
    etablissement: "",
    photo: {
        fileID: "",
        fileSaved: "",
        file: "",
        title: "",
        updated: false,
        active: false
    }
}
