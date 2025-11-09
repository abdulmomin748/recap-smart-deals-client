
import useAuth from '../hooks/useAuth';
import useSequreAxios from '../hooks/useSequreAxios';

const AddProduct = () => {
    // const{user} = use(AuthContext);
    const {user} = useAuth;
    const axiosSequre = useSequreAxios();
    console.log(axiosSequre);
    
    const handleAddProduct = e => {
        e.preventDefault();
        const title = e.target.title.value;
        const category = e.target.category.value;
        const minPrice = e.target.minPrice.value;
        const maxPrice = e.target.maxPrice.value;
        const usageTime = e.target.usageTime.value;
        const productImageUrl = e.target.productImageUrl.value;
        const sellerName = e.target.sellerName.value;
        const email = e.target.sellerEmail.value;
        const sellerContact = e.target.sellerContact.value;
        const sellerImageUrl = e.target.sellerImageUrl.value;
        const location = e.target.location.value;
        const description = e.target.description.value;
        console.log(title,category,minPrice,maxPrice,usageTime,productImageUrl,sellerName,email,sellerContact,sellerImageUrl,location,description);
        const newProduct = {
            title,
            category,
            minPrice,
            maxPrice,
            usageTime,
            productImageUrl,
            sellerName,
            email,
            sellerContact,
            sellerImageUrl,
            location,
            description,
        }
        axiosSequre.post('/products',newProduct)
        .then(data => console.log(data.data))
        .catch(err => console.log(err)
        )
    }
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
                <form onSubmit={handleAddProduct}>
                {/* Title and Category Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="e.g., Yamaha F2 Guitar for Sale"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>
                    <select
                        name="category"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none bg-white"
                    >
                        <option value="">Select a Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="musical-instruments">Musical Instruments</option>
                        <option value="furniture">Furniture</option>
                        <option value="clothing">Clothing</option>
                        <option value="books">Books</option>
                        <option value="other">Other</option>
                    </select>
                    </div>
                </div>

                {/* Price Range Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Min Price You want to Sale ($)
                    </label>
                    <input
                        type="number"
                        name="minPrice"
                        placeholder="e.g., 19.5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Price You want to Sale ($)
                    </label>
                    <input
                        type="number"
                        name="maxPrice"
                        placeholder="Optional (default = Min Price)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                    </div>
                </div>

                {/* Product Condition and Usage Time Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Condition
                    </label>
                    <div className="flex items-center space-x-6">
                        <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="condition"
                            value="new"
                            className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-gray-700">Brand New</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="condition"
                            value="used"
                            className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-gray-700">Used</span>
                        </label>
                    </div>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Usage time
                    </label>
                    <input
                        type="text"
                        name="usageTime"
                        placeholder="e.g., 1 year 3 month"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                    </div>
                </div>

                {/* Product Image URL */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Product Image URL
                    </label>
                    <input
                    type="url"
                    name="productImageUrl"
                    placeholder="https://"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                </div>

                {/* Seller Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seller Name
                    </label>
                    <input
                        type="text"
                        name="sellerName"
                        defaultValue={user?.displayName}
                        placeholder="e.g., Artisan Roasters"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seller Email
                    </label>
                    <input
                        type="email"
                        name="sellerEmail"
                        defaultValue={user?.email}
                        placeholder="sell31955@gmail.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                    </div>
                </div>

                {/* Seller Contact and Image URL Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seller Contact
                    </label>
                    <input
                        type="tel"
                        name="sellerContact"
                        placeholder="e.g., +1-555-4234"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seller Image URL
                    </label>
                    <input
                        type="url"
                        name="sellerImageUrl"
                        defaultValue={user?.photoURL}
                        placeholder="https://"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                    </div>
                </div>

                {/* Location */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                    </label>
                    <input
                    type="text"
                    name="location"
                    placeholder="City, Country"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Simple Description about your Product
                    </label>
                    <textarea
                    name="description"
                    placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough....."
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-[1.02]"
                >
                    Create A Product
                </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;