import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, MapPin, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import { issueService } from '../../api/services';

const ReportIssue = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'pothole',
        latitude: '',
        longitude: '',
    });
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);

    const categories = [
        { value: 'pothole', label: 'Pothole' },
        { value: 'garbage', label: 'Garbage Dump' },
        { value: 'streetlight', label: 'Broken Streetlight' },
        { value: 'water', label: 'Water Leakage' },
        { value: 'other', label: 'Other' },
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
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const getLocation = () => {
        setLocationLoading(true);
        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser');
            setLocationLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setFormData({
                    ...formData,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                toast.success('Location fetched successfully');
                setLocationLoading(false);
            },
            (error) => {
                console.error(error);
                toast.error('Unable to retrieve your location');
                setLocationLoading(false);
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('category', formData.category);
            data.append('latitude', formData.latitude);
            data.append('longitude', formData.longitude);
            if (image) {
                data.append('image', image);
            }

            await issueService.create(data);

            toast.success('Issue reported successfully!');
            navigate('/citizen/dashboard');
        } catch (error) {
            console.error(error);
            toast.error('Failed to report issue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Report an Issue</h1>
                <p className="text-gray-400">Help us improve the city by reporting problems.</p>
            </div>

            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Title"
                        name="title"
                        placeholder="e.g., Deep Pothole on 5th Avenue"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows="4"
                            placeholder="Describe the issue in detail..."
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                            required
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            Location
                        </label>
                        <div className="flex gap-2">
                            <div className="flex-1 grid grid-cols-2 gap-2">
                                <Input
                                    placeholder="Latitude"
                                    name="latitude"
                                    value={formData.latitude}
                                    readOnly
                                    className="bg-gray-900/50"
                                />
                                <Input
                                    placeholder="Longitude"
                                    name="longitude"
                                    value={formData.longitude}
                                    readOnly
                                    className="bg-gray-900/50"
                                />
                            </div>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={getLocation}
                                isLoading={locationLoading}
                                icon={MapPin}
                            >
                                Fetch GPS
                            </Button>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            Upload Image
                        </label>
                        <div
                            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${previewUrl ? 'border-blue-500 bg-blue-500/5' : 'border-gray-700 hover:border-gray-500'
                                }`}
                        >
                            {previewUrl ? (
                                <div className="relative inline-block">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="max-h-64 rounded-lg shadow-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="cursor-pointer"
                                >
                                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Camera className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <p className="text-gray-300 font-medium">Click to upload image</p>
                                    <p className="text-gray-500 text-sm mt-1">JPG, PNG up to 5MB</p>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            size="lg"
                            isLoading={loading}
                            icon={Upload}
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
