import { useState } from 'react'
import { Button, Form, Container, Card, Row, Navbar, Nav } from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import cartImg from './images/cart.svg'
import wave from './images/wave.svg'
import iPhone from './images/iPhone.png'
import samsung from './images/samsung.jpg'
import xiaomi from './images/xiaomi.jpg'
import huawei from './images/Huawei.jpg'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const productsArray = [
  {
    name: 'P40 Pro',
    image: huawei,
    brand: 'Huawei',
    price: 4000
  }, {
    name: 'Poco X3 NFC',
    image: xiaomi,
    brand: 'Xiaomi',
    price: 2000
  }, {
    name: 'Samsung S10 Plus',
    image: samsung,
    brand: 'Samsung',
    price: 3000
  }, {
    name: 'iPhone 12',
    image: iPhone,
    brand: 'Apple',
    price: 1000
  }
]

function App() {
  const [products, setProducts] = useState(productsArray)
  const [filtered, setFiltered] = useState([])
  const [cart, setCart] = useState([])
  const [id, setId] = useState(1)
  const [price, setPrice] = useState(0)
  
  const handleClick = (brand) => {
    if ([...filtered].find(elem => elem === brand)) setFiltered([...filtered].filter(elem => elem !== brand))
    else setFiltered([...filtered, brand])
  }

  const buy = () => {
    setCart([])
    setPrice(0)
  }

  const handlePurchase = (item) => {
    let foundItem = cart.find(elem => elem.name === item.name)
    if (foundItem) {
      const existing = cart.find(elem => elem.name === item.name)
      setCart([...cart.filter(elem => elem.name !== item.name), {
        id: foundItem.id,
        name: item.name,
        amount: ++existing.amount,
        brand: item.brand,
        price: item.price
      }])
    } else {
      setId(prevId => prevId + 1)
      setCart([...cart, {
        id: id,
        name: item.name,
        amount: 1,
        brand: item.brand,
        price: item.price
      }])
    }

    setPrice(prevPrice => prevPrice + item.price)
  }

  const handleRemoval = (item) => {
    const cartItem = cart.find(elem => elem.name === item.name)
    if (!cartItem) return
    if (cartItem.amount <= 1) {
      setCart([...cart.filter(elem => elem.name !== item.name)])
    }
    else setCart([...cart.filter(elem => elem.name !== cartItem.name), {
      id: cartItem.id,
      name: item.name,
      amount: --cartItem.amount,
      brand: item.brand,
      price: item.price
    }])

    setPrice(prevPrice => prevPrice - item.price)
  }

  const makeButtons = item => {
    const cartItem = cart.find(elem => elem.name === item.name)
    if (!cartItem) return <Button class="px-5 my-3 btn btn-lg btn-block btn-outline-primary" onClick={() => handlePurchase(item)}>Purchase</Button>
    else {
      return (
        <div class="d-sm-flex justify-content-around align-items-center">
          <Button class="align-bottom" onClick={() => handlePurchase(item)}>+</Button>
          <p class="lead pt-2">{cartItem.amount}</p>
          <Button onClick={() => handleRemoval(item)}>-</Button>
        </div>
      )
    }
  }

  const makeRow = num => {
    let arrayFiltered = [...products].filter(elem => filtered.length > 0 ? filtered.includes(elem.brand.toLowerCase()) : elem === elem)
    return <div class="d-flex justify-content-around align-items-left">
    { 
      arrayFiltered.map((elem, i) => {
      if (i >= num && i < num + 2) 
        return (
          <Card className="m-3 p-sm-3 p-md-5 p-lg-5 text-dark d-md-flex" style={{ width: '20rem', height: '25rem' }}>
            <Card.Img variant="top" src={elem.image} className="d-none d-sm-block" />
            <Card.Body>
              <Card.Title>{elem.name}</Card.Title>
              <Card.Text>{elem.brand} - <span class="text-success">${elem.price}</span></Card.Text>
              {makeButtons(elem)}
            </Card.Body>
          </Card>
        )
      })
    }
    </div>
  }

  const generateBasketItem = (item, i) => {
    return (
      <tr>
        <th scope="row">{item.amount}</th>
        <td>{item.name}</td>
        <td>{item.brand}</td>
        <td>${item.price}</td>
        <td><span class="text-success d-none d-sm-block">${item.price * item.amount}</span></td>
        <td class="d-none d-sm-block">{makeButtons(item)}</td>
      </tr>
    )
  }

  return (
    <>
      <Navbar className="bg-light fixed-top" variant="primary">
        <Container>
          <Navbar.Brand href="#home">
            <h2>BuyMe</h2>
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#products">Products</Nav.Link>
            <Nav.Link href="#home">Cart</Nav.Link>
            <Nav.Link href="#home" class="bg-primary">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <section className="bg-light text-dark p-5 text-start" style={{marginTop: '50px', paddingTop: '30px'}} id='home'>
        <div>
          <Container>
            <div className="d-sm-flex align-items-center justify-content-between">
                <div>
                  <h1>Making Online Shopping <span class="text-primary">Simple</span></h1>
                  <p className="lead my-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <img className="img-fluid w-50 pb-5 px-5 d-none d-sm-block" src={cartImg} alt="cart"></img>
            </div>
          </Container>
        </div>
      </section>

      <section className="bg-dark text-light text-center" id="products">
        <img src={wave} alt="wave" />
        <h1>Seeing anything you might like?</h1>
        <Container>
          <div class="d-sm-flex justify-content-start align-items-start">
            <div class="bg-light text-dark text-start m-4 p-3 d-none d-md-block rounded" style={{height: '50vh' }}>
              <Container>
                <h1>Navigation</h1>
                <h3 class="lead pt-3">Brand</h3>
                <Form class="pb-5">
                  {
                    products.map(elem => {
                      return (
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label={elem.brand} onClick={() => handleClick(elem.brand.toLowerCase())} />
                        </Form.Group>
                      )
                    })
                  }
                </Form>
              </Container>
            </div>
            <div>
              <Container class="p-5">
                <div>
                  <Container>
                    {makeRow(0)}
                  </Container>
                  <Container>
                    {makeRow(2)}
                  </Container>
                </div>
              </Container>
            </div>
          </div>
        </Container>

      </section>
      <section className="bg-light text-dark text-center" style={{width: '100%'}} id="cart">
        <div>
          <Container>
            <div className="d-sm-flex align-items-center justify-content-between">
              <div class="w-100">
              <h1 class="py-5">Ready to go?</h1>
                <div class="bg-dark text-light align-self-center w-md-75 w-lg-100 w-sm-75 p-3 m-5">
                  <table class="table text-light">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Price</th>
                        <th scope="col" className="d-none d-sm-block">Total</th>
                        <th scope="col d-none d-sm-block"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.sort((a, b) => a.id - b.id).map(generateBasketItem)}
                      <tr>
                        <th scope="row">{null}</th>
                        <td>{null}</td>
                        <td>{null}</td>
                        <td>{null}</td>
                        <td><span class="text-success d-none d-sm-block">${price}</span></td>
                      </tr>
                    </tbody>
                  </table>
                  {cart.length !== 0 ? <Button onClick={() => buy()}>Buy Now</Button> : null}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      <section>
      </section>
    </>
  );
}

export default App;
