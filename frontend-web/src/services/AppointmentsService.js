
import { BACKEND_URL } from '../settings'


const AppointmentsService = {

    getAppointmentsByProfessional(professional, month=null, year=null) {

        let queryParams = ''
        
        if (month && year) {
            queryParams = '?' + (new URLSearchParams({ month, year }).toString())
        }

        const apiAddress = `${BACKEND_URL}/professionals/${professional}/appointments` + queryParams
        const options = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        }

        return fetch(apiAddress, options).then(res => res.json())

    },

    listAppointments() {

        const apiAddress = `${BACKEND_URL}/appointments`
        const options = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        }

        return fetch(apiAddress, options).then(res => res.json())

    },

    createAppointment(professional, time) {
        
        const apiAddress = `${BACKEND_URL}/appointments`
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                professional_id: professional,
                time: time
            })
        }

        return fetch(apiAddress, options).then(res => res.json())

    },

}

export default AppointmentsService
