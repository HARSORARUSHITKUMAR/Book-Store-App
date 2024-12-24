import React from 'react'

import { useAuth } from '../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../redux/orders/ordersApi';

const getOrdersPage = () => {

    const { currUser } = useAuth();

    // get all getOrderss 
    const { data: getOrders = [], isLoading, isError } = useGetOrderByEmailQuery(currUser.email);
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error geting getOrders data</div>

    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Your Orders</h2>
            {
                getOrders.length === 0 ? (<div>No Orders found!</div>)
                    : (
                        <div>
                            {
                                getOrders.map((getOrders, index) => (
                                    <div key={getOrders._id} className="border-b mb-4 pb-4">
                                        <p className='p-1 bg-secondary text-white w-10 rounded mb-1'># {index + 1}</p>
                                        <h2 className="font-bold">getOrders ID: {getOrders._id}</h2>
                                        <p className="text-gray-600">Name: {getOrders.name}</p>
                                        <p className="text-gray-600">Email: {getOrders.email}</p>
                                        <p className="text-gray-600">Phone: {getOrders.phone}</p>
                                        <p className="text-gray-600">Total Price: ${getOrders.totalPrice}</p>
                                        <h3 className="font-semibold mt-2">Address:</h3>
                                        <p> {getOrders.address.city}, {getOrders.address.state}, {getOrders.address.country}, {getOrders.address.zipcode}</p>
                                        <h3 className="font-semibold mt-2">Products Id:</h3>
                                        <ul>
                                            {getOrders.productIds.map((productId) => (
                                                <li key={productId}>{productId}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                    )
            }
        </div>
    )
}

export default getOrdersPage;