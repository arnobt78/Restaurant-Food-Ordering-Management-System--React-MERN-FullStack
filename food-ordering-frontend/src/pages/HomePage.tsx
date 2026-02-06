import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useCitySearch } from "@/api/CityApi";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
  const navigate = useNavigate();
  const { loading: citiesLoading } = useCitySearch();

  const handleSearchSubmit = (formValues: SearchForm) => {
    const cityParam =
      formValues.city && formValues.city.trim() !== ""
        ? formValues.city
        : "all";
    navigate({
      pathname: `/search/${cityParam}`,
      search: formValues.searchQuery
        ? `?searchQuery=${encodeURIComponent(formValues.searchQuery)}`
        : undefined,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
          <h1 className="text-5xl font-bold tracking-tight text-orange-600">
            Discover Your Perfect Meal
          </h1>
          <span className="text-xl">
            Premium restaurants delivered to your door
          </span>
          <div className="flex flex-row gap-3 items-center justify-center">
            <div className="w-full">
              {citiesLoading ? (
                <div className="flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3">
                  <Skeleton className="h-8 w-32 ml-1" />
                  <div className="flex flex-1 items-center gap-2">
                    <Skeleton className="h-8 flex-1" />
                    <Skeleton className="h-8 flex-1" />
                  </div>
                  <Skeleton className="h-10 w-20 rounded-full" />
                  <Skeleton className="h-10 w-20 rounded-full" />
                </div>
              ) : (
                <SearchBar
                  placeHolder="Search by Cuisine or Restaurant Name"
                  onSubmit={handleSearchSubmit}
                />
              )}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <img
            src="/landing.png"
            alt="Food delivery illustration"
            loading="lazy"
          />
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="font-bold text-3xl tracking-tighter">
              Experience Seamless Ordering
            </span>
            <span>
              Download the BigHungers mobile app for instant ordering, exclusive
              deals, and personalized recommendations tailored to your taste
            </span>
            <img
              src="/appDownload.png"
              alt="Download BigHungers app"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
