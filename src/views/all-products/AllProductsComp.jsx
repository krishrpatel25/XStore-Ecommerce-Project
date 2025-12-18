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

  const handleImageLoad = (id) =>
    setImageLoaded((prev) => ({ ...prev, [id]: true }));

  return (
    <div className=" px-4 md:px-10 lg:px-30 pt-20 min-h-screen">
      {/* ---------------------------------------- */}
      {/* divider FEATURES */}
      {/* ---------------------------------------- */}
      <section className="flex flex-col text-center">
        <div className="w-full pt-8 pb-10 flex flex-col">
          {/* Top Geometric Notch */}
          <div className="w-32 h-1.5 bg-primary ml-10"></div>

          <div className="flex items-center gap-4">
            {/* Left Line */}
            <div className="h-[1px] grow bg-foreground/10"></div>

            {/* MAIN HEADING BLOCK */}
            <div className="flex flex-col items-center text-center px-4">
              <span className="text-[10px] font-mono text-primary tracking-[0.4em] uppercase mb-1">
                Top_Demand
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-foreground leading-none">
                All <span className="text-primary">Products</span>
              </h2>

              {/* Small Detail Label under the title */}
              <div className="mt-4 px-3 py-1 border border-foreground/10 bg-foreground/5 flex items-center gap-3">
                <div className="w-1 h-1 bg-accent animate-pulse"></div>
                <span className="text-[9px] font-black font-mono tracking-tighter text-foreground/60 uppercase">
                  System_Transition_v.02
                </span>
              </div>
            </div>

            {/* Right Line (Primary Color for contrast) */}
            <div className="h-[1px] w-24 md:w-64 bg-primary"></div>
          </div>

          {/* Optional: Descriptive sub-text aligned to the right line */}
          <div className="flex justify-end pr-10 mt-2">
            <p className="max-w-[300px] text-[10px] text-right font-medium opacity-40 uppercase leading-tight">
              Explore the items that consistently top the charts and win
              customer trust day after day.
            </p>
          </div>
        </div>
      </section>

      {/* search bars */}
      <div className="flex flex-col sm:flex-row w-full gap-4 py-4 justify-end  font-mono">
        {/* SEARCH MODULE */}
        <div className="relative w-full md:w-64 group">
          <div className="absolute inset-y-0 right-2 flex items-center gap-2 z-30">
            {/* CLEAR BUTTON - Always shows if text exists */}
            {apiSearch && (
              <button
                onClick={handleClearApi}
                className="h-7 w-7 flex items-center justify-center bg-red-500 text-white transition-colors duration-200 border border-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
                title="Clear Search"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            <FiSearch className="text-foreground/40 w-4 h-4 group-focus-within:text-accent transition-colors" />
          </div>

          <input
            type="text"
            placeholder="SEARCH_PRODUCTS..."
            className="w-full bg-background border-2 border-foreground/10 px-4 py-3 rounded-none text-[11px] tracking-wider outline-none focus:border-accent focus:bg-background transition-all pr-20 placeholder:opacity-30 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] focus:shadow-[4px_4px_0px_0px_var(--accent)]"
            value={apiSearch}
            onChange={(e) => setApiSearch(e.target.value)}
          />
          <div className="absolute uppercase -top-2 left-3 bg-background px-1 text-[8px] font-bold text-primary uppercase tracking-widest">
            search_product
          </div>
        </div>

        {/* FILTER MODULE */}
        <div className="relative w-full md:w-64 group">
          <div className="absolute inset-y-0 right-2 flex items-center gap-2 z-30">
            {/* CLEAR BUTTON - Always shows if text exists */}
            {search && (
              <button
                onClick={handleClear}
                className="h-7 w-7 flex items-center justify-center bg-red-500 text-white hover:bg-black transition-colors border border-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            <svg
              className="w-4 h-4 text-foreground/40"
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

          <input
            type="text"
            placeholder="FILTER_RESULTS..."
            className="w-full bg-background border-2 border-foreground/10 px-4 py-3 rounded-none text-[11px] uppercase tracking-widest outline-none focus:border-accent focus:bg-background transition-all pr-20 placeholder:opacity-30 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] focus:shadow-[4px_4px_0px_0px_var(--accent)]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute -top-2 left-3 bg-background px-1 text-[8px] font-bold text-foreground/40 uppercase tracking-widest">
            Local_Filter
          </div>
        </div>
      </div>

      {filteredProductLoading ? (
        <SkeletonCard />
      ) : filteredProducts.length > 0 ? (
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
            mt-10
            border-t border-l border-foreground/10
          "
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleViewProduct(product.id)}
              onLoad={() => setFilteredProductLoading(false)}
              className="
                group relative flex flex-col p-6
                cursor-pointer
                border-b border-r border-foreground/10
                transition-all duration-300
                hover:bg-background
                hover:-translate-y-1
              "
            >
              {/* ───────── TOP META ───────── */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-[9px] font-mono opacity-40 uppercase tracking-widest">
                  {product.category || "General_Asset"}
                </span>
                <span className="text-[9px] font-mono opacity-40">
                  00{product.id}
                </span>
              </div>

              {/* ───────── IMAGE ───────── */}
              <div className="relative aspect-[4/5] w-full mb-8 flex items-center justify-center overflow-hidden">
                {!imageLoaded[product.id] && (
                  <>
                    <Skeleton className="absolute inset-0" />
                    <FiImage className="absolute text-3xl opacity-20" />
                  </>
                )}

                <img
                  src={product.images[0]}
                  alt={product.title}
                  loading="lazy"
                  onLoad={() => handleImageLoad(product.id)}
                  className={`
              h-[80%] w-[85%] object-contain
              transition-all duration-500
              ${imageLoaded[product.id] ? "opacity-100" : "opacity-0"}
              group-hover:scale-[1.04]
            `}
                />

                {/* subtle glow */}
                <div
                  className="
              pointer-events-none absolute inset-0
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]
            "
                />
              </div>

              {/* ───────── TEXT CONTENT ───────── */}
              <div className="mt-auto space-y-4">
                <h2
                  className="
                    text-sm font-bold uppercase leading-tight
                    text-foreground/90
                    transition-colors duration-300
                    group-hover:text-primary
                  "
                >
                  {product.title}
                </h2>
                {/* ───────── RATING (UNCHANGED LOGIC) ───────── */}
                <div className="flex items-center gap-1 pt-1">
                  {Array.from({ length: 5 }, (_, i) => {
                    const rating = product.rating;

                    if (i < Math.floor(rating)) {
                      return (
                        <i
                          key={i}
                          className="bi bi-star-fill text-green-500 text-[11px]"
                        />
                      );
                    } else if (i < rating) {
                      return (
                        <i
                          key={i}
                          className="bi bi-star-half text-green-500 text-[11px]"
                        />
                      );
                    } else {
                      return (
                        <i
                          key={i}
                          className="bi bi-star text-foreground/20 text-[11px]"
                        />
                      );
                    }
                  })}
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] opacity-30 font-mono uppercase">
                      Price
                    </span>
                    <span className="text-lg text-accent font-semibold tracking-tighter italic">
                      ${product.price}
                    </span>
                  </div>

                  {/* arrow reveal */}
                  <div
                    className="
                      w-8 h-8 rounded-full
                      border border-foreground/10
                      flex items-center justify-center
                      opacity-0 translate-x-1
                      transition-all duration-300
                      group-hover:opacity-100
                      group-hover:translate-x-0
                      group-hover:border-foreground/30
                    "
                  >
                    <span className="text-xs">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-96 flex flex-col items-center justify-center border-t border-b border-dashed border-foreground/20 bg-secondary/5 relative overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
            <span className="text-[20vw] font-black italic select-none">
              404_NULL
            </span>
          </div>

          <div className="relative flex flex-col items-center gap-4 text-center z-10">
            {/* Warning Icon with a pulse */}
            <div className="w-12 h-12 border border-primary flex items-center justify-center mb-2 animate-pulse">
              <span className="text-primary font-mono font-bold text-xl">
                !
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black uppercase italic tracking-tighter">
                Product_Not_Found
              </h3>
              <p className="text-[10px] font-mono opacity-40 uppercase tracking-[0.2em]">
                The requested asset [ID_NULL] does not exist in the database.
              </p>
            </div>

            {/* Small Technical Detail */}
            <div className="mt-6 px-4 py-2 border border-foreground/10 bg-background flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <span className="text-[9px] font-mono opacity-60">
                ERROR_CODE: 0x000404
              </span>
            </div>
          </div>

          {/* Corner Markings */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-foreground/20" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-foreground/20" />
        </div>
      )}

      {/* Dropdown and Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 p-10 border-t border-foreground/10 mt-20 relative">
        {/* Left Section: Limit Control */}
        <div className="flex items-center gap-4 group">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-tighter mb-1">
              Rows_Per_Page
            </span>
            <div className="relative">
              {/* Decorative corner for the dropdown container */}
              <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity" />

              <DropDown
                value={limit}
                setValue={setLimit}
                // Suggest adding a className prop to your DropDown to match the style:
                className="bg-background border border-foreground/10 rounded-none px-4 py-2 font-mono text-xs uppercase hover:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Divider line for technical feel */}
          <div className="hidden md:block h-8 w-[1px] bg-foreground/10 ml-4" />
        </div>

        {/* Center Decoration (Optional: Adds to the "System" look) */}
        <div className="hidden lg:flex items-center gap-2 opacity-20">
          <div className="w-1 h-1 bg-foreground rounded-full" />
          <div className="w-12 h-[1px] bg-foreground" />
          <span className="text-[8px] font-mono uppercase tracking-[0.5em]">
            Nav_Module
          </span>
          <div className="w-12 h-[1px] bg-foreground" />
          <div className="w-1 h-1 bg-foreground rounded-full" />
        </div>

        {/* Right Section: Pagination */}
        <div className="flex flex-col items-center md:items-end">
          <span className="text-[9px] font-mono text-foreground/40 uppercase tracking-widest mb-2">
            Page_Index: {page} of {totalPages}
          </span>

          <div className="p-1 bg-secondary/10 border border-foreground/5 hover:border-primary/30 transition-colors">
            <PaginationComponent
              page={page}
              setPage={setPage}
              totalPages={totalPages}
              // Assuming your component accepts styling, apply these to its buttons:
              // "rounded-none font-mono uppercase text-[10px] border-foreground/10"
            />
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="absolute bottom-0 right-0 w-24 h-[1px] bg-primary/40" />
      </div>
    </div>
  );
}

export default Products;
