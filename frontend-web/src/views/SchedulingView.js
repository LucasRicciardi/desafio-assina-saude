
import React from 'react'

import Calendar from 'react-calendar'

import { Redirect } from 'react-router'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import AppointmentsService from '../services/AppointmentsService'
import ProfessionalsService from '../services/ProfessionalsService'
import SpecialtiesService from '../services/SpecialtiesService'

import './SchedulingView.css'


export default class SchedulingView extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            submitButtonClicked: false,
            appointmentCreated: false,
            selectedTime: null,
            selectedProfessional: null,
            specialties: null,
            professionals: null,
            appointments: null,
            availableTimes: null
        }

        this.getProfessionalsBySelectedSpecialty = this.getProfessionalsBySelectedSpecialty.bind(this)
        this.getProfessionalAppointments = this.getProfessionalAppointments.bind(this)
        this.getProfessionalAppointmentsByDate = this.getProfessionalAppointmentsByDate.bind(this)
        this.getAvailableTimes = this.getAvailableTimes.bind(this)
        this.verifyIfDayIsFull = this.verifyIfDayIsFull.bind(this)
        this.setSelectedTime = this.setSelectedTime.bind(this)
        this.submitForm = this.submitForm.bind(this)

    }

    componentDidMount() {
        SpecialtiesService.getSpecialties().then(specialties => {
            this.setState({
                ...this.state,
                specialties: specialties,
            })
        })
    }
    
    getProfessionalsBySelectedSpecialty(event) {
        ProfessionalsService.getProfessionalsBySpecialty(event.target.value)
            .then(professionals => {
                this.setState({
                    ...this.state,
                    professionals: professionals,
                })
            })
            .catch(() => {
                this.setState({
                    ...this.state,
                    professionals: [],
                })
            })
    }

    getProfessionalAppointments(event) {
        AppointmentsService.getAppointmentsByProfessional(event.target.value)
            .then(appointments => {
                this.setState({
                    ...this.state,
                    appointments: appointments,
                    selectedProfessional: event.target.value
                })
            })
    }

    getProfessionalAppointmentsByDate(event) {

        if (!this.state.selectedProfessional) {
            return
        }

        let month = event.activeStartDate.getMonth() + 1
        let year = event.activeStartDate.getFullYear()

        if (month < 10) {
            month = `0${month}`
        }

        this.setState({
            ...this.state,
            appointments: null,
            availableTimes: null
        })

        AppointmentsService.getAppointmentsByProfessional(this.state.selectedProfessional, month, year)
            .then(appointments => {
                this.setState({
                    ...this.state,
                    appointments: appointments,
                })
            })
    }

    getAvailableTimes(date) {
          
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (day < 10) {
            day = `0${day}`
        }

        if (month < 10) {
            month = `0${month}`
        }

        let availableTimes = []

        for (let i = 8; i < 19; i++) {

            if (i === 12) {
                continue
            }

            const hour = i < 10 ? `0${i}` : `${i}`

            for (let j = 0; j < 2; j++) {

                const minute = j < 1 ? '00' : '30'

                const time = `${day}/${month}/${year} ${hour}:${minute}:00`
                const appointment = this.state.appointments.find(appointment => {
                    return appointment.time === time
                })
    
                if (appointment) {
                    availableTimes.push({
                        time: time,
                        hour: `${hour}:${minute}`,
                        isOccupied: true
                    })
                } else {
                    availableTimes.push({
                        time: time,
                        hour: `${hour}:${minute}`,
                        isOccupied: false
                    })
                }

            }

        }

        this.setState({
            ...this.state,
            availableTimes: availableTimes
        })

    }

    verifyIfDayIsFull({ activeStartDate, date, view }) {

        const MAX_DAY_APPOINTMENTS = 2 * 8

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (day < 10) {
            day = `0${day}`
        }

        if (month < 10) {
            month = `0${month}`
        }
        
        if (this.state.appointments === null) {
            return true
        }

        const dayAppointments = this.state.appointments.filter(appointment => {
            return appointment.time.startsWith(`${day}/${month}/${year}`)
        })
        
        return dayAppointments.length === MAX_DAY_APPOINTMENTS

    }

    setSelectedTime(event) {
        this.setState({
            ...this.state,
            selectedTime: event.target.value
        })
    }

    submitForm() {
        
        this.setState({
            ...this.state,
            submitButtonClicked: true
        })
        
        if (!this.state.selectedProfessional || !this.state.selectedTime) {
            return
        }

        AppointmentsService.createAppointment(this.state.selectedProfessional, this.state.selectedTime).then(appointment => {
            localStorage.setItem('appointment', JSON.stringify(appointment))
            this.setState({
                ...this.state,
                appointmentCreated: true
            })
        })
    }

    render() {

        if (this.state.appointmentCreated) {
            return <Redirect push to="scheduling-confirmation" />
        }

        return (
            <div className="SchedulingView">
                <header>
                    <h1>Agendar consulta</h1>
                </header>
                <Form>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Especialidade</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        onChange={this.getProfessionalsBySelectedSpecialty}
                                        disabled={this.state.specialties === null}
                                    >
                                        <option className="placeholder">P. ex: Cardiologista</option>
                                        {this.state.specialties && this.state.specialties.map(specialty =>
                                            <option key={specialty.name} value={specialty.name}>{specialty.name}</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Profissional</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        onChange={this.getProfessionalAppointments}
                                        disabled={this.state.professionals === null}
                                        isInvalid={this.state.submitButtonClicked && this.state.selectedProfessional === null}
                                    >
                                        <option className="placeholder">Selecione...</option>
                                        {this.state.professionals && this.state.professionals.map(professional => 
                                            <option key={professional.id} value={professional.id}>{professional.name}</option>    
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <header className="calendar-header">
                                    Selecione o dia e o horário
                                </header>
                                <Calendar
                                    view={'month'}
                                    onActiveStartDateChange={this.getProfessionalAppointmentsByDate}
                                    onClickDay={this.getAvailableTimes}
                                    tileDisabled={this.verifyIfDayIsFull}
                                    locale={'pt-BR'}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Horário</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        onChange={this.setSelectedTime}
                                        disabled={this.state.availableTimes === null}
                                        isInvalid={this.state.submitButtonClicked && this.state.selectedTime === null}
                                    >
                                        <option className="placeholder">Selecione o horário</option>
                                        {this.state.availableTimes && this.state.availableTimes.map(time => 
                                            <option key={time.time} value={time.time} disabled={time.isOccupied}>{time.hour}</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </Form>
                <div className="p-2">
                    <Button variant="primary" onClick={this.submitForm}>Agendar</Button>
                </div>
            </div>
        )

    }

}