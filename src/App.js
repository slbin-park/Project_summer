// https://ko.reactjs.org/docs/thinking-in-react.html

import React, { useState } from 'react';
//테스트
const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

export default function App() {
  return (
    <div className="container">
      <FilterableProductTable />
    </div>
  );
}

function FilterableProductTable(){
  const [products,setproducts] = useState(PRODUCTS);
  return(
    <div>
      <Searchbar products={products} setproducts = {setproducts}/>
      <Productsbar products={products}/>
    </div>
  )
}

const Searchbar = ({ products , setproducts}) => {
  const clickhandler = () => {setproducts(products.filter(a => a.stocked))};
  const clickhandler2 = () => {setproducts(PRODUCTS)};
  return(
    <form id="form">
    <input type="text" placeholder="Search..." />
    <p> <input type="checkbox" onClick={clickhandler} />  {' '}  Only show products in stock  </p>
    <p> <input type="checkbox" onClick={clickhandler2} />  {' '}  Show All products  </p>
  </form>
  );
}


const Productsbar = ({products}) =>{
  const rows = [];
  let lastCategory = null;

  products.forEach(
    (product) => {
    if (product.category !== lastCategory) //카테고리별로 정리하기 위해서 넣음
      rows.push(<Pushitem category={product.category} key={product.category} />);

    rows.push(<Pushitems product={product} key={product.name} />);
    lastCategory = product.category;
  }
  );

  return (
    <table border="1px">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

const Pushitem = ({category}) => 
  <tr>
  <th colSpan="2">{category}
  </th>
</tr>;
//sda

const Pushitems =({product}) =>{
  const name = product.stocked ? product.name : <span style={{ color: 'red' }}>{product.name} </span>;
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}