import React, {  useEffect, useState } from 'react';
import useSequreAxios from '../hooks/useSequreAxios';
import useAuth from '../hooks/useAuth';

const MyProducts = () => {
    const sequreAxios = useSequreAxios();
    
    const {user, loading} = useAuth();

    console.log(user);

    const [products,setProducts] = useState([]);
    
    useEffect(() => {
        if(loading) return;

        sequreAxios(`/products?email=${user?.email}`)
        .then(data => setProducts(data.data))

    },[user]);
    if(loading){
        return <p className="text-5xl">Loading..............</p>
    }
    return (
        <div>
            <h1 className='text-5xl max-w-6xl mx-auto mt-10'>My Products: {products.length}</h1>
            
           <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Sl. No</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Image</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Product Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Category</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Price</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            products?.map((pItem , index)=> <tr key={pItem._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">{index +1}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                                
                                </div>
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{pItem.title}</div>
                                </div>
                                </div>
                            </td>
                            
                            <td className="px-6 py-4 text-sm text-gray-900">{pItem.category}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">${pItem.minPrice} - ${pItem.maxPrice}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Status</td>
                            <td className="px-6 py-4">
                                <button
                                className="px-4 mr-2 py-2 text-sm font-medium text-green-600 border border-green-300 rounded hover:bg-red-50 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded hover:bg-red-50 transition-colors"
                                >
                                Delete
                                </button>
                                <button
                                className="px-4 py-2 ml-2 text-sm font-medium text-green-600 border border-red-300 rounded hover:bg-red-50 transition-colors"
                                >
                                Make Sold
                                </button>
                            </td>
                        </tr>)
                        }
                        
                    </tbody>
                </table>
                    <div className="text-center py-12 text-gray-500">
                    No active bids
                    </div>
                </div>
            </div>
        </div> 
        </div>
    );
};

export default MyProducts;