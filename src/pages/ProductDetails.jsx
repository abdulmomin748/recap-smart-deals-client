import React, { use, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import BidsForProduct from "../components/BidsForProduct";
// import { ArrowLeft } from "lucide-react";

function ProductDetails() {
    const modalRef = useRef();
    const product = useLoaderData();
    const [bids,setBids] = useState([]);

    if(!product){
      return <p className="text-5xl">Loading..............</p>
    }
    const {
        _id: productId,
        title,
        price_min,
        price_max,
        email,
        category,
        created_at,
        image,
        status,
        location,
        seller_name,
        condition,
        usage,
        description,
        seller_contact,
        productImageUrl
    }  = product;
    
    const {user,loading} = use(AuthContext);
    console.log(user?.accessToken);
    
        
   console.log(productId,price_min,price_max,title);
    const handleModal = () =>{
        modalRef.current.showModal()
    }
    const handleBidSubmit = e =>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const imageUrl = e.target.image.value;
        const price = e.target.price.value;
        const contact = e.target.phoneNumber.value;
        console.log(name,email,imageUrl,price,contact);
        
        const newBid = {
            product: productId, // product
            buyer_image: imageUrl,
            buyer_name: name,
            buyer_contact: contact,
            buyer_email	: email,
            bid_price : price, 
            status: status, // product
        }

        if(loading) return;
        fetch(`http://localhost:3000/bids`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBid)
        })
        .then(res => res.json())
        .then(data => {
          if(data.insertedId){
            modalRef.current.close()
            newBid._id = data.insertedId;
            const newBids = [...bids, newBid];
            newBids.sort((a,b) => b.bid_price - a.bid_price);
            setBids(newBids)
            
          }
            console.log('after save to server',data)
            alert('BIds successfully done!')
            
        })
        .catch(err => console.log(err))

        console.log(newBid);
        
    }

    const productInfoToBid = {
      productId,
      price_min,
      price_max,
      title,
      bids,
      setBids
    }
  return (
    <>
      <div className="max-w-6xl mx-auto p-6 ">
      {/* Back Button */}
      <Link to={'/all-products'}
        className="flex items-center text-gray-600 hover:text-purple-600 mb-4 text-sm"
      >
         -Back To Products
      </Link>

      <div className="grid md:grid-cols-2 gap-6 border rounded-2xl p-6 bg-white shadow-sm">
        {/* Left: Image and Description */}
        <div>
          <div className="w-full h-64 bg-gray-200 rounded-xl mb-4">
            <img src={image || productImageUrl} alt="" srcset="" />
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-2">
              Product Description
            </h3>
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-2">
              <p>
                <span className="font-medium text-gray-700">Condition:</span>{" "}
                {condition}
              </p>
              <p>
                <span className="font-medium text-gray-700">Usage Time:</span>{" "}
                {usage}
              </p>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Right: Info, Seller, and Button */}
        <div className="space-y-5">
          {/* Product Header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {title}
            </h1>
            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded">
              {category}
            </span>
          </div>

          {/* Price */}
          <div>
            <p className="text-green-600 font-semibold text-xl">
              ${price_min} - {price_max}
            </p>
            <p className="text-gray-500 text-sm">Price starts from</p>
          </div>

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Product Details
            </h3>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Product ID:</span> {productId}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Posted:</span> {created_at}
            </p>
          </div>

          {/* Seller Information */}
          <div className="border-t border-gray-200 pt-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Seller Information
            </h3>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full">
                <img src={image} alt="" srcset="" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{seller_name}</p>
                <p className="text-xs text-gray-500">{email}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Location:</span>{" "}
              {location}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Contact:</span>{" "}
              {seller_contact}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Status:</span>{" "}
              <span className="bg-yellow-100 text-yellow-600 px-2 py-0.5 text-xs rounded">
                {status}
              </span>
            </p>
          </div>

        <dialog ref={modalRef} className="modal">
            <div className="modal-box">
                <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    <div className="bg-white w-[470px] rounded-2xl shadow-md p-8">
                        <h2 className="text-xl font-semibold text-center mb-6">
                        Give Seller Your Offered Price
                        </h2>

                        <form className="space-y-4" onSubmit={handleBidSubmit}>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Buyer Name
                                </label>
                                <input
                                    disabled
                                    name="name"
                                    type="text"
                                    defaultValue={user?.displayName}
                                    placeholder="Your name"
                                    className="border cursor-not-allowed border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                </div>
                                <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Buyer Email
                                </label>
                                <input
                                    name="email"
                                    disabled
                                    defaultValue={user?.email}
                                    type="email"
                                    placeholder="Your Email"
                                    className="border cursor-not-allowed border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                </div>
                            </div>

                            {/* Buyer Image URL */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                Buyer Image URL
                                </label>
                                <input
                                name="image"
                                disabled
                                type="url"
                                defaultValue={user?.photoURL}
                                placeholder="https://...your_img_url"
                                className="w-full cursor-not-allowed border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Offer Price */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                Place your Price
                                </label>
                                <input
                                name="price"
                                type="number"
                                placeholder="e.g. Artisan Roasters"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Contact Info */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                Contact Info
                                </label>
                                <input
                                name="phoneNumber"
                                type="number"
                                placeholder="e.g. +1-555-1234"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-2">
                               <form method="dialog">
                                    <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100">
                                        Cancel
                                    </button>
                                </form>
                                <button
                                type="submit"
                                className="px-5 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                                >
                                Submit Bid
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
          <button onClick={handleModal} className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl transition">
            I Want Buy This Product
          </button>
        </div>
      </div>
    </div>
    <BidsForProduct productDetails={productInfoToBid} />
    </>
  );
}

export default ProductDetails;
