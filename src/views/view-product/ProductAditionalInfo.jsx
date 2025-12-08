import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoMdCheckmark } from "react-icons/io";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function ProductAditionalInfo({ products }) {
  return (
    <div>
      <section className="pt-16">
        {/* Information buttons  */}
        <Tabs defaultValue="Description" className="w-full">
          <TabsList className="w-full h-[150px]  w-full bg-transparent border-b-2 border-primary rounded-none flex-col md: flex md:flex-row md:gap-10 md:h-[36px] ">
            <TabsTrigger
              className="rounded-none text-gray-700 
               data-[state=active]:font-semibold
               data-[state=active]:bg-transparent
               data-[state=active]:text-accent 
               data-[state=active]:underline 
               data-[state=active]:underline-offset-10
               data-[state=active]:decoration-primary 
               data-[state=active]:decoration-2 data-[state=active]:shadow-none focus:outline-none"
              value="Description"
            >
              Description
            </TabsTrigger>

            <TabsTrigger
              className="rounded-none text-gray-700
               data-[state=active]:font-semibold
               data-[state=active]:bg-transparent
               data-[state=active]:text-accent 
               data-[state=active]:underline 
               data-[state=active]:underline-offset-10
               data-[state=active]:decoration-primary 
               data-[state=active]:decoration-2 data-[state=active]:shadow-none focus:outline-none"
              value="info"
            >
              Additional Information
            </TabsTrigger>

            <TabsTrigger
              className="rounded-none text-gray-700
               data-[state=active]:font-semibold
               data-[state=active]:bg-transparent
               data-[state=active]:text-accent 
               data-[state=active]:underline 
               data-[state=active]:underline-offset-10
               data-[state=active]:decoration-primary 
               data-[state=active]:decoration-2 data-[state=active]:shadow-none focus:outline-none"
              value="reviews"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          {/* description  */}
          <div className="w-full py-6">
            {/* Description */}
            <TabsContent value="Description" className="w-full">
              <p className="text-gray-700 font-medium text-[14px] leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                sed aut dolorem placeat!
              </p>

              <ul className="pt-4  flex flex-col gap-3">
                {[
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis adipisci.",
                  "Necessitatibus, eius laudantium maxime iste.",
                  "Quos corporis quibusdam assumenda eligendi non ratione.",
                  "Lorem ipsum dolor sit amet.",
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, nobis.",
                  "Lorem ipsum, dolor sit amet consectetur adipisicing.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-700 font-medium text-[14px]"
                  >
                    <IoMdCheckmark className="mt-1 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            {/* Additional Information */}
            <TabsContent value="info" className="">
              <div className="flex p-2 justify-center w-full">
                <div className=" overflow-visible flex justify-center  w-[50%]">
                  <table className="w-full table-auto border-collapse border-2 border-gray-300  text-left text-sm sm:text-base">
                    <tbody className="divide-y-2 divide-gray-300">
                      <tr>
                        <td className="px-2 sm:px-4 py-2 text-sm font-semibold break-words">
                          Model
                        </td>
                        <td className="px-2 sm:px-4 py-2 text-sm break-words">
                          {products?.title}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 sm:px-4 py-2 text-sm font-semibold break-words">
                          Category
                        </td>
                        <td className="px-2 sm:px-4 py-2 text-sm break-words">
                          {products?.category}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 sm:px-4 py-2 text-sm font-semibold break-words">
                          Color
                        </td>
                        <td className="px-2 sm:px-4 py-2 break-words">Black</td>
                      </tr>
                      <tr>
                        <td className="px-2  sm:px-4 py-2 text-sm font-semibold break-words">
                          Weight
                        </td>
                        <td className="px-2 sm:px-4 py-2 text-sm break-words">
                          {products?.weight}kg
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 sm:px-4 py-2 text-sm font-semibold break-words">
                          Dimensions
                        </td>
                        <td className="px-2 sm:px-4 py-2 text-sm break-words">
                          {products?.dimensions?.width} x{" "}
                          {products?.dimensions?.height} x{" "}
                          {products?.dimensions?.depth} cm
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 sm:px-4 py-2 text-sm font-semibold break-words">
                          Size
                        </td>
                        <td className="px-2 sm:px-4 text-sm py-2 break-words">
                          XL, XXL, LG, SM, MD
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 sm:px-4 py-2 text-sm font-semibold break-words">
                          Warranty
                        </td>
                        <td className="px-2 sm:px-4 py-2 text-sm break-words">
                          {products?.warrantyInformation}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 sm:px-4 py-2 text-sm font-semibold break-words">
                          Series
                        </td>
                        <td className="px-2 sm:px-4 py-2 text-sm break-words">
                          {products?.title}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 sm:px-4 py-2 text-sm font-semibold break-words">
                          Discount
                        </td>
                        <td className="px-2 sm:px-4 py-2 text-sm break-words">
                          {products?.discountPercentage} %
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="reviews" className="w-full">
              <Carousel className="flex justify-center overflow-x-auto px-2">
                <CarouselContent className="flex space-x-3">
                  {products?.reviews?.map((review, index) => (
                    <CarouselItem
                      key={index}
                      className="
            w-[180px]      /* NEW: Mobile width ONLY */
            xs:w-[200px]   /* NEW: Slightly bigger on very small screens */
            sm:w-[200px]   /* same as your original */
            flex-shrink-0 flex justify-center
          "
                    >
                      <div className="relative w-full mx-auto mb-4">
                        {/* Top Gradient Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-white rounded-t-xl"></div>

                        {/* Main Card */}
                        <div
                          className="bg-primary rounded-4xl rounded-t-[10px] 
                            p-3 sm:p-6 md:p-8   /* NEW: smaller padding ONLY for mobile (p-3) */"
                        >
                          {/* User Info */}
                          <div className="p-2 sm:p-4 rounded-2xl flex items-center gap-3 mb-2 text-background">
                            {/* NEW: Smaller image ONLY on mobile */}
                            <img
                              src="/src/assets/ProfilePic2.jpg"
                              alt="profile"
                              className="
                    h-12 w-12     /* mobile */
                    sm:h-20 sm:w-20   /* your original desktop size untouched */
                    rounded-full object-cover
                  "
                            />

                            <div>
                              <p className="font-semibold text-sm sm:text-base">
                                {review.reviewerName}
                              </p>
                              <p className="text-[10px] sm:text-sm text-background/80">
                                {review.reviewerEmail}
                              </p>
                            </div>
                          </div>

                          {/* Rating Stars */}
                          <div className="flex pt-2 sm:pt-4 items-center mb-2">
                            {Array.from({ length: 5 }, (_, i) => (
                              <svg
                                key={i}
                                className="
                      w-3.5 h-3.5     /* smaller only for mobile */
                      sm:w-5 sm:h-5   /* original size for md & lg */
                      text-accent
                    "
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.285-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                              </svg>
                            ))}
                          </div>

                          {/* Comment */}
                          <p className="text-xs sm:text-base text-background text-left leading-snug sm:leading-normal">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* hide navigation only on mobile */}
                <CarouselPrevious className="hidden sm:flex absolute left-2 sm:left-4 lg:left-40 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow" />
                <CarouselNext className="hidden sm:flex absolute right-2 sm:right-4 lg:right-40 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow" />
              </Carousel>
            </TabsContent>
          </div>
        </Tabs>
      </section>
    </div>
  );
}

export default ProductAditionalInfo;
