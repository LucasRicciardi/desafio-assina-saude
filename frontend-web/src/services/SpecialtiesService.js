
import { BACKEND_URL } from '../settings'


const SpecialtiesService = {

    getSpecialties() {

        const apiAddress = `${BACKEND_URL}/specialties`
        const options = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        }

        return fetch(apiAddress, options).then(res => res.json())

    }

}

export default SpecialtiesService
