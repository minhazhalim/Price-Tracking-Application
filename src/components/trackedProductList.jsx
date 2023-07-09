import React,{useState,useEffect} from 'react';
import axios from 'axios';
const TrackedProductList = () => {
     const [trackedProducts,setTrackedProducts] = useState([]);
     const [newTrackedProduct,setNewTrackedProduct] = useState("");
     const fetchTrackedProducts = async () => {
          try {
               const response = await axios.get("http://localhost:5000/tracked-products");
               setTrackedProducts(response.data);
          }catch(error){
               console.log("Error fetching tracked products:",error);
          }
     };
     useEffect(() => {
          fetchTrackedProducts();
     },[]);
     const handleNewTrackedProductChange = (event) => {
          setNewTrackedProduct(event.target.value);
     };
     const handleAddTrackedProduct = async () => {
          try {
               const response = await axios.post("http://localhost:5000/add-tracked-product",{
                    name: newTrackedProduct,
               });
               const {id} = response.data;
               setTrackedProducts((previousProducts) => [
                    ...previousProducts,
                    {id,name: newTrackedProduct,tracked: true},
               ]);
               setNewTrackedProduct("");
          }catch(error){
               console.log('Error adding tracked product:',error);
          }
     };
     const handleToggleTrackedProduct = async (productId) => {
          try {
               await axios.put(`http://localhost:5000/tracked-product/${productId}`);
               setTrackedProducts((previousProducts) => {
                    previousProducts.map((product) =>
                         product.id === productId ? {...product,tracked: !product.tracked} : product
                    );
               });
          }catch(error){
               console.log('Error toggling tracked product',error);
          }
     };
     return (
          <div>
               <h2>tracked products</h2>
               <ul>
                    {trackedProducts.map((product) => (
                         <li key={product.id}>
                              {product.name}{" "}
                              <input
                                   type="checkbox"
                                   onChange={() => handleToggleTrackedProduct(product.id)}
                                   checked={product.tracked}
                              />
                         </li>
                    ))}
               </ul>
               <div>
                    <h3>add tracked product</h3>
                    <input
                         type="text"
                         onChange={handleNewTrackedProductChange}
                         value={newTrackedProduct}
                    />
                    <button onClick={handleAddTrackedProduct}>add</button>
               </div>
          </div>
     );
};
export default TrackedProductList;