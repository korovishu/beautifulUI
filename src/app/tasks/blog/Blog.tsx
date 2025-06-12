"use client";
import { useState, useEffect } from "react";
import {
  Star,
  Clock,
  MapPin,
  Utensils,
  ChevronLeft,
  Heart,
  Share2,
  Award,
  Coffee,
  Flame,
} from "lucide-react";

// Define types for our data structures
type Review = {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  helpfulCount: number;
  images?: string[];
  likes?: number;
  userLiked?: boolean;
};

type Restaurant = {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  cuisine: string;
  price: string;
  address: string;
  hours: string;
  distance: string;
  description: string;
  additionalInfo: string[];
  features: string[];
  highlights: string[];
  about: string;
  menuPhotos: string[];
  priceRange: string;
};

type FilterState = {
  searchQuery: string;
  minRating: number;
  selectedCuisine: string;
  sortBy: string;
  priceRange: string;
};

// Mock data - in a real app this would come from an API
const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "The Kitchen Table",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviewCount: 124,
    categories: ["Brunch", "Dinner", "Breakfast"],
    cuisine: "American",
    price: "$$",
    priceRange: "Moderate",
    address: "1234 Elm Street, Seattle WA",
    hours: "7:00 AM - 10:00 PM",
    distance: "0.5 miles",
    description:
      "Cozy neighborhood restaurant serving seasonal American cuisine with a focus on local ingredients. Our brunch is particularly popular with locals.",
    additionalInfo: ["Gluten-free options available", "Vegan friendly"],
    features: ["Outdoor seating", "Parking available"],
    highlights: ["Breakfast", "Lunch", "Dinner"],
    about:
      "The Kitchen Table has been serving the community for over 10 years. Our chef focuses on seasonal menus that highlight the best local ingredients.",
    menuPhotos: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: 2,
    name: "El Farolito",
    image:
      "https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    reviewCount: 98,
    categories: ["Lunch", "Dinner"],
    cuisine: "Mexican",
    price: "$$",
    priceRange: "Moderate",
    address: "5678 Oak Street, Seattle WA",
    hours: "11:00 AM - 9:00 PM",
    distance: "1.2 miles",
    description:
      "Authentic Mexican cuisine with a cozy atmosphere. Known for our carne asada and homemade tortillas.",
    additionalInfo: ["Vegan options available", "Family-friendly"],
    features: ["Takeout", "Delivery"],
    highlights: ["Tacos", "Burritos", "Margartias"],
    about:
      "Family-owned restaurant serving authentic Mexican dishes with love and tradition.",
    menuPhotos: [
      "https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: 3,
    name: "Sushi Zen",
    image:
      "https://images.unsplash.com/photo-1555421689-3f034debb7a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewCount: 87,
    categories: ["Lunch", "Dinner"],
    cuisine: "Japanese",
    price: "$$$$",
    priceRange: "High-end",
    address: "9123 Pine Street, Seattle WA",
    hours: "5:00 PM - 11:00 PM",
    distance: "2.0 miles",
    description:
      "Premium sushi experience in an elegant setting. Omakase tasting menu available.",
    additionalInfo: ["Gluten-free options", "Sake pairing available"],
    features: ["Reservations required", "Bar"],
    highlights: ["Sushi", "Omakase", "Sake"],
    about:
      "Sushi Zen offers an intimate dining experience with the finest quality seafood and traditional Japanese technique.",
    menuPhotos: [
      "https://images.unsplash.com/photo-1555421689-3f034debb7a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: 4,
    name: "Street Thai",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviewCount: 112,
    categories: ["Lunch", "Dinner"],
    cuisine: "Thai",
    price: "$",
    priceRange: "Budget",
    address: "4567 Market Street, Seattle WA",
    hours: "11:00 AM - 9:30 PM",
    distance: "0.8 miles",
    description:
      "Quick service Thai food with authentic flavors. Popular for lunch and takeout.",
    additionalInfo: ["Vegan options", "Spicy dishes available"],
    features: ["Takeout", "No reservations"],
    highlights: ["Pad Thai", "Green Curry", "Summer Rolls"],
    about:
      "Street Thai offers authentic flavors at great prices. Quick, friendly service and delicious food.",
    menuPhotos: [
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1562565634-bcf5905a7e4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
  },
];

const mockReviews: Review[] = [
  {
    id: 1,
    author: "Alex Johnson",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
    date: "2 weeks ago",
    text: "Absolutely loved this place! The service was outstanding and the food was impeccable. The chef's table was particularly impressive with all the delicious bites they brought out. Can't wait to come back!",
    helpfulCount: 12,
    likes: 12,
    userLiked: false,
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: 2,
    author: "Sarah Williams",
    avatar:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 4,
    date: "3 weeks ago",
    text: "Great atmosphere and the staff was very friendly. Food was delicious but the wait time for brunch was a bit long on a weekend. Would still recommend!",
    helpfulCount: 8,
    likes: 8,
    userLiked: false,
  },
  {
    id: 3,
    author: "Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
    date: "1 month ago",
    text: "Wow, amazing experience! The sushi was incredibly fresh and the presentation was artistic. Service was top-notch and very knowledgeable about the menu options.",
    helpfulCount: 15,
    likes: 15,
    userLiked: false,
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: 4,
    author: "David Smith",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 3,
    date: "2 months ago",
    text: "Decent food but not spectacular. The ambiance is nice and it's in a great location. Prices are a bit high for what you get but overall it's an okay choice when you want something familiar.",
    helpfulCount: 5,
    likes: 5,
    userLiked: false,
  },
  {
    id: 5,
    author: "Emma Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
    date: "1 month ago",
    text: "Hands down the best Thai food I've had in the city! The flavors are so authentic and the portions are generous. Their vegetarian options are also fantastic. Can't wait to come back and try more dishes!",
    helpfulCount: 20,
    likes: 20,
    userLiked: false,
    images: [
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1562565634-bcf5905a7e4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
  },
];

const allReviews = mockReviews;
const restaurants = mockRestaurants;

// Define props for our components
interface StarRatingProps {
  rating: number;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
  isSelected?: boolean;
}

interface ReviewCardProps {
  review: Review;
  onLike: (id: number) => void;
}

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onBack: () => void;
  reviews: Review[];
  onLike: (id: number) => void;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

interface EmptyStateProps {
  message: string;
}

// Star rating component
const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-gray-300"
          } ${
            rating % 1 >= 0.5 && i === Math.floor(rating) ? "half-fill" : ""
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

// Restaurant card component
const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onClick,
  isSelected = false,
}) => {
  return (
    <div
      className={`rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out ${
        isSelected
          ? "bg-white ring-2 ring-orange-500 shadow-xl scale-105"
          : "bg-white hover:shadow-lg hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-bold flex items-center shadow-md">
          <Award size={14} className="mr-1 text-green-600" />
          {restaurant.rating.toFixed(1)}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-900">{restaurant.name}</h3>
          <StarRating rating={restaurant.rating} />
        </div>
        <div className="mt-1 flex flex-wrap gap-2">
          {restaurant.categories.slice(0, 2).map((category, idx) => (
            <span
              key={idx}
              className="inline-block bg-orange-100 text-orange-800 text-xs px-2.5 py-0.5 rounded-full font-medium"
            >
              {category}
            </span>
          ))}
          {restaurant.categories.length > 2 && (
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
              +{restaurant.categories.length - 2}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center text-sm text-gray-500">
          <div className="flex items-center mr-3">
            <Utensils size={14} className="mr-1" />
            <span>{restaurant.cuisine}</span>
          </div>
          <div className="flex items-center mr-3">
            <span className="mr-1">•</span>
            <span>{restaurant.price}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">•</span>
            <span>{restaurant.distance}</span>
          </div>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {restaurant.reviewCount} reviews
          </span>
          <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
            {restaurant.priceRange}
          </div>
        </div>
      </div>
    </div>
  );
};

// Review card component
const ReviewCard: React.FC<ReviewCardProps> = ({ review, onLike }) => {
  const [isLiked, setIsLiked] = useState(review.userLiked || false);
  const [likeCount, setLikeCount] = useState(review.likes || 0);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
    onLike(review.id);
  };

  return (
    <div className="bg-white rounded-lg p-5 mb-4 border border-gray-100 hover:border-gray-200 transition-all duration-300 ease-in-out hover:shadow-md">
      <div className="flex items-center mb-4">
        <img
          src={review.avatar}
          alt={review.author}
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">{review.author}</h4>
            <StarRating rating={review.rating} />
          </div>
          <div className="text-xs text-gray-500">{review.date}</div>
        </div>
      </div>
      <p className="text-gray-700 mb-4 text-sm line-clamp-3">{review.text}</p>

      {review.images && review.images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {review.images.slice(0, 3).map((image, idx) => (
            <div key={idx} className="aspect-w-1 aspect-h-1">
              <img
                src={image}
                alt={`Review photo ${idx + 1}`}
                className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => {
                  // In a real app, this would open a lightbox
                  window.open(image, "_blank");
                }}
              />
            </div>
          ))}
          {review.images.length > 3 && (
            <div className="relative">
              <img
                src={review.images[3]}
                alt={`Review photo ${review.images.length}`}
                className="w-full h-20 object-cover rounded-lg"
              />
              <div
                className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg cursor-pointer"
                onClick={() => {
                  // In a real app, this would open a lightbox
                  window.alert(`Show all ${review.images?.length || 0} photos`);
                }}
              >
                <span className="text-white text-xs font-bold">
                  +{review.images.length - 3}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
        <div className="flex space-x-3">
          <button
            className={`flex items-center hover:text-orange-500 transition-colors ${
              isLiked ? "text-orange-500" : ""
            }`}
            onClick={handleLike}
          >
            <Heart
              size={14}
              className={`mr-1 ${
                isLiked ? "fill-orange-500 text-orange-500" : ""
              }`}
            />
            <span>Helpful ({likeCount})</span>
          </button>
          <button
            className="flex items-center hover:text-orange-500 transition-colors"
            onClick={() => {
              window.alert("Share functionality would be implemented here");
            }}
          >
            <Share2 size={14} className="mr-1" />
            <span>Share</span>
          </button>
        </div>
        <button
          className="text-orange-500 hover:text-orange-600 transition-colors font-medium"
          onClick={() =>
            window.alert("Report functionality would be implemented here")
          }
        >
          Report
        </button>
      </div>
    </div>
  );
};

// Empty state component
const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="bg-orange-50 p-6 rounded-full mb-6">
        <svg
          className="w-12 h-12 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No Reviews Found</h3>
      <p className="text-gray-600 max-w-md">{message}</p>
    </div>
  );
};

// Restaurant detail component
const RestaurantDetail: React.FC<RestaurantDetailProps> = ({
  restaurant,
  onBack,
  reviews,
  onLike,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderHighlightedFeature = (feature: string) => {
    switch (feature.toLowerCase()) {
      case "breakfast":
        return (
          <div className="flex items-center">
            <Coffee size={14} className="mr-1 text-orange-500" />
            <span>Breakfast</span>
          </div>
        );
      case "lunch":
        return (
          <div className="flex items-center">
            <Utensils size={14} className="mr-1 text-orange-500" />
            <span>Lunch</span>
          </div>
        );
      case "dinner":
        return (
          <div className="flex items-center">
            <Flame size={14} className="mr-1 text-orange-500" />
            <span>Dinner</span>
          </div>
        );
      case "tacos":
        return (
          <div className="flex items-center">
            <span className="text-orange-500 mr-1">🌯</span>
            <span>Tacos</span>
          </div>
        );
      case "burritos":
        return (
          <div className="flex items-center">
            <span className="text-orange-500 mr-1">🌯</span>
            <span>Burritos</span>
          </div>
        );
      case "margartias":
        return (
          <div className="flex items-center">
            <span className="text-orange-500 mr-1">🍹</span>
            <span>Margartias</span>
          </div>
        );
      case "sushi":
        return (
          <div className="flex items-center">
            <span className="text-orange-500 mr-1">🍣</span>
            <span>Sushi</span>
          </div>
        );
      case "omakase":
        return (
          <div className="flex items-center">
            <span className="text-orange-500 mr-1">🍱</span>
            <span>Omakase</span>
          </div>
        );
      case "sake":
        return (
          <div className="flex items-center">
            <span className="text-orange-500 mr-1">🍶</span>
            <span>Sake</span>
          </div>
        );
      case "pad thai":
        return (
          <div className="flex items-center">
            <span className="text-orange-500 mr-1">🍜</span>
            <span>Pad Thai</span>
          </div>
        );
      case "green curry":
        return (
          <div className="flex items-center">
            <span className="text-orange-500 mr-1">🍛</span>
            <span>Green Curry</span>
          </div>
        );
      case "summer rolls":
        return (
          <div className="flex items-center">
            <span className="text-orange-500 mr-1">🥗</span>
            <span>Summer Rolls</span>
          </div>
        );
      default:
        return feature;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft size={20} className="text-gray-700" />
      </button>
      <div className="relative h-72">
        <img
          src={restaurant.menuPhotos[currentImageIndex]}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />

        {restaurant.menuPhotos.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {restaurant.menuPhotos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full ${
                  currentImageIndex === idx ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-gray-900 mr-3">
                {restaurant.name}
              </h2>
              <div className="flex items-center bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-semibold">
                <Award size={12} className="mr-1" />
                {restaurant.rating.toFixed(1)}
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              {restaurant.cuisine} • {restaurant.price}
            </div>
          </div>
          <StarRating rating={restaurant.rating} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <MapPin size={16} className="mr-2 text-orange-500" />
            <div>
              <div className="font-medium text-gray-900">Location</div>
              <div className="text-gray-600">{restaurant.address}</div>
            </div>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-2 text-orange-500" />
            <div>
              <div className="font-medium text-gray-900">Hours</div>
              <div className="text-gray-600">{restaurant.hours}</div>
            </div>
          </div>
          <div className="flex items-center">
            <Utensils size={16} className="mr-2 text-orange-500" />
            <div>
              <div className="font-medium text-gray-900">Cuisine</div>
              <div className="text-gray-600">{restaurant.cuisine}</div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-orange-500">•</span>
            <div>
              <div className="font-medium text-gray-900">Price</div>
              <div className="text-gray-600">{restaurant.priceRange}</div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">About</h3>
          <p className="text-gray-700 text-sm">{restaurant.about}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">
              Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {restaurant.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">
              Highlights
            </h3>
            <div className="flex flex-wrap gap-2">
              {restaurant.highlights.map((highlight, idx) => (
                <span
                  key={idx}
                  className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full"
                >
                  {renderHighlightedFeature(highlight)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Reviews ({reviews.length})
            </h3>
            <button
              className="text-sm text-orange-500 hover:text-orange-600 font-medium"
              onClick={() =>
                window.alert("Filter functionality would be implemented here")
              }
            >
              Filter
            </button>
          </div>
          {reviews.length === 0 ? (
            <EmptyState message="No reviews found for this restaurant. Be the first to write a review!" />
          ) : (
            <div>
              {reviews.slice(0, 3).map((review) => (
                <ReviewCard key={review.id} review={review} onLike={onLike} />
              ))}
              {reviews.length > 3 && (
                <button
                  className="w-full mt-4 py-2 text-center text-orange-500 hover:text-orange-600 font-medium border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
                  onClick={() => window.alert("Show all reviews")}
                >
                  View all {reviews.length} reviews
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Filter sidebar component
const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h3 className="font-semibold text-lg mb-5 text-gray-900">Filters</h3>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Search
        </label>
        <input
          type="text"
          placeholder="Search restaurants..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          value={filters.searchQuery}
          onChange={(e) =>
            onFilterChange({ ...filters, searchQuery: e.target.value })
          }
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Minimum Rating
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          value={filters.minRating}
          onChange={(e) =>
            onFilterChange({ ...filters, minRating: parseInt(e.target.value) })
          }
        >
          <option value="0">Any Rating</option>
          <option value="3">3 Stars & Up</option>
          <option value="4">4 Stars & Up</option>
          <option value="4.5">4.5 Stars & Up</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Cuisine
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          value={filters.selectedCuisine}
          onChange={(e) =>
            onFilterChange({ ...filters, selectedCuisine: e.target.value })
          }
        >
          <option value="">All Cuisines</option>
          <option value="American">American</option>
          <option value="Mexican">Mexican</option>
          <option value="Japanese">Japanese</option>
          <option value="Thai">Thai</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Sort By
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          value={filters.sortBy}
          onChange={(e) =>
            onFilterChange({ ...filters, sortBy: e.target.value })
          }
        >
          <option value="recommended">Recommended</option>
          <option value="rating">Highest Rated</option>
          <option value="distance">Distance</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <button
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        onClick={() =>
          onFilterChange({
            searchQuery: "",
            minRating: 0,
            selectedCuisine: "",
            sortBy: "recommended",
            priceRange: "",
          })
        }
      >
        Reset Filters
      </button>
    </div>
  );
};

// Helper function to get filtered and sorted restaurants
const getFilteredRestaurants = (
  restaurants: Restaurant[],
  filters: FilterState
) => {
  let filtered = [...restaurants];

  // Apply search filter
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisine.toLowerCase().includes(query) ||
        restaurant.categories.some((category) =>
          category.toLowerCase().includes(query)
        )
    );
  }

  // Apply min rating filter
  if (filters.minRating > 0) {
    filtered = filtered.filter(
      (restaurant) => restaurant.rating >= filters.minRating
    );
  }

  // Apply cuisine filter
  if (filters.selectedCuisine) {
    filtered = filtered.filter(
      (restaurant) => restaurant.cuisine === filters.selectedCuisine
    );
  }

  // Apply price filter
  if (filters.priceRange) {
    filtered = filtered.filter(
      (restaurant) => restaurant.priceRange === filters.priceRange
    );
  }

  // Sort the filtered list
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "distance":
        filtered.sort(
          (a, b) =>
            parseFloat(a.distance.replace(" miles", "")) -
            parseFloat(b.distance.replace(" miles", ""))
        );
        break;
      case "price-low":
        filtered.sort((a, b) => a.priceRange.localeCompare(b.priceRange));
        break;
      case "price-high":
        filtered.sort((a, b) => b.priceRange.localeCompare(a.priceRange));
        break;
      default:
        // For 'recommended' or any other option, just return the filtered list without additional sorting
        break;
    }
  }

  return filtered;
};

export default function RestaurantReviewPage() {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    minRating: 0,
    selectedCuisine: "",
    sortBy: "recommended",
    priceRange: "",
  });

  // Apply filters when they change
  useEffect(() => {
    // This effect runs when filters change, but we don't need to do anything here
    // because we're using the getFilteredRestaurants function to get filtered data on each render
  }, [filters]);

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleBack = () => {
    setSelectedRestaurant(null);
  };

  const handleLike = (reviewId: number) => {
    // In a real app, this would update the review in the backend
    console.log(`Review ${reviewId} liked/unliked`);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const filteredRestaurants = getFilteredRestaurants(restaurants, filters);
  const restaurantReviews = selectedRestaurant
    ? allReviews.filter((review) => review.id === selectedRestaurant.id)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {selectedRestaurant ? (
          <RestaurantDetail
            restaurant={selectedRestaurant}
            onBack={handleBack}
            reviews={restaurantReviews}
            onLike={handleLike}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main content /}
{/ Search and filter header */}
            <div className="lg:col-span-9">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Top Restaurants
                </h1>
                <div className="text-sm text-gray-600">
                  Showing {filteredRestaurants.length} of {restaurants.length}{" "}
                  restaurants
                </div>
              </div>
              {/* Restaurant grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRestaurants.length > 0 ? (
                  filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      onClick={() => handleRestaurantSelect(restaurant)}
                    />
                  ))
                ) : (
                  <div className="col-span-2 bg-white rounded-lg p-8 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Restaurants Found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your filters or search query.
                    </p>
                    <button
                      className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
                      onClick={() =>
                        setFilters({
                          searchQuery: "",
                          minRating: 0,
                          selectedCuisine: "",
                          sortBy: "recommended",
                          priceRange: "",
                        })
                      }
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-3">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
