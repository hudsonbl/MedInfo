export const loginUser = userData => {
    return {
        type: 'USER',
        payload: userData
    }
}

export const logoutUser = () => {
    return {
        type: 'USER_LOGGED_OUT'
    }
}

export const initAllergy = data => {
    return {
        type: 'ALLERGY_DATA_INIT',
        data: data
    }
}

export const addAllergy = data => {
    return {
        type: 'ALLERGY_DATA_ADD',
        data: data
    }
}

export const initChronic = data => {
    return {
        type: 'CHRONIC_DATA_INIT',
        data: data
    }
}

export const addChronic = data => {
    return {
        type: 'CHRONIC_DATA_ADD',
        data: data
    }
}

export const initDoctor = data => {
    return {
        type: 'DOCTOR_DATA_INIT',
        data: data
    }
}

export const addDoctor = data => {
    return {
        type: 'DOCTOR_DATA_ADD',
        data: data
    }
}

export const initDrug = data => {
    return {
        type: 'DRUG_DATA_INIT',
        data: data
    }
}

export const addDrug = data => {
    return {
        type: 'DRUG_DATA_ADD',
        data: data
    }
}

export const initHospital = data => {
    return {
        type: 'HOSPITAL_DATA_INIT',
        data: data
    }
}

export const addHospital = data => {
    return {
        type: 'HOSPITAL_DATA_ADD',
        data: data
    }
}

export const initImmunization = data => {
    return {
        type: 'IMMUNIZATION_DATA_INIT',
        data: data
    }
}

export const addImmunization = data => {
    return {
        type: 'IMMUNIZATION_DATA_ADD',
        data: data
    }
}


export const initLab = data => {
    return {
        type: 'LAB_DATA_INIT',
        data: data
    }
}

export const addLab = data => {
    return {
        type: 'LAB_DATA_ADD',
        data: data
    }
}