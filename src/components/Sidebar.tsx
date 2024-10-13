import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, BarChart2, Book, Upload } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    { name: 'Content Management', icon: Book, path: '/content' },
    { name: 'Digitalization', icon: Upload, path: '/digitalization' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="bg-blue-900 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <h2 className="text-2xl font-semibold text-center">Venli Portal</h2>
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              location.pathname === item.path
                ? 'bg-blue-800 text-white'
                : 'text-blue-200 hover:bg-blue-800 hover:text-white'
            }`}
          >
            <item.icon className="inline-block mr-2 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;