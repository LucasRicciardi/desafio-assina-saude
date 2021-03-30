
import { BACKEND_URL } from '../settings'


const ProfessionalsService = {

    getProfessionalsBySpecialty(specialty) {

        const apiAddress = `${BACKEND_URL}/specialties/${specialty}/professionals`
        const options = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        }

        return fetch(apiAddress, options).then(res => res.json())

    }

}

export default ProfessionalsService
