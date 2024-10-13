import React, { useState } from 'react';
import { Globe, User, Palette, Bell, Plus, Trash2, Check } from 'lucide-react';

const Settings = () => {
  const [languages, setLanguages] = useState(['English', 'Danish', 'German', 'Swedish', 'Norwegian']);
  const [characters, setCharacters] = useState([
    'Hans Christian Andersen',
    'Queen Margrethe II',
    'Niels Bohr',
    'Karen Blixen'
  ]);
  const [newLanguage, setNewLanguage] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [secondaryColor, setSecondaryColor] = useState('#10B981');
  const [accentColor, setAcccentColor] = useState('#F59E0B');
  const [newGuideName, setNewGuideName] = useState('');
  const [newGuideVoice, setNewGuideVoice] = useState('English (US)');
  const [notificationEmail, setNotificationEmail] = useState('');

  const handleAddLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLanguage && !languages.includes(newLanguage)) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (lang: string) => {
    setLanguages(languages.filter(l => l !== lang));
  };

  const handleAddGuide = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGuideName && !characters.includes(newGuideName)) {
      setCharacters([...characters, newGuideName]);
      setNewGuideName('');
    }
  };

  const handleRemoveCharacter = (character: string) => {
    setCharacters(characters.filter(c => c !== character));
  };

  const handleUpdateNotificationSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    console.log('Updating notification email to:', notificationEmail);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Languages Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
            <Globe className="mr-3 text-blue-500" /> Available Languages
          </h2>
          <ul className="mb-6 space-y-2">
            {languages.map((lang, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                <span>{lang}</span>
                <button 
                  onClick={() => handleRemoveLanguage(lang)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={handleAddLanguage} className="flex">
            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="e.g. French"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 transition-colors">
              Add Language
            </button>
          </form>
        </div>

        {/* Characters Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
            <User className="mr-3 text-green-500" /> Current Characters
          </h2>
          <ul className="mb-6 space-y-2">
            {characters.map((character, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                <span>{character}</span>
                <button 
                  onClick={() => handleRemoveCharacter(character)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* App Colors Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
            <Palette className="mr-3 text-purple-500" /> App Colors
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Primary Color</label>
              <div className="flex items-center">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-12 h-12 rounded-md cursor-pointer mr-4"
                />
                <span className="text-gray-600">{primaryColor}</span>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Secondary Color</label>
              <div className="flex items-center">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-12 h-12 rounded-md cursor-pointer mr-4"
                />
                <span className="text-gray-600">{secondaryColor}</span>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Accent Color</label>
              <div className="flex items-center">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAcccentColor(e.target.value)}
                  className="w-12 h-12 rounded-md cursor-pointer mr-4"
                />
                <span className="text-gray-600">{accentColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Guide Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
            <Plus className="mr-3 text-indigo-500" /> Add New Guide
          </h2>
          <form onSubmit={handleAddGuide} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Guide Name</label>
              <input
                type="text"
                value={newGuideName}
                onChange={(e) => setNewGuideName(e.target.value)}
                placeholder="e.g. Viking Warrior"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Guide Voice Model</label>
              <select
                value={newGuideVoice}
                onChange={(e) => setNewGuideVoice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>English (US)</option>
                <option>Danish</option>
                <option>German</option>
                <option>Swedish</option>
                <option>Norwegian</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Guide Icon</label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="w-full bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-600 transition-colors">
              Add New Guide
            </button>
          </form>
        </div>

        {/* Notification Settings Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
            <Bell className="mr-3 text-yellow-500" /> Notification Settings
          </h2>
          <form onSubmit={handleUpdateNotificationSettings} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Notification Email</label>
              <input
                type="email"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="w-full bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition-colors flex items-center justify-center">
              <Check className="mr-2" /> Update Notification Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;