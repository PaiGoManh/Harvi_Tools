import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const FacilityViewAdmin = () => {
  const [facility, setFacility] = useState([]);
  const [editFacilityId, setEditFacilityId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const navigate = useNavigate();

  const fetchFacility = async () => {
    try {
      const response = await fetch("/api/facility", {
        headers: {
          "x-admin-password": "harvi_tools",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch facility");
      const data = await response.json();
      setFacility(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleDescription = (facilityId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [facilityId]: !prev[facilityId],
    }));
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  const handleEditClick = (facility) => {
    setEditFacilityId(facility._id);
    setEditForm({
      name: facility.name,
      description: facility.description,
      image: null,
    });
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    setEditForm({ ...editForm, image: e.target.files[0] });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", editForm.name);
    data.append("description", editForm.description);
    if (editForm.image) data.append("image", editForm.image);

    try {
      const response = await fetch(`/api/facility/${editFacilityId}`, {
        method: "PUT",
        headers: {
          "x-admin-password": "harvi_tools",
        },
        body: data,
      });

      if (!response.ok) throw new Error("Failed to update facility");
      const updatedFacility = await response.json();
      setFacility((prev) =>
        prev.map((facility) =>
          facility._id === updatedFacility.data._id
            ? updatedFacility.data
            : facility
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (facilityId) => {
    try {
      const response = await fetch(`/api/facility/${facilityId}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": "harvi_tools",
        },
      });

      if (!response.ok) throw new Error("Failed to delete facility");
      setFacility((prev) =>
        prev.filter((facility) => facility._id !== facilityId)
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchFacility();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-white focus:ring-4 focus:ring-yellow-300 font-semibold rounded-full px-6 py-3 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          ← Back to Dashboard
        </button>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold uppercase mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Facility Dashboard
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Manage your facility portfolio with precision. Edit, update, or
            remove items from your collection.
          </p>
        </div>

        {facility.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No facility found</p>
            <p className="text-gray-500 mt-2">
              Start adding facility to see them here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {facility.map((facility) => (
              <div
                key={facility._id}
                className="group bg-gray-900 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={`/api/uploads/${facility.image}`}
                    alt={facility.name}
                    className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  <div className="absolute top-0 right-0 p-3 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleEditClick(facility)}
                      className="p-2 bg-yellow-500/90 hover:bg-yellow-600 rounded-full shadow-lg"
                    >
                      <BiSolidEdit className="text-lg text-black" />
                    </button>
                    <button
                      onClick={() => handleDelete(facility._id)}
                      className="p-2 bg-red-500/90 hover:bg-red-600 rounded-full shadow-lg"
                    >
                      <MdDelete className="text-lg text-black" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{facility.name}</h2>
                  <div className="min-h-[60px]">
                    <p className="text-gray-300 text-sm">
                      {expandedDescriptions[facility._id]
                        ? facility.description
                        : truncateText(facility.description, 100)}
                    </p>
                    {facility.description.length > 100 && (
                      <button
                        onClick={() => toggleDescription(facility._id)}
                        className="text-yellow-500 text-sm font-medium mt-2 hover:text-yellow-600 transition-colors"
                      >
                        {expandedDescriptions[facility._id]
                          ? "Show Less"
                          : "Show More"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm flex items-start justify-center p-4 mt-20">
            <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-2xl border border-gray-700">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  Edit Facility
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-3 font-medium">
                    Facility Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-700 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-3 font-medium">
                    Description
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-700 rounded-xl h-32 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-3 font-medium">
                    Update Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="w-full px-4 py-3 bg-gray-700 rounded-xl border-2 border-dashed border-gray-600 hover:border-yellow-500 transition-colors group">
                        <span className="text-gray-400 group-hover:text-yellow-500">
                          {editForm.image
                            ? editForm.image.name
                            : "Choose new image..."}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilityViewAdmin;
