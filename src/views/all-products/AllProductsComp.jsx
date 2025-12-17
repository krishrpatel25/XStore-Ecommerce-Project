import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FiImage, FiSearch } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonCard from "@/components/ui/skeletonCard";

/* ---------------- DEBOUNCE (UNCHANGED) ---------------- */
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/* ---------------- PAGINATION COMPONENT (UNCHANGED) ---------------- */
function PaginationComponent({ page, setPage, totalPages }) {
  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage(page - 1)} />
          </PaginationItem>
        )}

        {totalPages <= 4 ? (
          Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                href="#"
                isActive={page === i + 1}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        ) : (
          <>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={page === 1}
                onClick={() => setPage(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {page > 3 && totalPages > 5 && <PaginationEllipsis />}

            {Array.from({ length: 3 }, (_, i) => {
              const pageNum = page - 1 + i;
              if (pageNum <= 1 || pageNum >= totalPages) return null;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    isActive={page === pageNum}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {page < totalPages - 2 && totalPages > 5 && <PaginationEllipsis />}

            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={page === totalPages}
                onClick={() => setPage(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {page < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => setPage(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

/* ---------------- DROPDOWN (UNCHANGED) ---------------- */
const frameworks = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
  { value: "40", label: "40" },
  { value: "50", label: "50" },
  { value: "60", label: "60" },
];

function DropDown({ value, setValue }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-[300px] justify-center items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[80px] justify-between">
            {value}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[80px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <p className="text-[12px]">Product per page</p>
    </div>
  );
}

/* ---------------- PRODUCTS ---------------- */
function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState(""); // filter
  const [apiSearch, setApiSearch] = useState(""); // API search
  const [imageLoaded, setImageLoaded] = useState({});
  const [filteredProductLoading, setFilteredProductLoading] = useState(true);

  /* -------- DEBOUNCED API SEARCH -------- */
  const debouncedApiSearch = useCallback(
    debounce((value) => {
      setPage(1);
      setApiSearch(value);
    }, 500),
    []
  );

  /* -------- PRODUCTS QUERY -------- */
  const fetchProducts = async ({ queryKey }) => {
    const [, limit, page] = queryKey;
    const skip = (page - 1) * limit;

    try {
      const res = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      return res.data ?? { products: [], total: 0 };
    } catch {
      return { products: [], total: 0 };
    }
  };

  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products", limit, page],
    queryFn: fetchProducts,
    enabled: !apiSearch,
    keepPreviousData: true,
  });

  /* -------- SEARCH QUERY -------- */
  const fetchApiSearch = async ({ queryKey }) => {
    const [, value] = queryKey;
    if (!value?.trim()) return { products: [] };

    try {
      const res = await axios.get(
        `https://dummyjson.com/products/search?q=${value}`
      );
      return res.data ?? { products: [] };
    } catch {
      return { products: [] };
    }
  };

  const { data: searchData } = useQuery({
    queryKey: ["searchProducts", apiSearch],
    queryFn: fetchApiSearch,
    enabled: !!apiSearch,
    keepPreviousData: true,
  });

  /* -------- SYNC DATA -------- */
  useEffect(() => {
    const activeData = apiSearch ? searchData : productsData;
    if (!activeData) return;

    setProducts(activeData.products);
    setTotalPages(Math.ceil(activeData.total / limit));
    setFilteredProductLoading(false);
  }, [productsData, searchData, apiSearch, limit]);

  /* -------- FILTER SEARCH -------- */
  const filteredProducts = products.filter(
    (product) =>
      product.title?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase()) ||
      product.category?.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewProduct = (id) => navigate(`/product/${id}`);
  const handleClear = () => setSearch("");
  const handleClearApi = () => {
    debouncedApiSearch("");
  };

  const handleImageLoad= (id) =>
    setImageLoaded((prev) => ({ ...prev, [id]: true }));

 

  return (
    <div className=" py-6 px-4 lg:px-20 min-h-screen">
      {/* ---------------------------------------- */}
      {/* divider FEATURES */}
      {/* ---------------------------------------- */}
      <section className="flex flex-col text-center">
        <div className="flex pt-30 items-center justify-center gap-3">
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <h2 className="mx-4 text-primary text-xl md:text-2xl  font-semibold tracking-wide">
            All Products
          </h2>

          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>
        <div></div>
      </section>

      {/* search bars */}
      <div className="flex w-full gap-4 py-4 rounded-2xl justify-end ">
        <div className="relative w-56">
          {/* RIGHT ICONS CONTAINER */}
          <div className="absolute inset-y-0 right-3 flex items-center gap-2">
            {/* Clear (X) Button */}
            {apiSearch && (
              <button
                onClick={handleClearApi}
                className="text-gray-500 hover:text-red-500 transition flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}

            {/* Search Icon */}
            <FiSearch className="text-gray-500 w-5 h-5" />
          </div>

          {/* INPUT FIELD */}
          <input
            type="text"
            placeholder="Search products..."
            className="w-full h-full px-4 py-2 rounded-full border border-gray-300 
               focus:ring-2 focus:ring-accent outline-none pr-14"
            value={apiSearch}
            onChange={(e) => setApiSearch(e.target.value)}
          />
        </div>

        {/* Filter Box */}
        <div className="relative w-56">
          {/* RIGHT ICONS (Clear + Filter Icon) */}
          <div className="absolute inset-y-0 right-3 flex items-center gap-2">
            {/* Clear Button */}
            {search && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-500 hover:text-red-500 transition flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}

            {/* Filter Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 018 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
          </div>

          {/* INPUT FIELD */}
          <input
            type="text"
            placeholder="Filter..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 
               focus:ring-2 focus:ring-accent outline-none pr-14"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredProductLoading ? (
        <SkeletonCard />
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10 mt-10 px-4 sm:px-12 lg:px-14">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleViewProduct(product.id)}
              className="cursor-pointer"
              onLoad={() => setFilteredProductLoading(false)}
            >
              {/* Image Box - Clean + Minimal */}
              <div className="relative w-full h-64 bg-white rounded-2xl shadow-sm flex items-center justify-center overflow-hidden transition-all duration-500 group hover:-translate-y-3 hover:shadow-xl hover:scale-[1.01] ">
                {/* Skeleton */}
                {!imageLoaded[product.id] && (
                  <>
                    <Skeleton className="absolute inset-0 rounded-2xl" />
                    <FiImage className="absolute inset-0 m-auto text-gray-300 text-4xl z-10" />
                  </>
                )}

                {/* Image */}
                <img
                  src={product.images[0]}
                  alt={product.title}
                  loading="lazy"
                  onLoad={() => handleImageLoad(product.id)}
                  className={`h-full object-contain p-4 transition-opacity duration-500
                  ${imageLoaded[product.id] ? "opacity-100" : "opacity-0"}`}
                />
              </div>

              {/* Title + Price */}
              <div className="mt-3 flex justify-between items-center">
                <h2 className="text-base text-[12px] font-medium text-gray-900">
                  {product.title}
                </h2>

                <p className="text-base text-[16px] text-accent font-semibold">
                  ${product.price}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }, (_, i) => {
                  const rating = product.rating;

                  if (i < Math.floor(rating)) {
                    return (
                      <i
                        key={i}
                        className="bi bi-star-fill text-green-500 text-[12px]"
                      ></i>
                    );
                  } else if (i < rating) {
                    return (
                      <i
                        key={i}
                        className="bi bi-star-half text-green-500 text-[12px]"
                      ></i>
                    );
                  } else {
                    return (
                      <i
                        key={i}
                        className="bi bi-star text-gray-300 text-[12px]"
                      ></i>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-[180px] flex items-center justify-center">
          <div className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm shadow-md flex items-center gap-2 border border-accent/20">
            <i className="bi bi-binoculars text-accent text-lg"></i>
            <span className="text-sm text-accent font-medium">
              No products found
            </span>
          </div>
        </div>
      )}

      {/* Dropdown and Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 pt-14">
        <DropDown value={limit} setValue={setLimit} />

        <PaginationComponent
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default Products;
