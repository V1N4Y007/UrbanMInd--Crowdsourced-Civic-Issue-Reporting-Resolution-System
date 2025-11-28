import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, MapPin, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import { issueService } from '../../api/services/issueService';

const ReportIssue = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "pothole",
        lat: "",
        lng: "",
        address: "",
    });

    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);

    const categories = [
        { value: "pothole", label: "Pothole" },
        { value: "garbage", label: "Garbage Dump" },
        { value: "streetlight", label: "Broken Streetlight" },
        { value: "water", label: "Water Leakage" },
        { value: "other", label: "Other" },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // ⭐ Fetch Address Using OpenStreetMap Reverse Geocoding
    const fetchAddressFromCoordinates = async (lat, lng) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await res.json();

            const address =
                data?.display_name ||
                data?.address?.city ||
                data?.address?.town ||
                data?.address?.village ||
                "Unknown Location";

            setFormData((prev) => ({
                ...prev,
                address: address,
            }));
        } catch (err) {
            console.log("Error fetching address:", err);
        }
    };

    // ⭐ Fetch GPS + Address
    const getLocation = () => {
        setLocationLoading(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setFormData((prev) => ({
                    ...prev,
                    lat,
                    lng,
                }));

                await fetchAddressFromCoordinates(lat, lng);

                toast.success("Location fetched");
                setLocationLoading(false);
            },
            () => {
                toast.error("Unable to fetch location");
                setLocationLoading(false);
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("category", formData.category);
            data.append("lat", formData.lat);
            data.append("lng", formData.lng);
            data.append("address", formData.address);

            if (image) data.append("image", image);

            await issueService.create(data);

            toast.success("Issue Reported Successfully!");
            navigate("/citizen/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Failed to report issue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Report an Issue</h1>
                <p className="text-gray-400">Help improve the city by reporting issues.</p>
            </div>

            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <Input
                        label="Title"
                        name="title"
                        placeholder="e.g., Deep Pothole on 5th Avenue"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    {/* Category */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border-gray-700 rounded-xl text-white"
                        >
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            placeholder="Describe the issue…"
                            className="w-full px-4 py-2 bg-gray-800 border-gray-700 rounded-xl text-white"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Location</label>

                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <Input
                                label="Latitude"
                                value={formData.lat}
                                readOnly
                                className="bg-gray-900"
                            />
                            <Input
                                label="Longitude"
                                value={formData.lng}
                                readOnly
                                className="bg-gray-900"
                            />
                        </div>

                        <Input
                            label="Address"
                            value={formData.address}
                            readOnly
                            className="bg-gray-900"
                        />

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={getLocation}
                            className="mt-2"
                            isLoading={locationLoading}
                            icon={MapPin}
                        >
                            Fetch GPS
                        </Button>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Upload Image</label>

                        <div
                            className={`border-2 border-dashed rounded-xl p-6 text-center ${
                                previewUrl ? "border-blue-500 bg-blue-500/5" : "border-gray-700"
                            }`}
                        >
                            {previewUrl ? (
                                <div className="relative inline-block">
                                    <img
                                        src={previewUrl}
                                        className="max-h-64 rounded-lg"
                                        alt="Preview"
                                    />
                                    <button
                                        type="button"
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                        onClick={removeImage}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div
                                    className="cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Camera className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <p className="text-gray-300">Click to upload image</p>
                                </div>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            size="lg"
                            icon={Upload}
                            isLoading={loading}
                        >
                            Submit Report
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ReportIssue;
