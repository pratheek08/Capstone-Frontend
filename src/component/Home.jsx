import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productService from "../service/product.service";



const Home = () => { 
  const [productList, setProductList] = useState([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    productService.getAllProduct().then((res) => {
      setProductList(res.data);
    })
  }, []);



  const [query, setQuery] = useState('');
   
 
  const handlesearch=(event)=>{

    if(event.target.value == ''){
      setProductList(productList);
    }else{
      const filterdata = productList.filter( (item)=> item.productName.toLowerCase().includes(event.target.value.toLowerCase()));
      if(filterdata.length > 0 ){
        setProductList(filterdata);
      }else{
        setProductList([{"productName":"No data"}]);
      }
    }

    setQuery(event.target.value)
  }




  const init = () => {
    productService.getAllProduct().then((res) => {
        setProductList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = (id) => {
    productService
      .deleteProduct(id)
      .then((res) => {
        setMsg("Delete Sucessfully");
        init();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  

  return (
    <>
   

    <div className='col-md-4 offset-md-10'>
              {/* <h3 className='mb-3'>Search</h3>                 */}
                <div className="col-md-6">                
                <input  placeholder='Search' value={query}  onInput={(e)=>handlesearch(e)}  />
              </div>          
            </div>

 <br />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header fs-3 text-center">
                All Product List
                {msg && <p className="fs-4 text-center text-success">{msg}</p>}
              </div>

              <div className="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">S.no</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Price</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((p, num) => (
                      <tr>
                        <td>{num + 1}</td>
                        <td>{p.productName}</td>
                        <td>{p.description}</td>
                        <td>{p.price}</td>
                        <td>{p.status}</td>
                        <td>
                          <Link to={'editProduct/'+p.id} className="btn btn-sm btn-warning">
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="btn btn-sm btn-danger ms-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;