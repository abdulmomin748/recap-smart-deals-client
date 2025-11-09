import { use, useEffect,  } from "react";
import { AuthContext } from "../Context/AuthContext";

const BidsForProduct = ({productDetails}) => {
    const {user,loading} = use(AuthContext);
   console.log(productDetails);
   const { 
        productId,
        price_min,
        price_max,
        title ,
        bids,
      setBids
    } = productDetails;
    // const [pItembids ,setPItembids] = useState();

    useEffect(() => {

        if(loading) return;
        
        fetch(`https://smart-deals-server-phi.vercel.app/products/bids/${productId}`,{
            headers: {
                "Authorization": `Bearer ${user?.accessToken}`
            }
        })
        .then(res => res.json())
        .then(data => 
        {
            setBids(data),
            console.log(data);
        }
        )
    },[user,productId,setBids,loading])
    // console.log(pItembids,);
    
    return (
        <div>
            <h1 className='text-5xl max-w-6xl mx-auto mt-10'>Bids For This Product</h1>
           <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Sl. No</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Product</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Buyer</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Bid Price</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            bids?.map((bidItem , index)=> <tr key={bidItem._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">{index +1}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{title}</div>
                                    <div className="text-sm text-gray-500">${price_min} - ${price_max}</div>
                                </div>
                                </div>
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{bidItem.buyer_name}</div>
                                    <div className="text-xs text-gray-500">{bidItem.buyer_email}</div>
                                </div>
                                </div>
                            </td>
                            
                            <td className="px-6 py-4 text-sm text-gray-900">{bidItem.bid_price}</td>
                            <td className="px-6 py-4">
                                <button
                                className="px-4 mr-2 py-2 text-sm font-medium text-green-600 border border-green-300 rounded hover:bg-red-50 transition-colors"
                                >
                                    Accept Ofter
                                </button>
                                <button
                                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded hover:bg-red-50 transition-colors"
                                >
                                Reject Ofter
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

export default BidsForProduct;