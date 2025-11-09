import {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useAxios from '../hooks/useAxios';

const RecentProducts = () => {

    const [products,setProducts] = useState([]);
    const instance = useAxios();
    
    useEffect(() => {
        instance.get('/latest-products')
        .then(data => {
            console.log(data.data);
            setProducts(data.data)
        })
    },[])
    
    return (
        <div>
            <h1 className='text-4xl text-center mt-10 mb-10'>Recent Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {products.map((item, index) => (
            <div
            key={index}
            className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition p-4 flex flex-col items-center"
            >
            {/* Image placeholder */}
            <div className="w-full h-48 bg-gray-200 rounded-xl mb-4">
                <img src={item.image} alt="" srcset="" />
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
    );
};

export default RecentProducts;