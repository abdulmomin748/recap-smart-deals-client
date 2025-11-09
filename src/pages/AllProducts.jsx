import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';


const AllProducts = () => {
    
    const {user, loading} = useAuth();

    // const abc = useAuth();
    // const {user,loading} = abc;

    const [allProducts,setAllProducts] = useState([]);
    const axiosInstance = useAxios(); // 
    useEffect(() => {
        if(loading) return;
        axiosInstance(`/all-products`)
        .then(data => setAllProducts(data.data))
        .catch(err => console.error(err))
    },[user,loading])

    if(loading){
        return <p className="text-5xl">Loading..............</p>
    }
    return (
        <div>
            <div>
            <h1 className='text-4xl text-center mt-10 mb-10'>All Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                {allProducts.map((item, index) => (
                    <div
                    key={index}
                    className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition p-4 flex flex-col items-center"
                    >
                    {/* Image placeholder */}
                    <div className="w-full h-48 bg-gray-200 rounded-xl mb-4">
                        <img className='w-full h-48' src={item.image || item.productImageUrl} alt="" srcset="" />
                    </div>

                    {/* Title */}
                    <h3 className="text-gray-800 font-medium text-center mb-1">
                        {item.title}
                    </h3>

                    {/* Price */}
                    <p className="text-purple-600 font-semibold mb-3 text-sm">
                        ${item.price_min} - {item.price_max}
                    </p>

                    {/* Button */}
                    <Link to={`/products/${item._id}`} className="border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition px-4 py-2 rounded-md text-sm font-medium w-full text-center">
                        View Details
                    </Link>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;