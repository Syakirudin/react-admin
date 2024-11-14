import React from 'react';

const Setting = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      {/* Box Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Box 1 */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
          <p className="text-gray-600">Manage your profile information.</p>
        </div>

        {/* Box 2 */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Account Security</h2>
          <p className="text-gray-600">Update password and security settings.</p>
        </div>

        {/* Box 3 */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Notifications</h2>
          <p className="text-gray-600">Control your notification preferences.</p>
        </div>

        {/* Box 4 */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Privacy Settings</h2>
          <p className="text-gray-600">Adjust your privacy settings.</p>
        </div>

        {/* Box 5 */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Connected Accounts</h2>
          <p className="text-gray-600">Manage connected social accounts.</p>
        </div>

        {/* Box 6 */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Billing Information</h2>
          <p className="text-gray-600">Update billing and payment details.</p>
        </div>
      </div>
    </div>
  );
};

export default Setting;
