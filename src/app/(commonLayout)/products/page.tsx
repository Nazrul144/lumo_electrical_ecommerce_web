
import ProductCard from "@/components/products/ProductCard";
import React from "react";

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  };
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  };
}


const ProductsPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-24 mb-4">All Products</h1>
      <div className="flex justify-center z-0">
      <div>
      </div>

      <div className="lg:grid grid-cols-1 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <ProductCard key={user.id} user={user} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProductsPage;
