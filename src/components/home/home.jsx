import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './home.css';

const usuarioLoggeado = 'Jerry Peña';

const cardData = [
    {
        title: 'Administración de préstamos',
        text: 'Administra los préstamos realizados y actualiza su status.',
        path: '/administrarPrestamos'
    },
    {
        title: 'Inventario',
        text: 'Administra el inventario de los productos del pañol. Tip: procura revisar el stock de los productos.',
        path: '/administrarItems'
    },
    {
        title: 'Perfil',
        text: 'Revisa tus pendientes, solicitudes y actualiza tu información personal. Recuerda estar atento a tus notificaciones!',
        path: '/perfil-alumno'
    },
    {
        title: 'Administrar solicitudes',
        text: 'Los usuarios necesitaran los productos a tiempo, revisa estas solicitudes y aprueba o rechaza según corresponda.',
        path: '/administrar-solicitudes'
    }
];

function Home() {
    return (
        <div>
            <div id="bienvenida">
                <h1 className="fade-in">¡Bienvenido, {usuarioLoggeado}!</h1>
                <h2 className="fade-in">¿Qué deseas hacer hoy?</h2>
            </div>
            <div className="home-div">
                <Row xs={1} md={2} className="g-4" id="cards">
                    {cardData.map((card, idx) => (
                        <Col key={idx}>
                            <Link to={card.path} style={{ textDecoration: 'none' }}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{card.title}</Card.Title>
                                        <Card.Text>
                                            {card.text}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default Home;