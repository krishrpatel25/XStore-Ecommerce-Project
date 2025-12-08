import React from 'react'

const CartComp = () => {
  
  return (
    <div className="px-4 md:px-10 lg:px-30 pt-20">
      <div className="">
        <h1 className="text-2xl font-semibold">My Cart</h1>
        <div className="flex gap-2 items-center ">
          <p className="text-sm text-gray-500">items in your cart</p>
          <p
            onClick={() => navigate("/allproducts")}
            className="text-primary text-sm font-medium hover:text-accent "
          >
            View more →
          </p>
        </div>
      </div>

      <div className="p-10">
        <h1 className="text-2xl font-bold">Your Cart</h1>

        <div className="bg-primary p-4 rounded-xl mt-4 flex items-center gap-4">
          <img src={cart.image} className="w-20 h-20 object-cover rounded-lg" />

          <div>
            <h2 className="text-xl font-semibold">{cart.title}</h2>
            <p className="text-accent font-bold text-lg">${cart.price}</p>

            <p className="text-gray-700">Quantity: {cart.qty}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartComp