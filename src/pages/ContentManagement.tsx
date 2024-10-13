import React, { useState } from 'react';
import { Plus, Edit, Trash, Search, Filter, Download, Upload, Calendar, Book, Image, Video, Globe, ChevronDown } from 'lucide-react';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('exhibits');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const exhibits = [
    { id: 1, name: 'Ancient Egypt', type: 'Historical', language: 'English', status: 'Active' },
    { id: 2, name: 'Modern Art', type: 'Art', language: 'Spanish', status: 'Planned' },
    { id: 3, name: 'Dinosaur Era', type: 'Natural History', language: 'French', status: 'Active' },
  ];

  const artifacts = [
    { id: 1, name: 'Egyptian Mummy', exhibit: 'Ancient Egypt', condition: 'Good', location: 'Room 101' },
    { id: 2, name: 'Picasso Painting', exhibit: 'Modern Art', condition: 'Excellent', location: 'Gallery 3' },
    { id: 3, name: 'T-Rex Skeleton', exhibit: 'Dinosaur Era', condition: 'Fair', location: 'Main Hall' },
  ];

  const events = [
    { id: 1, name: 'Night at the Museum', date: '2023-05-15', type: 'Special Event', status: 'Upcoming' },
    { id: 2, name: 'Guided Tour: Ancient Egypt', date: '2023-05-10', type: 'Tour', status: 'Completed' },
    { id: 3, name: 'Kids Workshop: Dinosaur Dig', date: '2023-05-20', type: 'Workshop', status: 'Upcoming' },
  ];

  const educationalResources = [
    { id: 1, name: 'Ancient Egypt Lesson Plan', type: 'Lesson Plan', format: 'PDF', language: 'English' },
    { id: 2, name: 'Virtual Tour: Modern Art', type: 'Virtual Tour', format: 'Video', language: 'Spanish' },
    { id: 3, name: 'Dinosaur Fact Sheets', type: 'Handout', format: 'PDF', language: 'French' },
  ];

  const renderTable = (data, columns) => (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white text-sm leading-normal">
            {columns.map((column, index) => (
              <th key={index} className="py-3 px-6 text-left">{column}</th>
            ))}
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150 ease-in-out"
            >
              {columns.map((column, index) => (
                <td key={index} className="py-3 px-6 text-left whitespace-nowrap">
                  {item[column.toLowerCase()]}
                </td>
              ))}
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button className="w-6 h-6 mr-2 transform hover:text-purple-500 hover:scale-110 transition-all duration-150">
                    <Edit size={16} />
                  </button>
                  <button className="w-6 h-6 mr-2 transform hover:text-red-500 hover:scale-110 transition-all duration-150">
                    <Trash size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'exhibits':
        return renderTable(exhibits, ['Name', 'Type', 'Language', 'Status']);
      case 'artifacts':
        return renderTable(artifacts, ['Name', 'Exhibit', 'Condition', 'Location']);
      case 'events':
        return renderTable(events, ['Name', 'Date', 'Type', 'Status']);
      case 'educational':
        return renderTable(educationalResources, ['Name', 'Type', 'Format', 'Language']);
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Content Management</h1>

      <div className="mb-8 flex flex-wrap justify-between items-center">
        <div className="flex space-x-2 mb-4 md:mb-0">
          {['exhibits', 'artifacts', 'events', 'educational'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200"
        >
          <Plus className="inline-block mr-2" />
          Add New
        </button>
      </div>

      <div className="mb-8 flex flex-wrap justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r-full hover:bg-blue-600 transition-colors duration-200">
            <Search className="inline-block" />
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            className="bg-white text-gray-600 px-4 py-2 rounded-full shadow hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="inline-block mr-2" />
            Filter
            <ChevronDown className={`inline-block ml-2 transform transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
          <button
            className="bg-white text-gray-600 px-4 py-2 rounded-full shadow hover:bg-gray-100 transition-colors duration-200"
          >
            <Download className="inline-block mr-2" />
            Export
          </button>
          <button
            className="bg-white text-gray-600 px-4 py-2 rounded-full shadow hover:bg-gray-100 transition-colors duration-200"
          >
            <Upload className="inline-block mr-2" />
            Import
          </button>
        </div>
      </div>

      {isFilterOpen && (
        <div className="mb-8 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Filter Options</h3>
          {/* Add filter options here */}
          <p>Filter options will be displayed here.</p>
        </div>
      )}

      <div className="transition-all duration-300">
        {renderContent()}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Calendar, title: 'Upcoming Events', content: '3 events scheduled for next week' },
          { icon: Book, title: 'Content Updates', content: '12 items need review' },
          { icon: Image, title: 'Media Library', content: '1,234 items (10.5 GB used)' },
          { icon: Globe, title: 'Languages', content: 'Content available in 5 languages' },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-800">
              <item.icon className="mr-2 text-blue-500" />
              {item.title}
            </h3>
            <p className="text-gray-600">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;