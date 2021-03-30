
import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

import AppointmentsService from '../services/AppointmentsService'

import './AppointmentsView.css'
import { Link } from 'react-router-dom'


export default class AppointmentsView extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            days: []
        }

    }

    componentDidMount() {
        AppointmentsService.listAppointments().then(appointments => {
            this.setState({
                days: appointments.reduce((accumulator, appointment) => {

                    const currentDay = appointment.time.split(' ')[0]

                    let currentDayFound = false
                    accumulator.forEach(([day, elements]) => {
                        if (day === currentDay) {
                            currentDayFound = true
                        }
                    })

                    if (currentDayFound) {
                        return accumulator.map(([day, elements]) => {
                            if (day === currentDay) {
                                elements.push(appointment)
                            }
                            return [day, elements]
                        })
                    }

                    accumulator.push([currentDay, [appointment]])

                    return accumulator

                }, [])
            })
        })
    }

    render() {

        function getTime(appointment) {
            return appointment.time.split(' ')[1].substr(0, 5)
        }

        return (
            <div className="AppointmentsView">
                <header>
                    <h1>Consultas</h1>
                </header>
                <Container>
                    {this.state.days.length === 0 && 
                        <div>
                            Nenhum agendamento disponível
                        </div>
                    }
                    {this.state.days.length > 0 && this.state.days.map(([day, appointments]) =>
                        <Row key={day}>
                            <Col xs={3}>{day}</Col>
                            <Col>
                                <ListGroup variant="flush">
                                    {appointments.map(appointment =>
                                        <ListGroup.Item key={appointment.id}>
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title>Chamada de vídeo com Dr(a). {appointment.professional.name}</Card.Title>
                                                    <Card.Text>
                                                        <span className="d-block">
                                                            {appointment.professional.specialty} - CRM {appointment.professional.crm}
                                                        </span>
                                                        <span className="d-block">
                                                            <strong>Inicio às {getTime(appointment)}</strong>
                                                        </span>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Col>
                        </Row>
                    )}
                </Container>
                <div className="mt-2 p-2">
                    <Link to="/scheduling">
                        <Button variant="primary">Continuar</Button>
                    </Link>
                </div>
            </div>
        )
    }

}