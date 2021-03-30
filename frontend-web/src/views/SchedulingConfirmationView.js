
import React from "react"

import { Link } from "react-router-dom"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './SchedulingConfirmationView.css'


export default class SchedulingConfirmationView extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            appointment: localStorage.getItem('appointment')
        }

    }

    render() {

        if (!this.state.appointment) {
            return <div>appointment is required</div>
        }

        const appointment = JSON.parse(this.state.appointment)

        const specialty = appointment.professional.specialty
        const professional = appointment.professional.name
        const date = appointment.time.split(' ')[0]
        const time = appointment.time.split(' ')[1].substr(0, 5)

        return (
            <div className="SchedulingConfirmationView">
                <header>
                    <h1>Confirmação de agendamento</h1>
                </header>
                <Container>
                    <Row>
                        <Col>
                            <Card className="confirmation-card">
                                <Card.Body>
                                    <Card.Title>Tudo certo!</Card.Title>
                                    <Card.Text>Entraremos em contato com um dia de antecedência para confirmar sua presença.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <Card className="resume-card">
                                <Card.Body>
                                    <Card.Title>Resumo</Card.Title>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Especialidade</Form.Label>
                                            <Form.Control value={specialty} readOnly />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Profissional</Form.Label>
                                            <Form.Control value={professional} readOnly />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Data</Form.Label>
                                            <Form.Control value={date} readOnly />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Horário</Form.Label>
                                            <Form.Control value={time} readOnly />
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <div className="p-2">
                    <Link to="/appointments">
                        <Button variant="primary">Voltar à página inicial</Button>
                    </Link>
                </div>
            </div >
        )

    }

}