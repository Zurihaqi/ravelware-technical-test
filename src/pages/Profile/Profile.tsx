import { useState, useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import type React from "react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
}

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Zul Fahri Baihaqi",
    email: "zurihaqi@gmail.com",
    phone: "+62 878 2381 5619",
    role: "Developer",
    department: "IT Department",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
      }, 1500);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1b2e] text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src="/avatar.png"
                alt="Profile"
                className="w-48 h-48 rounded-full object-cover border-4 border-blue-500"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                disabled={isUploading}
              >
                {isUploading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">{profileData.name}</h2>
              <p className="text-gray-400">{profileData.role}</p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="flex-1 bg-[#232442] rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Profile Information</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-[#1a1b2e] rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  ) : (
                    <p className="px-4 py-2">{profileData.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-[#1a1b2e] rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  ) : (
                    <p className="px-4 py-2">{profileData.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-[#1a1b2e] rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  ) : (
                    <p className="px-4 py-2">{profileData.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Role</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.role}
                      onChange={(e) =>
                        setProfileData({ ...profileData, role: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-[#1a1b2e] rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  ) : (
                    <p className="px-4 py-2">{profileData.role}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-gray-400">Department</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.department}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          department: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-[#1a1b2e] rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  ) : (
                    <p className="px-4 py-2">{profileData.department}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#232442] rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Account Security</h3>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 text-left bg-[#1a1b2e] rounded-lg hover:bg-[#2a2b4e] transition-colors">
                Change Password
              </button>
              <button className="w-full px-4 py-2 text-left bg-[#1a1b2e] rounded-lg hover:bg-[#2a2b4e] transition-colors">
                Two-Factor Authentication
              </button>
            </div>
          </div>

          <div className="bg-[#232442] rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Preferences</h3>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 text-left bg-[#1a1b2e] rounded-lg hover:bg-[#2a2b4e] transition-colors">
                Notification Settings
              </button>
              <button className="w-full px-4 py-2 text-left bg-[#1a1b2e] rounded-lg hover:bg-[#2a2b4e] transition-colors">
                Language & Region
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
