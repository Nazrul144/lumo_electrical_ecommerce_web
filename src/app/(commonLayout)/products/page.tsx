"use client";
import ProductCard from "@/components/products/ProductCard";
import api from "@/lib/api";
import React, { useEffect, useState, useMemo } from "react";
import { Playfair_Display } from "next/font/google";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { FaArrowDownWideShort, FaFilter, FaArrowRight } from "react-icons/fa6";
import { EmptyData } from "@/components/shared/EmptyData";
import { Loader } from "@/components/shared/Loader";
import { RxCross2 } from "react-icons/rx";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

interface Category {
  id: number;
  name: string;
  image: string;
}

interface primary_image {
  id: number;
  alt_text?: string;
  image: string;
}

interface ProductProps {
  id?: number;
  name?: string;
  short_description?: string;
  category_name?: string;
  category_slug?: string;
  availability?: true;
  code?: string;
  popularity?: 1;
  primary_image?: primary_image;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategory, setSubCategory] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<number>(null);
  const [selectedSubCategories, setSelectedSubCategories] =
    useState<number>(null);
  const [selectedBrands, setSelectedBrands] = useState<string>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const closeMobileDrawer = () => {
    if (window.innerWidth < 1280) {
      setMobileFilterOpen(false);
    }
  };

  // memo: sorting
  const sortedProducts = useMemo(() => {
    if (!products) return products;
    const copy = [...products];
    if (selectedFilter === "A2Z") {
      return copy.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }
    if (selectedFilter === "Z2A") {
      return copy.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    }
    return copy;
  }, [products, selectedFilter]);

  // fatching products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();

        if (selectedBrands) params.append("brand", selectedBrands);
        if (selectedCategories)
          params.append("category", selectedCategories.toString());
        if (selectedSubCategories)
          params.append("subcategory", selectedSubCategories.toString());

        const queryString = params.toString()
          ? `/products/?${params.toString()}`
          : "/products/";

        const response = await api.get(queryString);
        setProducts(response?.data?.results?.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [selectedBrands, selectedCategories, selectedSubCategories]);

  // faching brands
  useEffect(() => {
    const fatchingBrands = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/products/brands`);
        setBrands(response?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fatchingBrands();
  }, []);

  // faching categories
  useEffect(() => {
    const fatchingCategories = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/products/categories?page=1`);
        setCategories(response?.data?.results?.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fatchingCategories();
  }, []);

  // faching sub-categories
  useEffect(() => {
    const fatchingCategories = async () => {
      try {
        setIsLoading(true);
        if (selectedCategories) {
          const response = await api.get(
            `/products/categories/${selectedCategories}/subcategories`
          );

          setSubCategory(response?.data?.results?.data);
        } else {
          setSubCategory([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fatchingCategories();
  }, [selectedCategories]);

  if (isLoading) return <Loader />;
  if (sortedProducts?.length === 0) return <EmptyData />;

  // ============================
  // FILTER SIDEBAR (reusable)
  // ============================

  const FiltersUI = (
    <div className="w-60 flex flex-col gap-5 mt-18">
      {/* ----- BRANDS ------- */}
      <Accordion type="single" collapsible className="w-full rounded-lg">
        <AccordionItem value="item-3">
          <AccordionTrigger className="bg-gradient-to-r from-[#088347] to-[#C6E824] text-white px-4">
            Brand
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 py-2 mt-2 max-h-96 overflow-y-auto scrollbar-hidden">
            {brands?.map((brand, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedBrands(brand);
                  closeMobileDrawer();
                }}
                className="flex justify-between items-center gap-3 bg-gradient-to-r from-[#088347] to-[#C6E824] p-3 rounded-md cursor-pointer"
              >
                <Label className="text-white">{brand}</Label>
                <FaArrowRight className="text-white" />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* ----- CATEGORIES ------- */}
      <Accordion type="single" collapsible className="w-full  rounded-lg">
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-gradient-to-r from-[#088347] to-[#C6E824] text-white px-4">
            Categories
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 py-2 mt-2 max-h-96 overflow-y-auto scrollbar-hidden">
            {categories?.map((category) => (
              <div
                key={category.id}
                onClick={() => {
                  setSelectedCategories(category?.id);
                  closeMobileDrawer();
                }}
                className="flex justify-between items-center gap-3 bg-gradient-to-r from-[#088347] to-[#C6E824] p-3 rounded-md cursor-pointer"
              >
                <Label className="text-white">{category.name}</Label>
                <FaArrowRight className="text-white" />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* ----- SUBCATEGORIES ------- */}
      {subCategory.length > 0 && (
        <Accordion type="single" collapsible className="w-full rounded-lg max-h-96 overflow-y-auto scrollbar-hidden">
          <AccordionItem value="item-2">
            <AccordionTrigger className="bg-gradient-to-r from-[#088347] to-[#C6E824] text-white px-4">
              Sub Categories
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 py-2 mt-2">
              {subCategory?.map((monoSubCategory) => (
                <div
                  key={monoSubCategory?.id}
                  className="flex justify-between items-center gap-3 bg-gradient-to-r from-[#088347] to-[#C6E824] p-3 rounded-md cursor-pointer"
                  onClick={() => {
                    setSelectedSubCategories(monoSubCategory.id);
                    closeMobileDrawer();
                  }}
                >
                  <Label>{monoSubCategory.name}</Label>
                  <FaArrowRight className="text-white" />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );

  return (
    <div className="my-32">
      <h1
        className={`text-center font-bold text-2xl my-8 ${playfair.className}`}
      >
        All Products
      </h1>

      <div className="flex gap-5 justify-center">
        {/* DESKTOP FILTER */}
        <div className="hidden xl:block">{FiltersUI}</div>

        {/* MOBILE FILTER DRAWER */}
        {mobileFilterOpen && (
          <div
            className="fixed inset-0 bg-black/60 bg-opacity-40 z-50 xl:hidden"
            onClick={closeMobileDrawer}
          >
            <div
              className="w-72 bg-white h-full shadow-lg px-6 py-4 overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside drawer
            >
              <div className="flex justify-end">
                <button
                  className="border rounded-full p-2 font-bold"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  <RxCross2 className="text-xl" />
                </button>
              </div>
              {FiltersUI}
            </div>
          </div>
        )}

        {/* PRODUCTS SECTION */}
        <div>
          {/* top bar: filter + sort */}
          <div className="my-4 flex justify-between items-center">
            {/* MOBILE FILTER TOGGLE */}
            <div>
              <div
                className="flex gap-2 items-center border p-2 rounded bg-[#ECEFF1] cursor-pointer xl:hidden"
                onClick={() => setMobileFilterOpen(true)}
              >
                <FaFilter className="text-xl" />
                <p>Filters</p>
              </div>
            </div>

            {/* SORTING */}
            <div className="flex items-center gap-2 border-2 rounded bg-[#ECEFF1] p-2 ">
              <FaArrowDownWideShort className="text-xl" />
              <select
                value={selectedFilter ?? ""}
                onChange={(e) => setSelectedFilter(e.target.value || null)}
                className="bg-[#ECEFF1] outline-none w-20"
              >
                <option disabled value="">
                  Short by
                </option>
                <option value="A2Z">A to Z</option>
                <option value="Z2A">Z to A</option>
              </select>
            </div>
          </div>

          {/* products grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
            {sortedProducts?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedFilter={selectedFilter}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
