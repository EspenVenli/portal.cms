import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Users, Star, Book, Smartphone, Globe, MessageSquare, TrendingUp, Clock, DollarSign, Activity, Zap, Map } from 'lucide-react';

const Dashboard = () => {
  const [visitorData, setVisitorData] = useState([
    { name: 'Mon', visitors: 4000 },
    { name: 'Tue', visitors: 3000 },
    { name: 'Wed', visitors: 2000 },
    { name: 'Thu', visitors: 2780 },
    { name: 'Fri', visitors: 1890 },
    { name: 'Sat', visitors: 2390 },
    { name: 'Sun', visitors: 3490 },
  ]);

  const [revenueData, setRevenueData] = useState([
    { name: 'Mon', revenue: 10000 },
    { name: 'Tue', revenue: 12000 },
    { name: 'Wed', revenue: 9000 },
    { name: 'Thu', revenue: 15000 },
    { name: 'Fri', revenue: 18000 },
    { name: 'Sat', revenue: 20000 },
    { name: 'Sun', revenue: 22000 },
  ]);

  const exhibitEngagementData = [
    { name: 'Ancient Artifacts', value: 4000 },
    { name: 'Modern Art', value: 3000 },
    { name: 'Natural History', value: 2000 },
    { name: 'Science & Tech', value: 1000 },
    { name: 'Local Culture', value: 1500 },
  ];

  const visitorSourceData = [
    { name: 'Local', value: 30 },
    { name: 'National', value: 45 },
    { name: 'International', value: 25 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const [realtimeVisitors, setRealtimeVisitors] = useState(120);
  const [realtimeRevenue, setRealtimeRevenue] = useState(3450);
  const [activeTours, setActiveTours] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeVisitors(prev => Math.max(0, Math.floor(prev + Math.random() * 10 - 5)));
      setRealtimeRevenue(prev => Math.max(0, Math.floor(prev + Math.random() * 100 - 50)));
      setActiveTours(prev => Math.max(0, Math.floor(prev + Math.random() * 4 - 2)));
      
      setVisitorData(prevData => {
        const newData = [...prevData];
        const lastDay = newData[newData.length - 1];
        lastDay.visitors += Math.floor(Math.random() * 100 - 50);
        return newData;
      });

      setRevenueData(prevData => {
        const newData = [...prevData];
        const lastDay = newData[newData.length - 1];
        lastDay.revenue += Math.floor(Math.random() * 1000 - 500);
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const CustomXAxis = (props) => <XAxis {...props} />;
  const CustomYAxis = (props) => <YAxis {...props} />;

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Users className="mr-2" /> Real-time Visitors
          </h2>
          <p className="text-3xl font-bold text-blue-600">{realtimeVisitors}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <DollarSign className="mr-2" /> Today's Revenue
          </h2>
          <p className="text-3xl font-bold text-green-600">${realtimeRevenue}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Zap className="mr-2" /> Active Tours
          </h2>
          <p className="text-3xl font-bold text-purple-600">{activeTours}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Star className="mr-2" /> Avg. Rating
          </h2>
          <p className="text-3xl font-bold text-yellow-600">4.8 / 5</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2" /> Weekly Visitor Trends
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <CustomXAxis dataKey="name" />
              <CustomYAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="visitors" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2" /> Weekly Revenue
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <CustomXAxis dataKey="name" />
              <CustomYAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Activity className="mr-2" /> Exhibit Engagement
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={exhibitEngagementData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {exhibitEngagementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Map className="mr-2" /> Visitor Source
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={visitorSourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {visitorSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Book className="mr-2" /> Top Exhibits
          </h3>
          <ol className="list-decimal list-inside">
            <li>Ancient Artifacts</li>
            <li>Modern Art Gallery</li>
            <li>Dinosaur Fossils</li>
            <li>Interactive Science Lab</li>
            <li>Local History Exhibition</li>
          </ol>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <MessageSquare className="mr-2" /> Recent Feedback
          </h3>
          <ul className="space-y-2">
            <li>"Amazing experience! Loved the interactive exhibits." - John D.</li>
            <li>"The guided tour was very informative." - Sarah M.</li>
            <li>"Could use more seating areas." - Mike R.</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Clock className="mr-2" /> Upcoming Events
          </h3>
          <ul className="space-y-2">
            <li>Night at the Museum - 05/15</li>
            <li>Children's Art Workshop - 05/22</li>
            <li>Historical Lecture Series - 06/01</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;