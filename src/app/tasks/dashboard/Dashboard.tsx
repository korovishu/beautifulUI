"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Bell,
  Home,
  Moon,
  Sun,
  Thermometer,
  Zap,
  Plus,
  X,
  Shield,
  Camera,
  Lock,
  Eye,
  Clock,
  Wifi,
  Activity,
  Droplets,
  Wind,
  Cloud,
  Settings,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Lightbulb,
  MapPin,
  Calendar,
} from "lucide-react";

const ThemeContext = createContext({
  isDarkMode: true,
  toggleDarkMode: () => {},
});

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
`;

const smartHomeDevices = [
  {
    id: 1,
    name: "Living Room Thermostat",
    type: "Thermostat",
    icon: <Thermometer className="h-5 w-5" />,
    room: "Living Room",
    status: "active",
  },
  {
    id: 2,
    name: "Kitchen Light",
    type: "Light",
    icon: <Zap className="h-5 w-5" />,
    room: "Kitchen",
    status: "active",
  },
  {
    id: 3,
    name: "Bedroom AC",
    type: "AC",
    icon: <Zap className="h-5 w-5" />,
    room: "Bedroom",
    status: "inactive",
  },
  {
    id: 4,
    name: "Bathroom Humidity Sensor",
    type: "Sensor",
    icon: <Droplets className="h-5 w-5" />,
    room: "Bathroom",
    status: "active",
  },
  {
    id: 5,
    name: "Front Door Lock",
    type: "Lock",
    icon: <Lock className="h-5 w-5" />,
    room: "Entrance",
    status: "locked",
  },
  {
    id: 6,
    name: "Security Camera",
    type: "Camera",
    icon: <Camera className="h-5 w-5" />,
    room: "Living Room",
    status: "recording",
  },
];

const securityEvents = [
  {
    time: "2:30 PM",
    event: "Front door unlocked",
    type: "access",
    severity: "normal",
  },
  {
    time: "1:45 PM",
    event: "Motion detected in living room",
    type: "motion",
    severity: "normal",
  },
  {
    time: "12:15 PM",
    event: "All doors locked",
    type: "security",
    severity: "normal",
  },
  {
    time: "11:30 AM",
    event: "Window sensor triggered",
    type: "sensor",
    severity: "warning",
  },
];

const automationRules = [
  {
    id: 1,
    name: "Good Morning",
    active: true,
    description: "Turn on lights and adjust temperature at 7:00 AM",
  },
  {
    id: 2,
    name: "Away Mode",
    active: false,
    description: "Lock doors and set energy saving mode when away",
  },
  {
    id: 3,
    name: "Night Mode",
    active: true,
    description: "Dim lights and lower temperature at 10:00 PM",
  },
  {
    id: 4,
    name: "Security Alert",
    active: true,
    description: "Send notification when motion detected after midnight",
  },
];

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    // Remove localStorage dependency - just use dark mode as default
    const isDarkOS =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    // Always start with dark mode unless user specifically prefers light
    setIsDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

const Card = React.memo(
  ({ className = "", children, ...props }: React.ComponentProps<"div">) => {
    const { isDarkMode } = useTheme();
    return (
      <div
        className={`${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } rounded-lg shadow-md overflow-hidden transition-colors ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.memo(
  ({ className = "", children, ...props }: React.ComponentProps<"div">) => {
    const { isDarkMode } = useTheme();
    return (
      <div
        className={`p-4 border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardHeader.displayName = "CardHeader";

const CardContent = React.memo(
  ({ className = "", children, ...props }: React.ComponentProps<"div">) => (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

const CardTitle = React.memo(
  ({ className = "", children, ...props }: React.ComponentProps<"h3">) => {
    const { isDarkMode } = useTheme();
    return (
      <h3
        className={`text-lg font-semibold ${
          isDarkMode ? "text-gray-100" : "text-gray-800"
        } ${className}`}
        style={{ fontFamily: "Outfit, sans-serif" }}
        {...props}
      >
        {children}
      </h3>
    );
  }
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.memo(
  ({ className = "", children, ...props }: React.ComponentProps<"p">) => {
    const { isDarkMode } = useTheme();
    return (
      <p
        className={`text-sm ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        } ${className}`}
        {...props}
      >
        {children}
      </p>
    );
  }
);
CardDescription.displayName = "CardDescription";

const Button = React.memo(
  ({
    variant = "default",
    size = "default",
    className = "",
    children,
    ...props
  }: React.ComponentProps<"button"> & {
    variant?: "default" | "ghost" | "outline" | "danger";
    size?: "default" | "sm" | "lg" | "icon";
  }) => {
    const { isDarkMode } = useTheme();

    const variantClasses = {
      default: isDarkMode
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-blue-500 text-white hover:bg-blue-600",
      ghost: isDarkMode
        ? "bg-transparent hover:bg-gray-800 text-gray-200"
        : "bg-transparent hover:bg-gray-100 text-gray-700",
      outline: isDarkMode
        ? "border border-gray-600 bg-transparent hover:bg-gray-800 text-gray-200"
        : "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700",
      danger: isDarkMode
        ? "bg-red-600 text-white hover:bg-red-700"
        : "bg-red-500 text-white hover:bg-red-600",
    };

    const sizeClasses = {
      default: "px-4 py-2 text-sm",
      sm: "px-2 py-1 text-xs",
      lg: "px-6 py-3 text-base",
      icon: "p-2",
    };

    return (
      <button
        className={`${sizeClasses[size]} ${
          variantClasses[variant]
        } rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isDarkMode ? "focus:ring-offset-gray-900" : ""
        } ${className}`}
        style={{ fontFamily: "Outfit, sans-serif" }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

const Input = React.memo(
  ({ className = "", ...props }: React.ComponentProps<"input">) => {
    const { isDarkMode } = useTheme();
    return (
      <input
        className={`w-full px-3 py-2 text-sm ${
          isDarkMode
            ? "text-gray-200 bg-gray-800 border-gray-600"
            : "text-gray-700 bg-white border-gray-300"
        } border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isDarkMode ? "focus:ring-blue-600" : ""
        } ${className}`}
        style={{ fontFamily: "Outfit, sans-serif" }}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const Badge = React.memo(
  ({
    className = "",
    children,
    variant = "default",
    ...props
  }: React.ComponentProps<"span"> & {
    variant?: "default" | "warning" | "danger" | "success";
  }) => {
    const { isDarkMode } = useTheme();

    const variantClasses = {
      default: isDarkMode
        ? "bg-blue-900 text-blue-200"
        : "bg-blue-100 text-blue-800",
      warning: isDarkMode
        ? "bg-yellow-900 text-yellow-200"
        : "bg-yellow-100 text-yellow-800",
      danger: isDarkMode
        ? "bg-red-900 text-red-200"
        : "bg-red-100 text-red-800",
      success: isDarkMode
        ? "bg-green-900 text-green-200"
        : "bg-green-100 text-green-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
        style={{ fontFamily: "Outfit, sans-serif" }}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

const Switch = React.memo(
  ({
    className = "",
    checked,
    onChange,
    ...props
  }: React.ComponentProps<"button"> & {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
  }) => {
    const { isDarkMode } = useTheme();
    return (
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange?.(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center justify-center rounded-full cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isDarkMode ? "focus:ring-offset-gray-900" : ""
        } ${
          checked
            ? isDarkMode
              ? "bg-blue-600"
              : "bg-blue-500"
            : isDarkMode
            ? "bg-gray-700"
            : "bg-gray-200"
        } ${className}`}
        {...props}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
          style={{
            marginRight: "20px",
          }}
        />
      </button>
    );
  }
);
Switch.displayName = "Switch";

const Slider = React.memo(
  ({
    className = "",
    value,
    min = 60,
    max = 85,
    onChange,
    ...props
  }: React.ComponentProps<"input"> & {
    value: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
  }) => {
    const { isDarkMode } = useTheme();
    return (
      <div className={`relative w-full ${className}`}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number.parseInt(e.target.value))}
          className={`w-full h-2 ${
            isDarkMode ? "bg-gray-700" : "bg-gray-200"
          } rounded-lg appearance-none cursor-pointer accent-blue-500`}
          {...props}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

const ScrollArea = React.memo(
  ({ className = "", children, ...props }: React.ComponentProps<"div">) => (
    <div className={`overflow-auto ${className}`} {...props}>
      {children}
    </div>
  )
);
ScrollArea.displayName = "ScrollArea";

const HomeAssistant = () => {
  const [livingRoomTemp, setLivingRoomTemp] = useState(72);
  const [bedroomTemp, setBedroomTemp] = useState(68);
  const [kitchenLightOn, setKitchenLightOn] = useState(true);
  const [bedroomACOn, setBedroomACOn] = useState(false);
  const [devices, setDevices] = useState(smartHomeDevices);
  const [energyUsage, setEnergyUsage] = useState([
    { name: "Mon", value: 12 },
    { name: "Tue", value: 15 },
    { name: "Wed", value: 18 },
    { name: "Thu", value: 13 },
    { name: "Fri", value: 16 },
    { name: "Sat", value: 20 },
    { name: "Sun", value: 14 },
  ]);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDeviceType, setNewDeviceType] = useState("Light");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showAllDevices, setShowAllDevices] = useState(false);
  const [securityArmed, setSecurityArmed] = useState(true);
  const [currentWeather, setCurrentWeather] = useState({
    temp: 72,
    condition: "Partly Cloudy",
    humidity: 65,
    wind: 8,
  });
  const [homeStatus, setHomeStatus] = useState({
    temperature: 72,
    humidity: 45,
    airQuality: "Good",
    energyUsage: 2.4,
  });
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(65);
  const [currentSong, setCurrentSong] = useState("Relaxing Jazz Playlist");
  const [automations, setAutomations] = useState(automationRules);
  const [selectedRoom, setSelectedRoom] = useState("All Rooms");

  const rooms = [
    "All Rooms",
    "Living Room",
    "Kitchen",
    "Bedroom",
    "Bathroom",
    "Entrance",
  ];

  const energyBreakdown = [
    { name: "HVAC", value: 40, color: "#3b82f6" },
    { name: "Lighting", value: 25, color: "#10b981" },
    { name: "Appliances", value: 20, color: "#f59e0b" },
    { name: "Electronics", value: 15, color: "#ef4444" },
  ];

  const activityData = [
    { time: "00:00", activity: 2 },
    { time: "04:00", activity: 1 },
    { time: "08:00", activity: 8 },
    { time: "12:00", activity: 12 },
    { time: "16:00", activity: 15 },
    { time: "20:00", activity: 18 },
  ];

  const toggleKitchenLight = () => {
    setKitchenLightOn(!kitchenLightOn);
    showToast(
      kitchenLightOn ? "Kitchen light turned off" : "Kitchen light turned on"
    );
  };

  const toggleBedroomAC = () => {
    setBedroomACOn(!bedroomACOn);
    showToast(bedroomACOn ? "Bedroom AC turned off" : "Bedroom AC turned on");
  };

  const handleAddDevice = () => {
    if (newDeviceName.trim() !== "") {
      const newDevice = {
        id: devices.length + 1,
        name: newDeviceName,
        type: newDeviceType,
        icon: getDeviceIcon(newDeviceType),
        room: "Living Room",
        status: "active",
      };
      setDevices([...devices, newDevice]);
      setNewDeviceName("");
      setNewDeviceType("Light");
      setShowDeviceModal(false);
      showToast(`Added new device: ${newDeviceName}`);
    }
  };

  const handleCancelAddDevice = () => {
    setNewDeviceName("");
    setNewDeviceType("Light");
    setShowDeviceModal(false);
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "Thermostat":
        return <Thermometer className="h-5 w-5" />;
      case "AC":
        return <Wind className="h-5 w-5" />;
      case "Sensor":
        return <Activity className="h-5 w-5" />;
      case "Door":
        return <Home className="h-5 w-5" />;
      case "Lock":
        return <Lock className="h-5 w-5" />;
      case "Camera":
        return <Camera className="h-5 w-5" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = device.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRoom =
      selectedRoom === "All Rooms" || device.room === selectedRoom;
    return matchesSearch && matchesRoom;
  });

  const displayedDevices = showAllDevices
    ? filteredDevices
    : filteredDevices.slice(0, 3);

  const showToast = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const toggleSecurity = () => {
    setSecurityArmed(!securityArmed);
    showToast(
      securityArmed ? "Security system disarmed" : "Security system armed"
    );
  };

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
    showToast(musicPlaying ? "Music paused" : "Music playing");
  };

  const toggleAutomation = (id: number) => {
    setAutomations(
      automations.map((auto) =>
        auto.id === id ? { ...auto, active: !auto.active } : auto
      )
    );
    const automation = automations.find((auto) => auto.id === id);
    showToast(
      `${automation?.name} ${automation?.active ? "disabled" : "enabled"}`
    );
  };

  return (
    <ThemeProvider>
      <SmartHomeUI
        livingRoomTemp={livingRoomTemp}
        setLivingRoomTemp={setLivingRoomTemp}
        bedroomTemp={bedroomTemp}
        setBedroomTemp={setBedroomTemp}
        kitchenLightOn={kitchenLightOn}
        toggleKitchenLight={toggleKitchenLight}
        bedroomACOn={bedroomACOn}
        toggleBedroomAC={toggleBedroomAC}
        devices={devices}
        energyUsage={energyUsage}
        energyBreakdown={energyBreakdown}
        activityData={activityData}
        showDeviceModal={showDeviceModal}
        setShowDeviceModal={setShowDeviceModal}
        newDeviceName={newDeviceName}
        setNewDeviceName={setNewDeviceName}
        newDeviceType={newDeviceType}
        setNewDeviceType={setNewDeviceType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showNotification={showNotification}
        notificationMessage={notificationMessage}
        showAllDevices={showAllDevices}
        setShowAllDevices={setShowAllDevices}
        handleAddDevice={handleAddDevice}
        handleCancelAddDevice={handleCancelAddDevice}
        displayedDevices={displayedDevices}
        showToast={showToast}
        securityArmed={securityArmed}
        toggleSecurity={toggleSecurity}
        securityEvents={securityEvents}
        currentWeather={currentWeather}
        homeStatus={homeStatus}
        musicPlaying={musicPlaying}
        toggleMusic={toggleMusic}
        musicVolume={musicVolume}
        setMusicVolume={setMusicVolume}
        currentSong={currentSong}
        automations={automations}
        toggleAutomation={toggleAutomation}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        rooms={rooms}
      />
    </ThemeProvider>
  );
};

const SmartHomeUI = ({
  livingRoomTemp,
  setLivingRoomTemp,
  bedroomTemp,
  setBedroomTemp,
  kitchenLightOn,
  toggleKitchenLight,
  bedroomACOn,
  toggleBedroomAC,
  devices,
  energyUsage,
  energyBreakdown,
  activityData,
  showDeviceModal,
  setShowDeviceModal,
  newDeviceName,
  setNewDeviceName,
  newDeviceType,
  setNewDeviceType,
  searchQuery,
  setSearchQuery,
  showNotification,
  notificationMessage,
  showAllDevices,
  setShowAllDevices,
  handleAddDevice,
  handleCancelAddDevice,
  displayedDevices,
  showToast,
  securityArmed,
  toggleSecurity,
  securityEvents,
  currentWeather,
  homeStatus,
  musicPlaying,
  toggleMusic,
  musicVolume,
  setMusicVolume,
  currentSong,
  automations,
  toggleAutomation,
  selectedRoom,
  setSelectedRoom,
  rooms,
}: any) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 antialiased`}
      style={{
        fontFamily: "Outfit, sans-serif",
        backgroundColor: isDarkMode ? "#111827" : "#f9fafb",
        color: isDarkMode ? "#f9fafb" : "#111827",
      }}
    >
      <style jsx global>
        {fontStyles}
      </style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <header
          className="flex justify-between items-center mb-8 py-4"
          style={{
            borderBottom: isDarkMode
              ? "1px solid #1f2937"
              : "1px solid #f3f4f6",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          <div>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{
                color: isDarkMode ? "#f9fafb" : "#111827",
                fontFamily: "Outfit, sans-serif",
                letterSpacing: "-0.025em",
              }}
            >
              Smart Home Command Center
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
            >
              Welcome back! Your home is secure and running efficiently.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                showToast("Notifications will be implemented soon!")
              }
              className="rounded-full"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </header>

        {showNotification && (
          <div
            className="fixed bottom-4 right-4 px-4 py-3 rounded-md shadow-lg transition-all transform translate-y-0 opacity-100 z-50"
            style={{
              backgroundColor: isDarkMode ? "#374151" : "#1f2937",
              color: "#ffffff",
            }}
          >
            <p className="text-sm font-medium">{notificationMessage}</p>
          </div>
        )}

        {/* Quick Status Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Home Temp</p>
                <p className="text-2xl font-bold text-blue-500">
                  {homeStatus.temperature}°F
                </p>
              </div>
              <Thermometer className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Security</p>
                <p
                  className={`text-2xl font-bold ${
                    securityArmed ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {securityArmed ? "Armed" : "Disarmed"}
                </p>
              </div>
              <Shield
                className={`h-8 w-8 ${
                  securityArmed ? "text-green-500" : "text-red-500"
                }`}
              />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Energy</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {homeStatus.energyUsage} kW
                </p>
              </div>
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Devices</p>
                <p className="text-2xl font-bold text-purple-500">
                  {devices.length}
                </p>
              </div>
              <Home className="h-8 w-8 text-purple-500" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weather Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                Current Weather
              </CardTitle>
              <CardDescription>Local conditions and forecast</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-500">
                    {currentWeather.temp}°F
                  </div>
                  <div className="text-lg text-gray-500">
                    {currentWeather.condition}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-400" />
                    <span>Humidity: {currentWeather.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-green-400" />
                    <span>Wind: {currentWeather.wind} mph</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Center
              </CardTitle>
              <CardDescription>
                Monitor and control home security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Security System</span>
                  <Button
                    onClick={toggleSecurity}
                    variant={securityArmed ? "danger" : "default"}
                    size="sm"
                  >
                    {securityArmed ? "Disarm" : "Arm"}
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Recent Events</h4>
                  <ScrollArea className="h-32">
                    {securityEvents.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm py-1"
                      >
                        <span className="text-gray-500">{event.time}</span>
                        <span
                          className={
                            event.severity === "warning"
                              ? "text-yellow-500"
                              : "text-green-500"
                          }
                        >
                          {event.event}
                        </span>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Music Control */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                Music Control
              </CardTitle>
              <CardDescription>Control home audio system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="font-medium">{currentSong}</p>
                  <p className="text-sm text-gray-500">Spotify • Living Room</p>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Button variant="outline" size="icon" onClick={toggleMusic}>
                    {musicPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setMusicVolume(musicVolume === 0 ? 65 : 0)}
                  >
                    {musicVolume === 0 ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Volume</span>
                    <span>{musicVolume}%</span>
                  </div>
                  <Slider
                    value={musicVolume}
                    min={0}
                    max={100}
                    onChange={setMusicVolume}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Climate Control</CardTitle>
              <CardDescription>Manage your home temperature</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3
                      className="text-sm font-medium"
                      style={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                    >
                      Living Room
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="text-2xl font-bold min-w-[60px]"
                      style={{ color: isDarkMode ? "#60a5fa" : "#3b82f6" }}
                    >
                      {livingRoomTemp}°F
                    </div>
                    <Slider
                      value={livingRoomTemp}
                      onChange={(value) => setLivingRoomTemp(Number(value))}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3
                      className="text-sm font-medium"
                      style={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                    >
                      Bedroom
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="text-2xl font-bold min-w-[60px]"
                      style={{ color: isDarkMode ? "#60a5fa" : "#3b82f6" }}
                    >
                      {bedroomTemp}°F
                    </div>
                    <Slider
                      value={bedroomTemp}
                      onChange={(value) => setBedroomTemp(Number(value))}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="p-2 rounded-full"
                        style={{
                          backgroundColor: isDarkMode ? "#713f12" : "#fef3c7",
                          color: isDarkMode ? "#fbbf24" : "#d97706",
                        }}
                      >
                        <Lightbulb className="h-4 w-4" />
                      </div>
                      <span
                        className="text-sm"
                        style={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                      >
                        Kitchen Light
                      </span>
                    </div>
                    <Switch
                      checked={kitchenLightOn}
                      onChange={toggleKitchenLight}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="p-2 rounded-full"
                        style={{
                          backgroundColor: isDarkMode ? "#312e81" : "#e0e7ff",
                          color: isDarkMode ? "#818cf8" : "#4f46e5",
                        }}
                      >
                        <Wind className="h-4 w-4" />
                      </div>
                      <span
                        className="text-sm"
                        style={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                      >
                        Bedroom AC
                      </span>
                    </div>
                    <Switch checked={bedroomACOn} onChange={toggleBedroomAC} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Energy Usage
              </CardTitle>
              <Zap
                className="h-4 w-4"
                style={{ color: isDarkMode ? "#60a5fa" : "#3b82f6" }}
              />
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={energyUsage}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDarkMode ? "#374151" : "#e5e7eb"}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}kW`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                        border: "none",
                        borderRadius: "0.5rem",
                        color: isDarkMode ? "#f9fafb" : "#111827",
                      }}
                      itemStyle={{ color: isDarkMode ? "#f9fafb" : "#111827" }}
                      labelStyle={{ color: isDarkMode ? "#d1d5db" : "#6b7280" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{
                        r: 4,
                        strokeWidth: 0,
                        fill: "#3b82f6",
                      }}
                      activeDot={{
                        r: 6,
                        strokeWidth: 0,
                        fill: "#3b82f6",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-10"
              style={{ backgroundColor: isDarkMode ? "#2563eb" : "#3b82f6" }}
            ></div>
            <div
              className="absolute bottom-0 left-0 w-40 h-40 rounded-full -ml-20 -mb-20 opacity-10"
              style={{ backgroundColor: isDarkMode ? "#4f46e5" : "#6366f1" }}
            ></div>

            <CardHeader className="relative z-10">
              <CardTitle>Device Management</CardTitle>
              <CardDescription>Add or modify your devices</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="mb-4 space-y-2">
                <Input
                  type="text"
                  placeholder="Search devices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                    color: isDarkMode ? "#e5e7eb" : "#374151",
                    borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                >
                  {rooms.map((room) => (
                    <option key={room} value={room}>
                      {room}
                    </option>
                  ))}
                </select>
              </div>

              <ScrollArea className="h-[200px]">
                <div className="space-y-3 pr-4">
                  {displayedDevices.length > 0 ? (
                    displayedDevices.map((device) => (
                      <div
                        key={device.id}
                        className="flex items-center justify-between p-2 rounded-md transition-colors"
                        style={{
                          backgroundColor: isDarkMode ? "#1f2937" : "#f9fafb",
                          color: isDarkMode ? "#f9fafb" : "#111827",
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="p-1.5 rounded-full"
                            style={{
                              backgroundColor: isDarkMode
                                ? "#1e3a8a"
                                : "#dbeafe",
                              color: isDarkMode ? "#60a5fa" : "#3b82f6",
                            }}
                          >
                            {device.icon}
                          </div>
                          <div>
                            <p
                              className="text-sm font-medium"
                              style={{
                                color: isDarkMode ? "#f9fafb" : "#111827",
                              }}
                            >
                              {device.name}
                            </p>
                            <p
                              className="text-xs"
                              style={{
                                color: isDarkMode ? "#9ca3af" : "#6b7280",
                              }}
                            >
                              {device.room} • {device.type}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            device.status === "active"
                              ? "success"
                              : device.status === "warning"
                              ? "warning"
                              : "default"
                          }
                        >
                          {device.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                      <div
                        className="p-3 rounded-full mb-2"
                        style={{
                          backgroundColor: isDarkMode ? "#1f2937" : "#f3f4f6",
                        }}
                      >
                        <X
                          className="h-6 w-6"
                          style={{ color: isDarkMode ? "#6b7280" : "#9ca3af" }}
                        />
                      </div>
                      <p
                        className="text-sm"
                        style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
                      >
                        No devices found
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="mt-4 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowAllDevices(!showAllDevices)}
                >
                  {showAllDevices ? "Show Less" : "Show All"}
                </Button>
                <Button onClick={() => setShowDeviceModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Device
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom row with energy breakdown and automation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Energy Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Energy Breakdown</CardTitle>
              <CardDescription>Power consumption by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={energyBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {energyBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                        border: "none",
                        borderRadius: "0.5rem",
                        color: isDarkMode ? "#f9fafb" : "#111827",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {energyBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Home Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Home Activity</CardTitle>
              <CardDescription>Daily activity patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={activityData}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDarkMode ? "#374151" : "#e5e7eb"}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="time"
                      stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                        border: "none",
                        borderRadius: "0.5rem",
                        color: isDarkMode ? "#f9fafb" : "#111827",
                      }}
                    />
                    <Bar
                      dataKey="activity"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Automation Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Automation
              </CardTitle>
              <CardDescription>Smart home automation rules</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-3">
                  {automations.map((automation) => (
                    <div
                      key={automation.id}
                      className="flex items-start justify-between p-3 rounded-md"
                      style={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#f9fafb",
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium">
                            {automation.name}
                          </h4>
                          <Badge
                            variant={automation.active ? "success" : "default"}
                          >
                            {automation.active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {automation.description}
                        </p>
                      </div>
                      <Switch
                        checked={automation.active}
                        onChange={() => toggleAutomation(automation.id)}
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Button className="w-full mt-4" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Manage Rules
              </Button>
            </CardContent>
          </Card>
        </div>

        {showDeviceModal && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div
              className="w-full max-w-md p-6 rounded-lg shadow-xl"
              style={{
                backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                color: isDarkMode ? "#f9fafb" : "#111827",
              }}
            >
              <h2
                className="text-xl font-bold mb-4"
                style={{
                  color: isDarkMode ? "#f9fafb" : "#111827",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                Add New Device
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="device-name"
                    className="block text-sm font-medium mb-1"
                    style={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                  >
                    Device Name
                  </label>
                  <Input
                    id="device-name"
                    type="text"
                    placeholder="e.g., Backyard Camera"
                    value={newDeviceName}
                    onChange={(e) => setNewDeviceName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="device-type"
                    className="block text-sm font-medium mb-1"
                    style={{ color: isDarkMode ? "#e5e7eb" : "#374151" }}
                  >
                    Device Type
                  </label>
                  <select
                    id="device-type"
                    value={newDeviceType}
                    onChange={(e) => setNewDeviceType(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    style={{
                      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                      color: isDarkMode ? "#e5e7eb" : "#374151",
                      borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    <option>Light</option>
                    <option>Thermostat</option>
                    <option>AC</option>
                    <option>Sensor</option>
                    <option>Door</option>
                    <option>Lock</option>
                    <option>Camera</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={handleCancelAddDevice}>
                  Cancel
                </Button>
                <Button onClick={handleAddDevice}>Add Device</Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Footer */}
      <footer
        className="mt-12 py-8"
        style={{
          borderTop: isDarkMode ? "1px solid #1f2937" : "1px solid #f3f4f6",
          fontFamily: "Outfit, sans-serif",
          background: isDarkMode
            ? "linear-gradient(135deg, #1f2937 0%, #111827 100%)"
            : "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2
                className="text-xl font-bold tracking-tight mb-2"
                style={{ color: isDarkMode ? "#f9fafb" : "#111827" }}
              >
                Smart Home Command Center
              </h2>
              <p
                className="text-sm"
                style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
              >
                The future of home automation is here. Control everything from
                anywhere with intelligence and style.
              </p>
            </div>

            <div>
              <h3
                className="font-semibold mb-3"
                style={{ color: isDarkMode ? "#f9fafb" : "#111827" }}
              >
                Quick Stats
              </h3>
              <div
                className="space-y-2 text-sm"
                style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
              >
                <div className="flex justify-between">
                  <span>Connected Devices:</span>
                  <span className="font-medium">{devices.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Energy Saved Today:</span>
                  <span className="font-medium text-green-500">12.3 kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>System Uptime:</span>
                  <span className="font-medium">99.8%</span>
                </div>
              </div>
            </div>

            <div>
              <h3
                className="font-semibold mb-3"
                style={{ color: isDarkMode ? "#f9fafb" : "#111827" }}
              >
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="transition-colors"
                  style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
                >
                  <span className="sr-only">Support</span>
                  <div
                    className="p-2 rounded-full"
                    style={{
                      backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
                    }}
                  >
                    <MapPin className="h-4 w-4" />
                  </div>
                </a>
                <a
                  href="#"
                  className="transition-colors"
                  style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
                >
                  <span className="sr-only">Calendar</span>
                  <div
                    className="p-2 rounded-full"
                    style={{
                      backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
                    }}
                  >
                    <Calendar className="h-4 w-4" />
                  </div>
                </a>
                <a
                  href="#"
                  className="transition-colors"
                  style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
                >
                  <span className="sr-only">Settings</span>
                  <div
                    className="p-2 rounded-full"
                    style={{
                      backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
                    }}
                  >
                    <Settings className="h-4 w-4" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div
            className="mt-8 pt-6"
            style={{
              borderTop: isDarkMode ? "1px solid #374151" : "1px solid #e5e7eb",
            }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div
                className="text-sm"
                style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
              >
                © {new Date().getFullYear()} Smart Home Command Center. Powered
                by advanced AI and IoT technology.
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <Badge variant="success">Online</Badge>
                <span
                  className="text-xs"
                  style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
                >
                  Last updated: {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeAssistant;
