import React, { useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import useSequreAxios from '../hooks/useSequreAxios';
import useAuth from '../hooks/useAuth';

const MyBids = () => {
    const {user,loading } = useAuth();
    const email = user.email;
    const [myBids, setMyBids] = useState([]);
    const sequreAxios = useSequreAxios();
    useEffect(() => {
        if(loading) return;
        if(user?.email){
            sequreAxios(`/bids?email=${email}`)
            .then(data => setMyBids(data.data))
        }
    },[])
    console.log(myBids);
    
    

    const handleDeleteBid = _id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).
            then((result) => {
            if (result.isConfirmed) {
                fetch(`https://smart-deals-server-phi.vercel.app/bids/${_id}`, {
                    method: 'DELETE',
                })
                .then(res => res.json())
                .then(data => {
                    if(data.deletedCount > 0){
                        Swal.fire({
                        title: "Deleted!",
                        text: "Your bid item has been deleted.",
                        icon: "success"
                        });
                        const remainingBids = myBids.filter( bid=>bid._id !== _id )
                        setMyBids(remainingBids);
                    }
                })
            }
        })
        
       
    }
    if(loading){
        return <p className="text-5xl">Loading..............</p>
    }
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Sl. No</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Product</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Seller</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Bid Price</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    
                        {
                            myBids?.map(myBidItem => <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">dfd</td>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                            <div>
                                <div className="text-sm font-medium text-gray-900">bid.product.name</div>
                                <div className="text-sm text-gray-500">$bid.product.price</div>
                            </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"><img src={myBidItem.buyer_image} alt="" srcset="" /></div>
                            <div>
                                <div className="text-sm font-medium text-gray-900">{myBidItem.buyer_name}</div>
                                <div className="text-xs text-gray-500">{myBidItem.buyer_email}</div>
                            </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">${myBidItem.bid_price}</td>
                        <td className="px-6 py-4">
                            {
                                myBidItem.status == 'pending' ? <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                {myBidItem.status}
                            </span> :
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-300 text-yellow-800">
                            {myBidItem.status}
                            </span>
                            }
                            
                        </td>
                        <td className="px-6 py-4">
                            <button
                            onClick={() => handleDeleteBid(myBidItem._id)}
                            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded hover:bg-red-50 transition-colors"
                            >
                            Remove Bid
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
    );
};

export default MyBids;