export const initAllergyFlag = () => {
    return {
        type: 'ALLERGY_FLAG',
    }
}

export const initDoctorFlag = () => {
    return {
        type: 'DOCTOR_FLAG',
    }
}

export const initChronicFlag = () => {
    return {
        type: 'CHRONIC_FLAG',
    }
}

export const initDrugFlag = () => {
    return {
        type: 'DRUG_FLAG',
    }
}

export const initHospitalFlag = () => {
    return {
        type: 'HOSPITAL_FLAG',
    }
}

export const initImmunizationFlag = () => {
    return {
        type: 'IMMUNIZATION_FLAG',
    }
}

export const addProfileName = name => {
    return {
        type: 'PROFILE_NAME',
        name: name
    }
}

export const addProfileImage = image => {
    return {
        type: 'PROFILE_IMAGE',
        image: image
    }
}

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

export const editAllergy = data => {
    return {
        type: 'ALLERGY_DATA_EDIT',
        data: data
    }
}

export const deleteAllergy = id => {
    return {
        type: 'ALLERGY_DATA_DELETE',
        allergyId: id
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

export const editChronic = data => {
    return {
        type: 'CHRONIC_DATA_EDIT',
        data: data
    }
}

export const deleteChronic = id => {
    return {
        type: 'CHRONIC_DATA_DELETE',
        chronicId: id
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

export const editDoctor = data => {
    return {
        type: 'DOCTOR_DATA_EDIT',
        data: data
    }
}

export const deleteDoctor = id => {
    return {
        type: 'DOCTOR_DATA_DELETE',
        visitId: id
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

export const editDrug = data => {
    return {
        type: 'DRUG_DATA_EDIT',
        data: data
    }
}

export const deleteDrug = id => {
    return {
        type: 'DRUG_DATA_DELETE',
        prescriptionId: id
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

export const editHospital = data => {
    return {
        type: 'HOSPITAL_DATA_EDIT',
        data: data
    }
}

export const deleteHospital = id => {
    return {
        type: 'HOSPITAL_DATA_DELETE',
        visitId: id
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

export const editImmunization = data => {
    return {
        type: 'IMMUNIZATION_DATA_EDIT',
        data: data
    }
}

export const deleteImmunization = id => {
    return {
        type: 'IMMUNIZATION_DATA_DELETE',
        recordId: id
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